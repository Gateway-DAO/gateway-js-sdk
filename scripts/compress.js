const fs = require('fs');
const { createMinifier } = require('dts-minify');
const ts = require('typescript');

const minifier = createMinifier(ts);

function processFile(inputFile, outputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${inputFile}: ${err.message}`);
      return;
    }

    const minifiedText = minifier.minify(data);

    fs.writeFile(outputFile, minifiedText, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing to ${outputFile}: ${writeErr.message}`);
      } else {
        console.log(
          `File successfully processed. Modified content written to ${outputFile}`,
        );
      }
    });
  });
}

const filesToProcess = [
  { input: 'dist/gatewaySdk/index.d.ts', output: 'dist/gatewaySdk/index.d.ts' },
  {
    input: 'dist/gatewaySdk/sources/GatewaySDK/types.d.ts',
    output: 'dist/gatewaySdk/sources/GatewaySDK/types.d.ts',
  },
];

filesToProcess.forEach((file) => {
  processFile(file.input, file.output);
});
