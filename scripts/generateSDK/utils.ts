import fs from 'fs';
import { dirname as getDirname } from 'path';
import { DocumentNode, print } from 'graphql';
import {
  mapSchema,
  memoize1,
  buildOperationNodeForField,
  getRootTypeMap,
  parseGraphQLSDL,
} from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export function getUnifiedSchema(rawSource: any): GraphQLSchema {
  let schema = rawSource;

  schema.extensions = schema.extensions || {};
  Object.defineProperty(schema.extensions, 'sourceMap', {
    get: () => {
      return {
        get() {
          const nonExecutableSchema = mapSchema(schema);
          if (rawSource.transforms?.length) {
            return rawSource.transforms.reduce(
              (schema: any, transform: any) =>
                'transformSchema' in transform
                  ? transform.transformSchema(schema, rawSource)
                  : schema,
              nonExecutableSchema,
            );
          }
          return nonExecutableSchema;
        },
      };
    },
  });
  return schema;
}

export async function pathExists(path: string) {
  if (!path) {
    return false;
  }
  try {
    await fs.promises.stat(path);
    return true;
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

export function writeJSON(
  path: string,
  data: any,
  replacer?: any,
  space?: any,
) {
  const stringified = JSON.stringify(data, replacer, space);
  return writeFile(path, stringified, 'utf-8');
}

export const writeFile = async (filePath: string, data: any, options?: any) => {
  if (typeof filePath === 'string') {
    const containingDir = getDirname(filePath);
    if (!(await pathExists(containingDir))) {
      await mkdir(containingDir);
    }
  }
  return fs.promises.writeFile(filePath, data, options);
};

export async function mkdir(path: string, options = { recursive: true }) {
  const ifExists = await pathExists(path);
  if (!ifExists) {
    await fs.promises.mkdir(path, options);
  }
}

const tempMap = new Map();

export const printWithCache = memoize1(function printWithCache(
  document: DocumentNode,
): string {
  const stringifedDocumentJson = JSON.stringify(document);
  let sdl: string = tempMap.get(stringifedDocumentJson);
  if (!sdl) {
    sdl = print(document).trim();
    tempMap.set(stringifedDocumentJson, sdl);
  }
  return sdl;
});

export function generateOperations(
  schema: GraphQLSchema,
  selectionSetDepth: number,
): any[] {
  const sources: any[] = [];
  const rootTypeMap = getRootTypeMap(schema);
  for (const [operationType, rootType] of rootTypeMap) {
    const fieldMap = rootType.getFields();
    for (const fieldName in fieldMap) {
      const operationNode = buildOperationNodeForField({
        schema,
        kind: operationType,
        field: fieldName,
        depthLimit: selectionSetDepth,
      });
      const defaultName = `operation_${sources.length}`;
      const virtualFileName = operationNode.name?.value || defaultName;
      const rawSDL = print(operationNode);
      const source = parseGraphQLSDL(`${virtualFileName}.graphql`, rawSDL);
      sources.push(source);
    }
  }
  return sources;
}
