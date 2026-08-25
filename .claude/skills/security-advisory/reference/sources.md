# Data sources and commands

`scripts/collect.py` queries all of these automatically. Use the commands here to dig deeper or
when the script could not reach a source. All endpoints are public; none needs authentication
(`gh` is used for GitHub when logged in, which raises the rate limit).

## OSSA document (openstack/ossa on Gerrit and opendev.org)

Gerrit JSON responses start with the line `)]}'` — strip it with `tail -n +2`.

```bash
# change metadata, current revision and file list
curl -s 'https://review.opendev.org/changes/1002324?o=CURRENT_REVISION&o=CURRENT_COMMIT&o=CURRENT_FILES' | tail -n +2

# content of the OSSA YAML in the change (base64)
curl -s 'https://review.opendev.org/changes/1002324/revisions/current/files/ossa%2FOSSA-2026-037.yaml/content' | base64 -d

# find the change for an OSSA id
curl -s 'https://review.opendev.org/changes/?q=project:openstack/ossa+message:%22OSSA-2026-037%22' | tail -n +2

# merged version on master (may contain errata that the change does not)
curl -s https://opendev.org/openstack/ossa/raw/branch/master/ossa/OSSA-2026-037.yaml

# rendered advisory (only after publication)
https://security.openstack.org/ossa/OSSA-2026-037.html
```

OSSA YAML fields: `date`, `id`, `title`, `description`, `affected-products[].product/version`,
`vulnerabilities[].cve-id` (`CVE-YYYY-pending` while unassigned), `reporters[].name/affiliation`,
`issues.links` (Launchpad bugs), `reviews.<series>` (fix reviews per branch), `notes`,
`errata_history`.

## Launchpad

```bash
curl -s https://api.launchpad.net/1.0/bugs/2153453              # title, description, information_type
curl -s https://api.launchpad.net/1.0/bugs/2153453/bug_tasks    # per-project status and importance
curl -s https://api.launchpad.net/1.0/bugs/2153453/attachments  # patches attached during the embargo
```

`information_type` must be `Public Security` before anything is published. Bug titles are updated
with the CVE ids once MITRE assigns them.

## Upstream fix reviews (Gerrit)

```bash
# all changes referencing the bug (all projects and branches)
curl -s 'https://review.opendev.org/changes/?q=message:2153453&n=100' | tail -n +2
curl -s 'https://review.opendev.org/changes/?q=topic:bug/2153453' | tail -n +2

# one change with commit message and files
curl -s 'https://review.opendev.org/changes/1002307?o=CURRENT_REVISION&o=CURRENT_COMMIT&o=CURRENT_FILES' | tail -n +2

# the diff (base64 encoded git format-patch)
curl -s https://review.opendev.org/changes/1002307/revisions/current/patch | base64 -d
```

Status `NEW` = proposed, `MERGED` = merged on the branch, `ABANDONED` = dropped. Branches:
`master` (development series), `stable/2025.1`, `unmaintained/2024.1`.

## Upstream series and releases (openstack/releases)

```bash
# series status: maintained / unmaintained / end of life with dates
curl -s https://opendev.org/openstack/releases/raw/branch/master/data/series_status.yaml

# released versions of a project in a series (by series name, not release id)
curl -s https://opendev.org/openstack/releases/raw/branch/master/deliverables/epoxy/keystone.yaml

# tag date of a released version (GitHub mirror)
gh api repos/openstack/keystone/git/ref/tags/28.0.3
```

Release notes per series: `https://releases.openstack.org/<series>/index.html`.

## CVE records

```bash
curl -s https://cveawg.mitre.org/api/cve/CVE-2026-55707   # JSON: state, description, CVSS metrics
```

HTTP 404 means the record is not published yet; the `https://www.cve.org/CVERecord?id=…` link still
belongs in the advisory and resolves later.

## OSISM: container-images-kolla

Patches live in `patches/<openstack_version>/<project>/[subdir/]NNNN-<slug>.patch` and are
applied in sorted order to the project tarball when the images are built (see `scripts/003-patch.sh`
and `scripts/patch-lib.sh`). File names follow `git format-patch`, so the slug equals the upstream
commit subject. `defaults/<version>.sh` lists the OpenStack versions that are built.

