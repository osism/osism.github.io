---
name: security-advisory
description: Write or update an OSISM security advisory page (docs/appendix/security/ossa-YYYY-NNN.md plus its row in index.md) from an OpenStack Security Advisory. The only input is the OSSA reference (review.opendev.org change URL or number, OSSA id, or security.openstack.org URL); the skill collects the OSSA document, Launchpad bugs, upstream fix reviews and releases, CVE records and the OSISM container-images-kolla fixes automatically and drafts the advisory in the established format. Use when asked to write, add, draft or update a security advisory, OSSA note or CVE page for OSISM.
argument-hint: <OSSA review URL | change number | OSSA-YYYY-NNN>
allowed-tools:
  - Bash(python3 ${CLAUDE_SKILL_DIR}/scripts/collect.py:*)
  # allowed-tools pre-approves, it does not sandbox: every entry is a grant. curl is therefore
  # limited to the hosts of reference/sources.md (unquoted and single-quoted URL, as written
  # there) and gh api to the read-only endpoints the workflow uses. Anything else prompts.
  - Bash(curl -s https://review.opendev.org/*)
  - Bash(curl -s 'https://review.opendev.org/*)
  - Bash(curl -s https://opendev.org/*)
  - Bash(curl -s 'https://opendev.org/*)
  - Bash(curl -s https://api.launchpad.net/1.0/bugs/*)
  - Bash(curl -s https://cveawg.mitre.org/api/cve/*)
  - Bash(curl -s https://raw.githubusercontent.com/osism/*)
  - Bash(curl -s 'https://registry.osism.tech/service/token?*)
  - Bash(base64 -d)
  - Bash(gh api 'repos/osism/container-images-kolla/git/trees/*)
  - Bash(gh api 'repos/osism/container-images-kolla/commits?path=*)
  - Bash(gh api repos/osism/container-images-kolla/commits/*)
  - Bash(gh api repos/openstack/*/git/ref/tags/*)
  - Bash(gh pr view * --repo osism/container-images-kolla *)
  - Bash(gh pr list --repo osism/container-images-kolla *)
  - Bash(git log:*)
  - Bash(git diff:*)
  - Bash(git status:*)
  - Bash(npx --no-install markdownlint-cli2:*)
  - Bash(npx --no-install markdown-table-formatter:*)
  - Read
  - Glob
  - Grep
  - AskUserQuestion
  - Edit(docs/appendix/security/**)
  - Write(docs/appendix/security/**)
  - WebFetch(domain:review.opendev.org)
  - WebFetch(domain:opendev.org)
  - WebFetch(domain:security.openstack.org)
  - WebFetch(domain:releases.openstack.org)
  - WebFetch(domain:docs.openstack.org)
  - WebFetch(domain:bugs.launchpad.net)
  - WebFetch(domain:api.launchpad.net)
  - WebFetch(domain:launchpad.net)
  - WebFetch(domain:www.cve.org)
  - WebFetch(domain:cveawg.mitre.org)
  - WebFetch(domain:github.com)
  - WebFetch(domain:raw.githubusercontent.com)
  - WebFetch(domain:www.openwall.com)
---

# Security advisory from an OSSA

Input: `$ARGUMENTS` — one OSSA reference. Output: `docs/appendix/security/ossa-yyyy-nnn.md`, a row
in `docs/appendix/security/index.md`, a verification report and a proposed commit message. Nothing
is committed unless the author asks for it.

Supporting files: [reference/style.md](reference/style.md) (content and wording rules),
[reference/template.md](reference/template.md) (skeleton), [reference/sources.md](reference/sources.md)
(APIs and commands), `scripts/collect.py` (automatic research).

## 1. Collect the facts

- If `$ARGUMENTS` is empty, ask for the OSSA reference (review URL, change number or OSSA id).
- Run the collector; use your scratchpad directory as output directory:

  ```bash
  python3 ${CLAUDE_SKILL_DIR}/scripts/collect.py "$ARGUMENTS" --output-dir <scratchpad>/security-advisory
  ```

- Read the generated `dossier.md` completely. `raw.json` in the same directory holds the full data
  (bug descriptions, commit messages, CVE JSON, patch headers) — consult it whenever the dossier only
  shows an excerpt. Section 13 lists sources that could not be reached; fetch those manually with
  the commands in `reference/sources.md`.
- The dossier never turns a failed lookup into a negative: `lookup failed`, `unknown` and
  `unverified` mean "not known", and each of them has an open point in section 12. Resolve them
  manually or with the author; never write them into the advisory as "none" or "no".
- Apply the need-to-know rule — it is defined once, in `reference/style.md` ("Need-to-know
  principle"). The collector raises every violation as a `STOP` point at the top of dossier
  section 12: stop there and tell the author. A merged OSSA change does not lift a `STOP`.
- If GitHub is unreachable, rerun with `--no-github` and look up the OSISM patch files and pull
  requests manually. The dossier then marks all GitHub data as unknown and asks the coverage
  question for every release.
- A change that adds several advisories at once is only accepted together with the OSSA id; the
  collector refuses to pick one of them on its own.

## 2. Load the conventions

- Read `reference/style.md` and `reference/template.md`.
- Read the two exemplar advisories named in dossier section 10 in full. They define tone, depth,
  table variants, check commands and reference order; the new page must read like them.

## 3. Understand the vulnerability and the fix

- Fetch the diff of the upstream fix for the newest series (command in dossier section 4) and
  read it. Identify the root cause (function, file), the exploitation prerequisites (role,
  configuration, API), what the fix changes, new configuration options and behavior changes, and
  whether several patches depend on each other (OSSA notes, dossier section 2).
- Decide which services and container images execute the affected code. Use the kolla images,
  the kolla-ansible tag variables and the OSISM image parameters in dossier section 9; for
  libraries, name the images that install them. The override snippet sets the `*_tag` **and every
  `<service>*_image` parameter** with the rolling `kolla` namespace (stable releases pull from
  `kolla/release/<openstack_version>`); list only images that section 9 shows in the rolling
  registry.
- Determine the OSISM impact: enable flags and defaults (section 9), the OSISM configuration guide
  (`docs/guides/configuration-guide/openstack/<service>.md`) and default policies. Decide whether a
  default OSISM deployment is affected and write the checks an operator can run
  (`docker exec …`, `openstack …`, configuration repository greps).

## 4. Decide the release coverage

- Use the coverage matrix in dossier section 11. List every OpenStack release OSISM builds images
  for — including the `YYYY.2` releases that are not officially supported but always receive the
  fixes in practice — plus the newest upstream release and the development series with their
  upstream status.
- Map versions to series only through dossier section 6 (upstream deliverables), never from
  memory: the major version of a project does not equal its OpenStack release. Where section 6
  says **unverified**, take the series from the branch of the fix review (section 4).
- For every listed release whose coverage column says "Covered = no" (no OSISM patch, no merged
  upstream fix) **or "Covered = unverified"** (only hints: a patch file matched by name or bug
  number, a merged review that is not a fix listed in the OSSA): **ask the author about the status
  before writing** (AskUserQuestion; typical answers: backport in preparation, shipped with the
  next rebuild, will not be fixed, yes that patch is the fix). Never assume and never leave the
  release out. Record the answer in the Affected Versions table and in the
  Remediation section with the wording from `style.md`, and list it under open points in the
  report so the page is updated when the fix ships.
- Per covered release choose the "Fix in OSISM Images" wording from `style.md`: community-curated
  backport with the PR, upstream fix via the stable branch, not shipped by OSISM yet.
- Treat pending CVE ids, unmerged upstream reviews and unreleased fixed versions as such; never
  present expectations as facts.

## 5. Write the advisory

- New advisory: fill the template. Existing file (dossier section 10 says update mode): keep the
  structure, update the facts (CVE ids, errata date, release status, OSISM fix), do not rewrite
  prose that is still correct.
- Follow `style.md` for every section: property table, scope sentence, version ranges quoted
  verbatim, check commands with interpretation, vulnerability details from the diff, remediation
  with the fix reference and the tag override, mitigation, references in the fixed order.
- Add the index row (sorted by advisory id, component `OpenStack <Project>`).

## 6. Verify

- No `{{` placeholder left; headings and their order match the template; the Date is the OSSA
  date; every CVE, bug and review from the dossier appears in References; PR numbers, commit shas,
  version numbers and dates match the dossier.
- Run `npx --no-install markdownlint-cli2` and `npx --no-install markdown-table-formatter --check`
  on the advisory and the index; apply the table formatter when the check fails.
- Check that every external link resolves (loop in `reference/sources.md`; CVE links may still be
  404 while the record is pending — say so in the report) and that in-page anchors exist.

## 7. Report

Summarize for the author: the files written, the coverage decisions, assumptions made, open points
(dossier section 12 plus anything found while writing) and the proposed commit message in the format
from `style.md`. Ask whether to commit; commit only on an explicit yes, with the `Assisted-by:` and
`Signed-off-by:` trailers and never with `Co-Authored-By:`.
