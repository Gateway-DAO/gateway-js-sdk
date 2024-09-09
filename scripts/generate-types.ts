import fs from 'fs';

const getJSONSchema = async () => {
  try {
    const data = await fetch('https://dev.api.gateway.tech/swagger/doc.json');

    const body = await data.json();

    const types = generateTypes(body.definitions);

    fs.writeFileSync('./src/common/types.ts', types);
  } catch (error) {
    console.log(error);
  }
};

function toPascalCase(str: string): string {
  return str
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
      return schema.enum.map((e: any) => `'${e}'`).join(' | ');
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
    types.push(
      `export type ${toPascalCase(typeName)} = ${processSchema(schema)};\n`,
    );
  });

  return types.join('\n');
};

getJSONSchema();
