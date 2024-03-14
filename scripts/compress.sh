#!/bin/sh



files="dist/gatewaySdk/index.js dist/src/auth/auth.js dist/src/data-model/data-model.js  dist/src/dataRequestsTemplate/dataRequestsTemplate.js dist/src/organization/organization.js dist/src/pda/pda.js dist/src/proof/proof.js dist/src/request/request.js dist/src/user/user.js"

for file in $files; do
    uglifyjs "$file" -o "$file"
done

echo "Compression completed successfully."
