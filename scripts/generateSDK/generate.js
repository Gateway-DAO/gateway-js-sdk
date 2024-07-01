const { buildClientSchema, getIntrospectionQuery } = require('graphql');
const { getUnifiedSchema } = require('./utils');
const BareFilter = require('./BareFilter');
const { generateTsArtifacts } = require('./generateArtificats');
const { join } = require('path');
const fs = require('fs');

async function fetchAndGetUnifiedSchema({ url }) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept:
          'application/graphql-response+json, application/json, multipart/mixed',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const baseSchema = buildClientSchema(data.data, {
      assumeValid: true,
    });

    const bareFilter = new BareFilter({
      filters: ['PDAMetadata.!status', 'RequestMetadata.!request'],
    });
    let modifedSchema = bareFilter.transformSchema(baseSchema);

    return {
      unifiedSchema: getUnifiedSchema(modifedSchema),
      rawSource: data.data,
    };
  } catch (error) {
    throw error;
  }
}

async function generateSdk({ url, sdkName, regexs }) {
  try {
    fs.access(join(__dirname, '..', '..', 'gatewaySdk'), (err) => {
      if (err) {
      } else {
        fs.rmdir(
          join(__dirname, '..', '..', 'gatewaySdk'),
          { recursive: true },
          (e) => {
            if (e) console.log('Error in deleting existing artifacts: ', e);
          },
        );
      }
    });

    const { rawSource, unifiedSchema } = await fetchAndGetUnifiedSchema({
      url,
    });

    await generateTsArtifacts({
      baseDir: join(__dirname, '..', '..'),
      artifactsDirectory: 'gatewaySdk',
      fileType: 'ts',
      rawSources: [rawSource],
      setDepth: 2,
      unifiedSchema,
      sdkName,
      regexs,
    });
    console.log(`Done Generating ${sdkName}`);
  } catch (error) {
    console.error('Error in generateSdk: ', error);
  }
}

const generateSdkInBatch = () => {
  const configs = [
    {
      sdkName: 'GatewayV2',
      url: 'https://develop.protocol.mygateway.xyz/graphql',
    },
    {
      sdkName: 'GatewayV3',
      url: 'https://v3-dev.protocol.mygateway.xyz/graphql',
      regexs: [/dataAsset\s*{[^}]*}/g, /data\s*{\s*dataUse\s*}/g],
    },
  ];
  // url: 'http:127.0.0.1:3000/graphql',
  configs.forEach(
    async (config) =>
      await generateSdk({
        url: config.url,
        sdkName: config.sdkName,
        regexs: config.regexs,
      }),
  );
};

generateSdkInBatch();
