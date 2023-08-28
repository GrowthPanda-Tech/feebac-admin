# Setup

Make sure you have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) installed.  
Installing node through a package manager like [nvm](https://github.com/nvm-sh/nvm)/[fnm](https://github.com/Schniz/fnm) is highly recommended.

If you are installing through package manager just run in project root and it will automatically install the required node version.

```bash
nvm install
nvm use
```

Clone the repo and install the dependencies

```bash
pnpm install
```

Create an api key for [TinyMCE](https://www.tiny.cloud/auth/signup/) editor.  
Create a .env file in the project root and add the following to it

```bash
VITE_BACKEND_URL=your_server_url
VITE_TINY_API_KEY=your_tiny_api_key
```

and run the dev server

```bash
pnpm run dev
```
