## Frontend Overview

This section will give you an overview of using SDK in frontend environment like Next.js.

- **Please upgrade to latest version of sdk to avoid adding any extra configuration for frontend environments.If you are already using latest version of the sdk or upgraded to latest one there is no need to read this doc**. We have some potential solutions(if you are using v1) which will discuss as well in the docs.

### Bypassing graphql mesh using next.config.js (Deperacted in v2 of sdk)

- You need to modify the next.config file in your nextjs application below is the code you paste to make sure you dont get any dependencies errors.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    if (dev !== false)
      config.externals.push(
        'fast-json-stringify',
        '@whatwg-node/fetch',
        'long',
        'uglify-es',
        '@graphql-mesh/utils',
        '@graphql-mesh/tools',
        '@graphql-tools/url-loader',
      );

    return config;
  },
};

module.exports = nextConfig;
```

![](https://github.com/Gateway-DAO/verification-flow-poc/assets/63333707/45f30df6-dfe2-464c-92e7-71a318ba4173) You will still get dependency errors when vercel will deploy the app but that is normal if the build is passing and working then you are good to go!.

- If there are still errors while using SDK on next.js please check [our next.js example](https://github.com/Gateway-DAO/verification-flow-poc/tree/main) where we use SDK to make api calls.

Thanks!
