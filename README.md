![](https://raw.githubusercontent.com/Gateway-DAO/ui/main/apps/website/public/social.png)

# ⚙️ Gateway Javascript SDK

POC made using graphql mesh

## 🔧 Installation

1. Clone this repo

   ```sh
   git clone https://github.com/Gateway-DAO/javascript-sdk
   ```

2. Install dependencies using pnpm

   ```sh
   pnpm i
   ```

3. Create the sdk using graphql mesh(it should give .mesh folder with sdk in it)

   ```sh
   pnpm mesh build
   ```

4. Replace the bearer token with yours in custom-fetch file

   ```sh
   init.headers["Authorization"] =
    "Bearer your-token";
   ```

5. Run dev command to test sdk

   ```sh
   pnpm dev
   ```
