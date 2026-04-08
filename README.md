# osism.github.io

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install --global yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Linting

To run the megalinter locally, please follow
[the upstream documentation](https://megalinter.io/v5.0.2/mega-linter-runner/)
and choose your preferred method from there.

To run the same jobs as the GitHub action would, you can use one of the commands
shown below.

Without installation:

```bash
npx mega-linter-runner --flavor documentation
```

With installation:

```bash
npm install mega-linter-runner -g
mega-linter-runner --flavor documentation
```

> \[!NOTE]
> We currently see sporadically errors for the link checker Lychee, most likely
> related to more and more websites reconfiguring their WAF to block AI-agents.
> Since we still see link checking as a relevant task and do not want to do this
> manually, we keep Lychee running for now, but will ignore errors which are
> related to those WAFs blocking our requests, while the link works on manual
> check.
