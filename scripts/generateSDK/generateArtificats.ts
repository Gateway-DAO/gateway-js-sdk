import fs from 'fs';
import { join, relative, resolve, normalize } from 'path';
import { GraphQLSchema } from 'graphql';
import ts from 'typescript';
import { codegen } from '@graphql-codegen/core';
import * as typedDocumentNodePlugin from '@graphql-codegen/typed-document-node';
import * as tsBasePlugin from '@graphql-codegen/typescript';
import * as typescriptGraphqlRequestSdk from '@graphql-codegen/typescript-graphql-request';
import * as tsOperationsPlugin from '@graphql-codegen/typescript-operations';
import * as tsResolversPlugin from '@graphql-codegen/typescript-resolvers';
import {
  pathExists,
  printWithCache,
  writeFile,
  generateOperations,
} from './utils';
import { printSchemaWithDirectives } from '@graphql-tools/utils';

function toPascalCase(str: string) {
  return str
    .replace(/(\w)(\w*)/g, function (_, first, rest) {
      return first.toUpperCase() + rest.toLowerCase();
    })
    .replace(/\s+/g, '');
}

async function generateTypesForApi(options: {
  schema: GraphQLSchema;
  name: string;
  contextVariables: Record<string, string>;
}) {
  const config = {
    skipTypename: true,
    namingConvention: 'keep',
    enumsAsTypes: true,
    ignoreEnumValuesFromSchema: true,
  };
  const baseTypes = await codegen({
    filename: options.name + '_types.ts',
    documents: [],
    config,
    schemaAst: options.schema,
    schema: undefined as any, // This is not necessary on codegen. Will be removed later
    skipDocumentsValidation: true,
    plugins: [
      {
        typescript: {},
      },
    ],
    pluginMap: {
      typescript: tsBasePlugin,
    },
  });
  const namespace = toPascalCase(`${options.name}Types`);

  const codeAst = `


export namespace ${namespace} {
  ${baseTypes}
  }
`;

  return {
    identifier: namespace,
    codeAst,
  };
}

const BASEDIR_ASSIGNMENT_COMMENT = `/* BASEDIR_ASSIGNMENT */`;

