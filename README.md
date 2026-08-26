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

### Containerized Development

```bash
docker run --rm -it -v .:/srv --workdir /srv --network host node:current-alpine /bin/sh -c "npm install --global yarn && yarn install --frozen-lockfile && yarn start"
```

Manually open the development documentation at http://localhost:3000/docs.

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
> We currently see errors for the link checker Lychee which are unrelated to
> actual site availability. Those errors are most likely related to more and
> more websites reconfiguring their WAF to block AI-agents. Since we still see
> link checking as a relevant task and do not want to do this manually, we keep
> Lychee running for now, but will ignore errors if the link works on manual
> check.

## Repository Size

A full clone of this repository uses around 500 MB of disk space, almost all of
it in `.git`. The reason is the `gh-pages` branch: every documentation build
pushes the complete rendered site there as a new commit. About 98% of all Git
objects belong to that branch and are not reachable from `main`.

The largest contributors across the whole history are the two Docusaurus search
indexes, `search-index.json` and `de/search-index.json`, with roughly 270 MB
combined. They are minified JSON with regenerated term IDs, so nearly the entire
file changes on every build and Git cannot store the versions as small deltas.
The rendered HTML under `docs/` and `de/docs/` accounts for another 145 MB.

Local development does not need the `gh-pages` branch. Dropping the
remote-tracking ref and repacking brings the repository down to around 20 MB:

```bash
git branch -rd origin/gh-pages
git config --add remote.origin.fetch '^refs/heads/gh-pages'
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

The second command adds a negative refspec so that `git fetch` does not restore
the branch. It requires Git 2.29 or newer. To undo this, remove the refspec line
from `.git/config` and fetch again.

When cloning fresh, the same can be achieved up front:

```bash
git clone --single-branch https://github.com/osism/osism.github.io.git
```

> \[!NOTE]
> This only affects your local clone. The `gh-pages` branch stays untouched on
> the remote, where GitHub Pages continues to serve the site from it.
