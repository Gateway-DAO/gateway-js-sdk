#!/bin/sh

files="dist/gatewaySdk/sources/*.js dist/gatewaySdk/src/*.js"

for file in $files; do
    uglifyjs "$file" -o "$file"
done

echo "Compression completed successfully."
