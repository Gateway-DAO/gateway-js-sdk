import {
  GraphQLSchema,
  buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';
import { getUnifiedSchema } from './utils';
import BareFilter from './BareFilter';
import { generateTsArtifacts } from './generateArtificats';
import { join } from 'path';

async function fetchAndGetUnifiedSchema(): Promise<{
  unifiedSchema: GraphQLSchema;
  rawSource: any;
}> {
  try {
    // Get the schema from graphql end point
    const response = await fetch(
      'https://develop.protocol.mygateway.xyz/graphql',
      {
        method: 'POST',
        headers: {
          accept:
            'application/graphql-response+json, application/json, multipart/mixed',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Decode it to JSON
    const data = await response.json();

    // Build a base schema needed so that we can parse it and create codegen
    const baseSchema = buildClientSchema(data.data, {
      assumeValid: true,
    });

    // We need to remove some duplicate values from our schema we use bare filters to do that!
    const bareFilter = new BareFilter({
      filters: ['PDAMetadata.!status', 'RequestMetadata.!request'],
    });
    const modifedSchema = bareFilter.transformSchema(baseSchema);

    // Now we get perfect schema which we can use to generate ts files
    return {
      unifiedSchema: getUnifiedSchema(modifedSchema),
      rawSource: data.data,
    };
  } catch (error) {
    throw error;
  }
}

async function generateSdk() {
  try {
    const { rawSource, unifiedSchema } = await fetchAndGetUnifiedSchema();
    generateTsArtifacts({
      baseDir: join(__dirname, '..', '..'),
      artifactsDirectory: 'gatewaySdk',
      fileType: 'ts',
      rawSources: [rawSource],
      setDepth: 2,
      unifiedSchema,
    });
  } catch (error) {
    console.log('Error in generateSdk: ', error);
  }
}

generateSdk();
