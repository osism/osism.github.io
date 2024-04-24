#!/usr/bin/env pyton3

import re

import requests

FILES = [
    {
        "source": "https://raw.githubusercontent.com/SovereignCloudStack/docs/main/docs/02-iaas/guides/user-guide/security-groups/security-groups.md",
        "repository": "SovereignCloudStack/docs",
        "target": "docs/guides/user-guide/openstack/security-groups.md",
        "header": "---\nsidebar_label: Security groups\n---\n\n",
        "title": "How to configure and use security groups",
    },
    {
        "source": "https://raw.githubusercontent.com/SovereignCloudStack/openstack-health-monitor/main/docs/Debian12-Install.md",
        "repository": "SovereignCloudStack/openstack-health-monitor",
        "target": "docs/guides/other-guides/openstack-health-monitor.md",
        "header": "---\nsidebar_label: OpenStack Health Monitor\n---\n\n",
        "title": "Setting up OpenStack health monitor on Debian",
    },
]

for file in FILES:
    r = requests.get(file["source"], allow_redirects=True)
    with open(file["target"], "wb") as fp:
        fp.write(str.encode(file["header"]))

        if "title" in file:
            text = re.sub("^# .*", f"# {file['title']}", r.text)
            fp.write(str.encode(text))
        else:
            fp.write(r.rontent)


        footer = f"\n\n_The source of this document can be found in the [{file['repository']}]({file['source']}) repository._\n"
        fp.write(str.encode(footer))
