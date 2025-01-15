"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2003],{5125:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"guides/developer-guide/releases","title":"Releases","description":"How we handle releases","source":"@site/docs/guides/developer-guide/releases.md","sourceDirName":"guides/developer-guide","slug":"/guides/developer-guide/releases","permalink":"/de/docs/guides/developer-guide/releases","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/developer-guide/releases.md","tags":[],"version":"current","sidebarPosition":10,"frontMatter":{"sidebar_label":"Releases","sidebar_position":10},"sidebar":"tutorialSidebar","previous":{"title":"Developer Guide","permalink":"/de/docs/guides/developer-guide/"},"next":{"title":"Scripts","permalink":"/de/docs/guides/developer-guide/scripts"}}');var i=s(4848),r=s(8453);const o={sidebar_label:"Releases",sidebar_position:10},a="Releases",l={},d=[{value:"How we handle releases",id:"how-we-handle-releases",level:2},{value:"How to make a release",id:"how-to-make-a-release",level:2},{value:"Stable release",id:"stable-release",level:3},{value:"How we write release notes",id:"how-we-write-release-notes",level:2},{value:"Installation",id:"installation",level:3},{value:"Usage",id:"usage",level:3},{value:"Example",id:"example",level:3},{value:"Repositories without release notes",id:"repositories-without-release-notes",level:3}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"releases",children:"Releases"})}),"\n",(0,i.jsx)(n.h2,{id:"how-we-handle-releases",children:"How we handle releases"}),"\n",(0,i.jsx)(n.p,{children:"Currently we do a major release every 6 months. Minor releases we do when\nneeded and about every 2 weeks."}),"\n",(0,i.jsx)(n.p,{children:"In a minor release, only updates, bug fixes, etc. take place. There are also\nno major upgrades of included components such as OpenStack, Keycloak or Ceph\nin a minor release."}),"\n",(0,i.jsx)(n.p,{children:"It is possible to jump from any minor version within a major version to higher\nminor versions without any intervention."}),"\n",(0,i.jsx)(n.p,{children:"Deprecations, removals, etc. take place in a major release. New mandatory\nfeatures are also added in a major release. Upgrades of the included components\ncan also take place during a major release (e.g. OpenStack Xena -> OpenStack Yoga)."}),"\n",(0,i.jsx)(n.p,{children:"It is possible to jump from the previous major version to the next major version.\nIt may be that manual intervention is necessary. For example, configuration\nparameters may need to be added or services that no longer exist may need to be\nremoved."}),"\n",(0,i.jsx)(n.h2,{id:"how-to-make-a-release",children:"How to make a release"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["On all repositories that are used, check that the versions to be used have an\nappropriate version tag (e.g. ",(0,i.jsx)(n.code,{children:"v0.20230308.0"}),")."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism/ansible-collection-commons\nosism/ansible-collection-services\nosism/ansible-collection-validations\nosism/ansible-defaults\nosism/ansible-playbooks\nosism/ansible-playbooks-manager\nosism/cf-generics\nosism/kolla-operations\nosism/python-osism\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Copy the ",(0,i.jsx)(n.code,{children:"latest"})," directory. The release to be created is used as the new name."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"latest -> 6.0.0b\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Remove all ",(0,i.jsx)(n.code,{children:"# renovate"})," lines from the ",(0,i.jsx)(n.code,{children:"base.yml"})," file."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Remove all Ceph and OpenStack releases that should not be part of the pre-release.\nThere is only one OpenStack version and one Ceph version per (pre-)release."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Ensure that the symlinks ",(0,i.jsx)(n.code,{children:"openstack.yml"})," and ",(0,i.jsx)(n.code,{children:"ceph.yml"})," point to the releases\nto be used in this pre-release."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"base.yml\nceph-pacific.yml\nceph.yml -> ceph-pacific.yml\nopenstack-zed.yml\nopenstack.yml -> openstack-zed.yml\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Run ",(0,i.jsx)(n.code,{children:"src/prepare-release.py"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"RELEASE=6.0.0b python3 src/prepare-release.py\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Do the steps from the ",(0,i.jsx)(n.code,{children:"Stable release"})," starting from the 4th step."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"stable-release",children:"Stable release"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Copy the directory of the last pre-release or the previous stable release.\nThe release to be created is used as the new name."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"5.0.0a -> 5.0.0b\n5.0.0b -> 5.0.0\n5.0.0  -> 5.1.0\n5.1.0  -> 5.2.0\n5.2.0  -> 5.3.0\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Change all necessary versions in the YAML files within the new directory.\nIn any case, the version of the pre-release or the version of the stable\nrelease must be replaced by the release to be created."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"The release to be created is submitted as a pull request as usual and then\nmerged."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Add a tag with the name of the new release to the listed repositories."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism/container-image-ceph-ansible\nosism/container-image-inventory-reconciler\nosism/container-image-osism-ansible\nosism/container-images-kolla\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["After completing the creation of the images in repository ",(0,i.jsx)(n.code,{children:"container-images-kolla"}),",\nthe file ",(0,i.jsx)(n.code,{children:"images.yml"})," must be added to repository ",(0,i.jsx)(n.code,{children:"osism/sbom"})," as\n",(0,i.jsx)(n.code,{children:"5.0.0/openstack.yml"})," (instead of ",(0,i.jsx)(n.code,{children:"5.0.0"}),", the corresponding release is used).\nThe file is available as a build artefact of the ",(0,i.jsx)(n.code,{children:"Release container images"})," action\non the created tag."]}),"\n",(0,i.jsxs)(n.p,{children:["Before the file is added, it is enhanced with the checksums of the images. The script\nis available in the ",(0,i.jsx)(n.code,{children:"osism/sbom"})," repository."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"VERSION=5.0.0 python3 scripts/add-image-checksum.py\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"5.0.0/openstack.yml"})," is present in ",(0,i.jsx)(n.code,{children:"osism/sbom"}),", repository\n",(0,i.jsx)(n.code,{children:"osism/container-image-kolla-ansible"})," can be tagged like the other\nrepositories before."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add the created SPDX files from the listed repositories to the ",(0,i.jsx)(n.code,{children:"osism/sbom"})," repository.\nThe file are available as build artefacts of the ",(0,i.jsx)(n.code,{children:"Build container image"})," action\non the created tags."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism/container-image-ceph-ansible\nosism/container-image-kolla-ansible\nosism/container-image-osism-ansible\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add and run temporary CI jobs in ",(0,i.jsx)(n.code,{children:"osism/testbed"})," that uses the pre-release."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'- job:\n    name: testbed-deploy-stable-next\n    parent: testbed-deploy\n    vars:\n      manager_version: "5.0.0a"\n      refstack: true\n    nodeset: testbed-orchestrator\n\n- job:\n    name: testbed-upgrade-stable-next\n    parent: testbed-deploy\n    vars:\n      manager_version: "4.2.0"\n      manager_version_next: "5.0.0a"\n    nodeset: testbed-orchestrator\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Test. Test. Test."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Prepare a PR to change the stable version to the new stable version in the following Zuul jobs\nin the ",(0,i.jsx)(n.code,{children:"osism/testbed"})," repository. All tests there must pass successfully before the tag is\nset on this repository in the next step. The temporary CI jobs (step 8)  are removed again with\nthis PR."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"testbed-deploy-stable\ntestbed-update-stable\ntestbed-update-stable\ntestbed-upgrade-stable\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add a new release notes file to ",(0,i.jsx)(n.code,{children:"doc/sorce/notes"}),". Generate the versions table with the\nhelp of the ",(0,i.jsx)(n.code,{children:"release-table.py"})," script in the ",(0,i.jsx)(n.code,{children:"osism/sbom"})," repository."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["After all known issues are documented, a corresponding tag, e.g. ",(0,i.jsx)(n.code,{children:"5.0.0"}),", is set on the\n",(0,i.jsx)(n.a,{href:"https://github.com/osism/release/releases",children:"osism/release"})," repository."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Create a ",(0,i.jsx)(n.a,{href:"https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository",children:"GitHub release"})," with the new tag on the\n",(0,i.jsx)(n.a,{href:"https://github.com/osism/release/releases",children:"osism/release"})," repository. The release is\nnow public available."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["As the last of the release process, the previously prepared PR is merged on the\n",(0,i.jsx)(n.code,{children:"osism/testbed"})," repository to change the stable version."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"how-we-write-release-notes",children:"How we write release notes"}),"\n",(0,i.jsxs)(n.p,{children:["We use ",(0,i.jsx)(n.a,{href:"https://docs.openstack.org/reno/latest/",children:"Reno"})," to manage the release notes."]}),"\n",(0,i.jsx)(n.h3,{id:"installation",children:"Installation"}),"\n",(0,i.jsxs)(n.p,{children:["Reno is provided as a ",(0,i.jsx)(n.a,{href:"https://pypi.org/project/reno/",children:"Python package"})," and can be installed with pip."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"pip3 install reno\n"})}),"\n",(0,i.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.p,{children:["For each change in a repository, a release note is created with Reno.\nSomething meaningful is used as the name for the note. For example, if the\nrequirements file for Ansible is removed, ",(0,i.jsx)(n.code,{children:"remove-ansible-requirements"})," is a good name."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"$ reno new remove-ansible-requirements\nno configuration file in: ./releasenotes/config.yaml, ./reno.yaml\nCreated new notes file in releasenotes/notes/remove-ansible-requirements-6c6eba43f616bc6b.yaml\n"})}),"\n",(0,i.jsx)(n.p,{children:"The created file contains prepared entries for several categories. It is described briefly\nin each instance which contents belong in which category. What is not needed is deleted."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"prelude: >\n    Replace this text with content to appear at the top of the section for this\n    release. All of the prelude content is merged together and then rendered\n    separately from the items listed in other parts of the file, so the text\n    needs to be worded so that both the prelude and the other items make sense\n    when read independently. This may mean repeating some details. Not every\n    release note requires a prelude. Usually only notes describing major\n    features or adding release theme details should have a prelude.\nfeatures:\n  - |\n    List new features here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nissues:\n  - |\n    List known issues here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nupgrade:\n  - |\n    List upgrade notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\ndeprecations:\n  - |\n    List deprecations notes here, or remove this section.  All of the list\n    items in this section are combined when the release notes are rendered, so\n    the text needs to be worded so that it does not depend on any information\n    only available in another section, such as the prelude. This may mean\n    repeating some details.\ncritical:\n  - |\n    Add critical notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nsecurity:\n  - |\n    Add security notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nfixes:\n  - |\n    Add normal bug fixes here, or remove this section.  All of the list items\n    in this section are combined when the release notes are rendered, so the\n    text needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nother:\n  - |\n    Add other notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\n"})}),"\n",(0,i.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:["Here is an example of a ",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-generics/commit/e2f04a9f4a51eb058446d7a8ab6835df53989099",children:"commit from the osism/cfg-generics repository"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"---\nfeatures:\n  - |\n    The `requirements.yml` has been removed. The version will be set in the `run.sh`\n    script for the seed process in the future exactly as later in the update process\n    via the parameters `ANSIBLE_COLLECTION_SERVICES_VERSION` and\n    `ANSIBLE_PLAYBOOKS_MANAGER_VERSION`.\nupgrade:\n  - |\n    In existing configuration repositories, the `environments/manager/requirements.yml`\n    file can be removed after the generics have been synced.\n"})}),"\n",(0,i.jsx)(n.h3,{id:"repositories-without-release-notes",children:"Repositories without release notes"}),"\n",(0,i.jsx)(n.p,{children:"We do not create release notes in the following repositories:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"osism/github-manager"}),"\n",(0,i.jsx)(n.li,{children:"osism/osism.github.io"}),"\n",(0,i.jsx)(n.li,{children:"osism/release"}),"\n"]})]})}function c(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var t=s(6540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);