export async function generateTsArtifacts({
  unifiedSchema,
  rawSources,
  baseDir,
  artifactsDirectory,
  setDepth,
  fileType,
}: {
  unifiedSchema: GraphQLSchema;
  rawSources: readonly any[];
  baseDir: string;
  artifactsDirectory: string;
  setDepth: number;
  fileType: 'ts';
}) {
  const artifactsDir = join(baseDir, artifactsDirectory);
  console.log('Generating index file in TypeScript');
  for (const rawSource of rawSources) {
    const transformedSchema = (unifiedSchema.extensions as any).sourceMap.get(
      rawSource,
    );
    const sdl = printSchemaWithDirectives(transformedSchema);
    await writeFile(
      join(artifactsDir, `sources/GatewaySDK/schema.graphql`),
      sdl,
    );
  }
  const documentsInput = generateOperations(unifiedSchema, setDepth);

  const pluginsInput: Record<string, any>[] = [
    {
      typescript: {},
    },
    {
      resolvers: {},
    },
    {
      contextSdk: {},
    },
  ];
  if (documentsInput.length) {
    pluginsInput.push(
      {
        typescriptOperations: {},
      },
      {
        typedDocumentNode: {},
      },
      {
        typescriptGraphqlRequest: {
          documentMode: 'external',
          importDocumentNodeExternallyFrom: 'NOWHERE',
        },
      },
    );
    const documentHashMap: Record<string, string> = {};
    for (const document of documentsInput) {
      if (document.sha256Hash) {
        documentHashMap[document.sha256Hash] =
          document.rawSDL || printWithCache(document.document);
      }
    }
    await writeFile(
      join(artifactsDir, `persisted_operations.json`),
      JSON.stringify(documentHashMap, null, 2),
    );
  }
  const codegenOutput =
    '// @ts-nocheck\n' +
    '/* This file is auto generated \n' +
    'Do not make changes to this file */\n' +
    (
      await codegen({
        filename: 'types.ts',
        documents: documentsInput,
        config: {
          skipTypename: true,
          flattenGeneratedTypes: false,
          onlyOperationTypes: false,
          preResolveTypes: false,
          namingConvention: 'keep',
          documentMode: 'graphQLTag',
          gqlImport: 'graphql-request#gql',
          enumsAsTypes: true,
          ignoreEnumValuesFromSchema: true,
          useIndexSignature: true,
          noSchemaStitching: false,
          federation: false,
        },
        schemaAst: unifiedSchema,
        schema: undefined as any, // This is not necessary on codegen.
        skipDocumentsValidation: true,
        pluginMap: {
          typescript: tsBasePlugin,
          typescriptOperations: tsOperationsPlugin,
          typedDocumentNode: typedDocumentNodePlugin,
          typescriptGraphqlRequest: typescriptGraphqlRequestSdk,
          resolvers: tsResolversPlugin,
          contextSdk: {
            plugin: async () => {
              const importCodes = new Set();
              await Promise.all(
                rawSources.map(async (source) => {
                  const sourceMap = unifiedSchema.extensions.sourceMap as Map<
                    any,
                    GraphQLSchema
                  >;
                  const sourceSchema = sourceMap.get(source);
                  const { identifier, codeAst } = await generateTypesForApi({
                    schema: sourceSchema!,
                    name: 'GatewaySDK',
                    contextVariables: { key: 'value' },
                  });
                  if (codeAst) {
                    const content =
                      '// @ts-nocheck\n' +
                      '/* This file is auto generated \n' +
                      'Do not make changes to this file */' +
                      codeAst;
                    await writeFile(
                      join(artifactsDir, `sources/GatewaySDK/types.ts`),
                      content,
                    );
                  }

                  return {
                    identifier,
                    codeAst,
                  };
                }),
              );

              return {
                prepend: [[...importCodes].join('\n'), '\n\n'],
                content: ['testing-1', 'testing-2'].join('\n\n'),
              };
            },
          },
        },
        plugins: pluginsInput,
      })
    )
      .replace(`import * as Operations from 'NOWHERE';\n`, '')
      .replace('testing-1', '')
      .replace('testing-2', '')
      .replace(/Operations./g, '');

  const endpointAssignmentCJS = `const baseDir = join(typeof __dirname === 'string' ? __dirname : '/', '${relative(
    artifactsDir,
    baseDir,
  )}');`;

  const tsFilePath = join(artifactsDir, 'index.ts');

  const jobs: (() => Promise<void>)[] = [];
  const jsFilePath = join(artifactsDir, 'index.js');
  const dtsFilePath = join(artifactsDir, 'index.d.ts');

  const cjsJob = async () => {
    console.log('Writing index.ts for CJS to the disk.');
    await writeFile(
      tsFilePath,
      codegenOutput.replace(BASEDIR_ASSIGNMENT_COMMENT, endpointAssignmentCJS),
    );

    if (await pathExists(jsFilePath)) {
      await fs.promises.unlink(jsFilePath);
    }
    if (fileType !== 'ts') {
      console.log('Compiling TS file as CommonJS Module to `index.js`');
      compileTS(tsFilePath, ts.ModuleKind.CommonJS, [jsFilePath, dtsFilePath]);

      console.log('Deleting index.ts');
      await fs.promises.unlink(tsFilePath);
    }
  };

  function setTsConfigDefault() {
    jobs.push(cjsJob);
  }
  const rootDir = resolve('./');
  const tsConfigPath = join(rootDir, 'tsconfig.json');
  if (await pathExists(tsConfigPath)) {
    setTsConfigDefault();
  }

  for (const job of jobs) {
    await job();
  }
}

export function compileTS(
  tsFilePath: string,
  module: ts.ModuleKind,
  outputFilePaths: string[],
) {
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module,
    sourceMap: false,
    inlineSourceMap: false,
    importHelpers: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    declaration: true,
  };
  const host = ts.createCompilerHost(options);

  const hostWriteFile = host.writeFile.bind(host);
  host.writeFile = (fileName, ...rest) => {
    if (outputFilePaths.some((f) => normalize(f) === normalize(fileName))) {
      return hostWriteFile(fileName, ...rest);
    }
  };

  const program = ts.createProgram([tsFilePath], options, host);
  program.emit();
}
