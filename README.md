This is a [Next.js](https://nextjs.org/) project with preconfigured [Typescript](https://typescriptlang.org) and [ChakraUI](https://chakra-ui.com). There are also github actions, bash scripts for git workflow as well as prettier, eslint and Jest testing tools.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Commads

One of the husky scripts makes sure that your commits will be named in Angular convention.
To commit all current changes run:

```bash
npm run commit
```

There are also other scripts to help you work with the project.

Run all tests:

```bash
npm run test
```

Linting:

```bash
npm run lint
```

Formatting:

```bash
npm run format
```

Typescript rules check:

```bash
npm run check-types
```

**These script also run during `git push` to prevent pushing invalid code**
You can omit this behavior by running the command with flag `git push --no-verify`

## Customizing

Feel free to change configs to your liking.
Under `./src` there are some directories that will help you split your code into more readable parts.

Inside `./src/themes/*` you can override default ChakraUI themes and component stylings.