```bash
# whole tree in one call
gh api 'repos/osism/container-images-kolla/git/trees/main?recursive=1' --jq '.tree[].path' | grep '^patches/2025.1/keystone/'

# commit that added a patch file, and its pull request
gh api 'repos/osism/container-images-kolla/commits?path=patches/2025.1/keystone/0001-x.patch' --jq 'last(.[]).sha'
gh api repos/osism/container-images-kolla/commits/<sha>/pulls --jq '.[] | "#\(.number) \(.title) \(.merge_commit_sha) \(.html_url)"'

# pull request details
gh pr view 776 --repo osism/container-images-kolla --json title,body,mergeCommit,mergedAt,files

# search
gh pr list --repo osism/container-images-kolla --state all --search "CVE-2026-55707"
curl -s https://raw.githubusercontent.com/osism/container-images-kolla/main/CHANGELOG.md | grep -n -i "cve-2026-55707"
```

The images for a release are built from the upstream branch tarballs (`stable/<version>`,
`unmaintained/<version>`); a fix merged upstream on that branch is therefore included on the next
rebuild without a patch file.

## Kolla images and kolla-ansible variables

```bash
# image directories of a project (one image per directory)
curl -s 'https://opendev.org/api/v1/repos/openstack/kolla/contents/docker/keystone?ref=stable/2025.1' | python3 -c 'import json,sys; print([e["name"] for e in json.load(sys.stdin)])'

# image tag variables to override in environments/kolla/images.yml
curl -s https://opendev.org/openstack/kolla-ansible/raw/branch/stable/2025.1/ansible/roles/nova/defaults/main.yml | grep -E '^[a-z_]+_tag:'

# enable flag defaults
curl -s https://opendev.org/openstack/kolla-ansible/raw/branch/stable/2025.1/ansible/group_vars/all.yml | grep -E '^enable_designate'
curl -s https://raw.githubusercontent.com/osism/cfg-generics/main/environments/kolla/configuration.yml | grep -E '^enable_designate'
```

## OSISM image parameters and rolling images

```bash
# image and tag parameters per service (rolling namespace: kolla; stable releases: kolla/release/<version>)
curl -s https://raw.githubusercontent.com/osism/defaults/main/all/002-images-kolla.yml | grep -E '^keystone[a-z_]*_(image|tag):'

# tags of a rolling image (anonymous token flow of the Harbor registry)
tok=$(curl -s 'https://registry.osism.tech/service/token?service=harbor-registry&scope=repository:kolla/keystone:pull' | python3 -c 'import json,sys; print(json.load(sys.stdin)["token"])')
curl -s -H "Authorization: Bearer $tok" https://registry.osism.tech/v2/kolla/keystone/tags/list
```

## Local repository

- `docs/appendix/security/ossa-*.md` — existing advisories (the two newest are the style
  reference), `docs/appendix/security/index.md` — the table to extend.
- `docs/release-notes/index.md` — OSISM release status; `docs/release-notes/osism-N.md` — the
  OpenStack releases each OSISM release ships (`### OpenStack YYYY.N` headings).
- `docs/concepts/release-cadence.md` — SLURP-only support policy and the OSISM ↔ OpenStack mapping.
- `docs/guides/configuration-guide/openstack/<service>.md` — OSISM defaults and configuration
  options of the affected service (for the Impact section).

## Verification

```bash
npx --no-install markdownlint-cli2 docs/appendix/security/ossa-2026-037.md docs/appendix/security/index.md
npx --no-install markdown-table-formatter --check docs/appendix/security/ossa-2026-037.md docs/appendix/security/index.md
npx --no-install markdown-table-formatter docs/appendix/security/ossa-2026-037.md docs/appendix/security/index.md   # apply
grep -oE 'https?://[^ )>]+' docs/appendix/security/ossa-2026-037.md | sort -u | while read -r url; do printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' -L "$url")" "$url"; done
```
