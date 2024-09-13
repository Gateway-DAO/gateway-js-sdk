#!/bin/sh

cd "dist/"

find . -type f -name "*.js" | while read -r file; do
    echo "Processing file: $file"
    uglifyjs "$file" -o "$file"
done

echo "Compression completed successfully."
