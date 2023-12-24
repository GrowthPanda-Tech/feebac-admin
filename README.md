# FeeBac Dashboard

Make sure you have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) installed. I recommend using a [version manager](https://nodejs.org/en/download/package-manager). If you want to install manually, refer the `.node-version` file for the recommended node version.

Clone the repo and install the dependencies

```bash
git clone https://github.com/GrowthPanda-Tech/feebac-admin.git
cd feebac-admin
pnpm install
```

Create an API key for [TinyMCE](https://www.tiny.cloud/auth/signup/) editor. This serves as a rich text editor in the project.

Create an environment variable based on the mode you are currently in (`development`, `staging` or `production`). Refer [Env Variables and Modes](https://vitejs.dev/guide/env-and-mode) for more information.

```bash
cp .env.sample .env.development.local
```

Put in the relevant values and run the dev server

```bash
pnpm dev
```

For a production build, create a separate environment variable. Any environment variables WITHOUT the `.local` extension will NOT BE ignored by git.

```bash
cp .env.sample .env.production.local
pnpm build
```

Deploy the contents of `dist` on your web server of choice.
