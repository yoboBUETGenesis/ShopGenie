# Tech-stack Of the Project

We have used Qdrant for hosting the vector database in the cloud. For text embedding, we have used text-embedding-3-small model from openAI. We have used Sveltekit as a meta framework covering both the front-end and the backend. For database we have used postgres. Database in hosted in supabase.

# Set up and usage
## Cloning the repository

You can clone the repository by simply

```bash
git clone https://github.com/yoboBUETGenesis/workspace.git
```

## Developing

Once you've cloned the project, install the required dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# or use pnpm
pnpm run dev 
```

## Building

To create a production version of your app:

```bash
npm run build

# or use pnpm
pnpm run build 
```

You can preview the production build with `npm run preview`.

> You will be needing an environment file copnsisting of the following entities
```bash
PUBLIC_SUPABASE_URL="*************************************"
PUBLIC_SUPABASE_ANON_KEY="*************************************"
OPENAI_KEY_2="*************************************"
QDRANT_HOST="*************************************"
QDRANT_API_KEY="*************************************"
GOOGLE_API_KEY_1= "*************************************"
GOOGLE_API_KEY_2= "*************************************"
```

