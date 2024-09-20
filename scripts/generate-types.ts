import fs from 'fs';

const getJSONSchema = async () => {
  try {
    const data = await fetch(
      'https://dev.api.gateway.tech/docs/openapi3_full.json',
    );

    const body = await data.json();

    const types = generateTypes(body.components.schemas);

    const routes = generateRouteConstants(body.paths);

    fs.writeFileSync('./src/common/types.ts', types);
    fs.writeFileSync('./src/common/routes.ts', routes);
  } catch (error) {
    console.log(error);
  }
};

type PathItem = Record<string, Operation>;

interface Operation {
  summary: string;
}

function generateRouteConstants(paths: Record<string, PathItem>): string {
  const constants: string[] = ['export const routes = {'];

  for (const path in paths) {
    const pathItem = paths[path];

    for (const method in pathItem) {
      const operation = pathItem[method];
      const constantName = generateRouteConstantName(
        method,
        path,
        operation.summary,
      );
      const parameterizedPath = path;
      constants.push(`  ${constantName}: "${parameterizedPath}",`);
    }
  }

  constants.push('};');
  return constants.join('\n');
}

function generateRouteConstantName(
  method: string,
  path: string,
  summary: string,
): string {
  let name = summary.trim();
  if (name === '') {
    name = path;
  }
  return toPascalCase(name);
}

function toPascalCase(str: string): string {
  const cleanedStr = str.replace(/^model\./, '');
  return cleanedStr
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      return index === 0 ? match.toUpperCase() : match.toUpperCase();
    })
    .replace(/\W+/g, '');
}

const generateTypes = (definitions: any): string => {
  const types: string[] = [
    `import { ClientMethod, Middleware } from 'openapi-fetch';
import type { MediaType } from 'openapi-typescript-helpers';\n\n`,
    `export interface Config {
  token: string;
  url: string;
  logging?: boolean;
}\n\n`,
    `// eslint-disable-next-line @typescript-eslint/ban-types
export interface OpenAPIClient<Paths extends {}, Media extends MediaType> {
  GET: ClientMethod<Paths, 'get', Media>;
  PUT: ClientMethod<Paths, 'put', Media>;
  POST: ClientMethod<Paths, 'post', Media>;
  DELETE: ClientMethod<Paths, 'delete', Media>;
  OPTIONS: ClientMethod<Paths, 'options', Media>;
  HEAD: ClientMethod<Paths, 'head', Media>;
  PATCH: ClientMethod<Paths, 'patch', Media>;
  TRACE: ClientMethod<Paths, 'trace', Media>;
  use(...middleware: Middleware[]): void;
  eject(...middleware: Middleware[]): void;
}\n`,
    `\nexport enum DataAssetType {
  StructuredData = 'Structured Data',
  UnstructedData = 'Other',
}\n`,
  ];

  const processSchema = (schema: any): string => {
    if (schema.$ref) {
      const ref = schema.$ref.split('/').pop();
      if (ref && definitions[ref]) {
        return toPascalCase(ref);
      }
    }

    if (schema.type === 'object') {
      const properties = schema.properties
        ? Object.entries(schema.properties).map(([key, value]) => {
            const propType = processSchema(value);
            return `${key}${schema.required && schema.required.includes(key) ? '' : '?'}: ${propType};`;
          })
        : [];

      return `{ ${properties.join(' ')} }`;
    }

    if (schema.type === 'array') {
      const itemType = processSchema(schema.items);
      return `${itemType}[]`;
    }

    if (schema.enum) {
      return schema.enum.map((e: any) => `${e.toUpperCase()} = '${e}'`);
    }

    switch (schema.type) {
      case 'string':
        return 'string';
      case 'integer':
        return 'number';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      default:
        return 'any';
    }
  };

  Object.entries(definitions).forEach(([typeName, schema]) => {
    if (typeName === 'helper.PaginatedResponse') {
      const processedSchema = processSchema(schema);
      types.push(
        `export type ${toPascalCase(typeName)}<T=any> = ${processedSchema.replace(/\bany\b/g, 'T')};\n`,
      );
    } else if ((schema as any).enum) {
      types.push(
        `export enum ${toPascalCase(typeName)} {${processSchema(schema)}};\n`,
      );
    } else
      types.push(
        `export type ${toPascalCase(typeName)} = ${processSchema(schema)};\n`,
      );
  });
  return types.join('\n');
};

getJSONSchema();
