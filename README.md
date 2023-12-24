# FeeBac Dashboard

Make sure you have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) installed. Use the latest LTS or refer the `.nvmrc` file.

Clone the repo and install the dependencies

```bash
pnpm install
```

Create an api key for [TinyMCE](https://www.tiny.cloud/auth/signup/) editor.

Create .env files based on the mode you are currently in (local, production, staging, etc.). Refer [Env Variables and Modes](https://vitejs.dev/guide/env-and-mode) for more info.

```bash
cp .env.sample .env.local
```

Run the dev server

```bash
pnpm run dev
```

For a production build, create a separate environment variable. Any env variable WITHOUT the `.local` extension will NOT BE ignored by git.

```bash
cp .env.sample .env.production
pnpm build
```

Deploy the contents of /dist on your desired http server.
