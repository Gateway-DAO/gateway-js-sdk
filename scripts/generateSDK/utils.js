const fs = require('fs');
const { dirname: getDirname } = require('path');
const { DocumentNode, print } = require('graphql');
const {
  mapSchema,
  memoize1,
  buildOperationNodeForField,
  getRootTypeMap,
  parseGraphQLSDL,
} = require('@graphql-tools/utils');

function getUnifiedSchema(rawSource) {
  let schema = rawSource;

  schema.extensions = schema.extensions || {};
  Object.defineProperty(schema.extensions, 'sourceMap', {
    get: () => {
      return {
        get() {
          const nonExecutableSchema = mapSchema(schema);
          if (rawSource.transforms?.length) {
            return rawSource.transforms.reduce(
              (schema, transform) =>
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

async function pathExists(path) {
  if (!path) {
    return false;
  }
  try {
    await fs.promises.stat(path);
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

function writeJSON(path, data, replacer, space) {
  const stringified = JSON.stringify(data, replacer, space);
  return writeFile(path, stringified, 'utf-8');
}

const writeFile = async (filePath, data, options) => {
  if (typeof filePath === 'string') {
    const containingDir = getDirname(filePath);
    if (!(await pathExists(containingDir))) {
      await mkdir(containingDir);
    }
  }
  return fs.promises.writeFile(filePath, data, options);
};

async function mkdir(path, options = { recursive: true }) {
  const ifExists = await pathExists(path);
  if (!ifExists) {
    await fs.promises.mkdir(path, options);
  }
}

const tempMap = new Map();

const printWithCache = memoize1(function printWithCache(document) {
  const stringifedDocumentJson = JSON.stringify(document);
  let sdl = tempMap.get(stringifedDocumentJson);
  if (!sdl) {
    sdl = print(document).trim();
    tempMap.set(stringifedDocumentJson, sdl);
  }
  return sdl;
});

function generateOperations(schema, selectionSetDepth) {
  const sources = [];
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

module.exports = {
  generateOperations,
  printWithCache,
  mkdir,
  writeFile,
  writeJSON,
  getUnifiedSchema,
  pathExists,
};
