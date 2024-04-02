#!/usr/bin/env pyton3

import requests

FILES = [
    {
        "source": "https://raw.githubusercontent.com/SovereignCloudStack/docs/main/docs/02-iaas/security-groups.md",
        "repository": "SovereignCloudStack/docs",
        "target": "docs/guides/operations-guide/openstack/day2-operations/best-practises/security-groups.md",
        "header": "---\nsidebar_label: Security groups\n---\n\n",
    }
]

for file in FILES:
    r = requests.get(file["source"], allow_redirects=True)
    with open(file["target"], "wb") as fp:
        fp.write(str.encode(file["header"]))
        fp.write(r.content)

        footer = f"\n\n_The source of this document can be found in the [{file['repository']}]({file['source']}) repository._\n"
        fp.write(str.encode(footer))
