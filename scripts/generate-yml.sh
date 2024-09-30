#!/bin/bash

JSON_URL="https://api.gateway.tech/docs/openapi3_full.json" 
JSON_FILE="api.json"
YAML_FILE="api.yml"

echo "Fetching JSON file from $JSON_URL..."
curl -o $JSON_FILE $JSON_URL

if [[ ! -f $JSON_FILE ]]; then
    echo "Failed to download the JSON file."
    exit 1
fi

echo "Converting JSON to YAML..."
swagger-cli bundle $JSON_FILE --outfile $YAML_FILE --type yaml

if [[ $? -ne 0 ]]; then
    echo "Failed to convert JSON to YAML."
    exit 1
fi



echo "YAML file $YAML_FILE has been created successfully."

echo "Creating api.d.ts file"
npx openapi-typescript ./api.yml --output ./src/api.d.ts

if [[ $? -ne 0 ]]; then
    echo "Failed to create api.d.ts file."
    exit 1
fi


echo "Creating types"
node ./scripts/generate-types.js

if [[ $? -ne 0 ]]; then
    echo "Failed to create types."
    exit 1
fi

echo "Formatting using prettier "
pnpm format


echo "Deleting the JSON file..."
rm $JSON_FILE

if [[ ! -f $JSON_FILE ]]; then
    echo "Successfully deleted the JSON file."
else
    echo "Failed to delete the JSON file."
fi