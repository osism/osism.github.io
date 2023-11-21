"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[6242],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(n),c=r,u=m["".concat(l,".").concat(c)]||m[c]||h[c]||s;return n?a.createElement(u,o(o({ref:t},d),{},{components:n})):a.createElement(u,o({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=c;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[m]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<s;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3622:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const s={sidebar_label:"Releases",sidebar_position:10},o="Releases",i={unversionedId:"advanced-guides/developer-guide/releases",id:"advanced-guides/developer-guide/releases",title:"Releases",description:"How we handle releases",source:"@site/docs/advanced-guides/developer-guide/releases.md",sourceDirName:"advanced-guides/developer-guide",slug:"/advanced-guides/developer-guide/releases",permalink:"/docs/advanced-guides/developer-guide/releases",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/advanced-guides/developer-guide/releases.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Releases",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Developer Guide",permalink:"/docs/advanced-guides/developer-guide/"},next:{title:"Scripts",permalink:"/docs/advanced-guides/developer-guide/scripts"}},l={},p=[{value:"How we handle releases",id:"how-we-handle-releases",level:2},{value:"How to make a release",id:"how-to-make-a-release",level:2},{value:"Stable release",id:"stable-release",level:3},{value:"How we write release notes",id:"how-we-write-release-notes",level:2},{value:"Installation",id:"installation",level:3},{value:"Usage",id:"usage",level:3},{value:"Example",id:"example",level:3},{value:"Repositories without release notes",id:"repositories-without-release-notes",level:3}],d={toc:p},m="wrapper";function h(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"releases"},"Releases"),(0,r.kt)("h2",{id:"how-we-handle-releases"},"How we handle releases"),(0,r.kt)("p",null,"Currently we do a major release every 6 months. Minor releases we do when\nneeded and about every 2 weeks."),(0,r.kt)("p",null,"In a minor release, only updates, bug fixes, etc. take place. There are also\nno major upgrades of included components such as OpenStack, Keycloak or Ceph\nin a minor release."),(0,r.kt)("p",null,"It is possible to jump from any minor version within a major version to higher\nminor versions without any intervention."),(0,r.kt)("p",null,"Deprecations, removals, etc. take place in a major release. New mandatory\nfeatures are also added in a major release. Upgrades of the included components\ncan also take place during a major release (e.g. OpenStack Xena -> OpenStack Yoga)."),(0,r.kt)("p",null,"It is possible to jump from the previous major version to the next major version.\nIt may be that manual intervention is necessary. For example, configuration\nparameters may need to be added or services that no longer exist may need to be\nremoved."),(0,r.kt)("h2",{id:"how-to-make-a-release"},"How to make a release"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"On all repositories that are used, check that the versions to be used have an\nappropriate version tag (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"v0.20230308.0"),")."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"osism/ansible-collection-commons\nosism/ansible-collection-services\nosism/ansible-collection-validations\nosism/ansible-defaults\nosism/ansible-playbooks\nosism/ansible-playbooks-manager\nosism/cf-generics\nosism/kolla-operations\nosism/python-osism\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Copy the ",(0,r.kt)("inlineCode",{parentName:"p"},"latest")," directory. The release to be created is used as the new name."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"latest -> 6.0.0b\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Remove all ",(0,r.kt)("inlineCode",{parentName:"p"},"# renovate")," lines from the ",(0,r.kt)("inlineCode",{parentName:"p"},"base.yml")," file.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Remove all Ceph and OpenStack releases that should not be part of the pre-release.\nThere is only one OpenStack version and one Ceph version per (pre-)release.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Ensure that the symlinks ",(0,r.kt)("inlineCode",{parentName:"p"},"openstack.yml")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"ceph.yml")," point to the releases\nto be used in this pre-release."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"base.yml\nceph-pacific.yml\nceph.yml -> ceph-pacific.yml\nopenstack-zed.yml\nopenstack.yml -> openstack-zed.yml\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Run ",(0,r.kt)("inlineCode",{parentName:"p"},"src/prepare-release.py"),"."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"RELEASE=6.0.0b python3 src/prepare-release.py\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Do the steps from the ",(0,r.kt)("inlineCode",{parentName:"p"},"Stable release")," starting from the 4th step."))),(0,r.kt)("h3",{id:"stable-release"},"Stable release"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Copy the directory of the last pre-release or the previous stable release.\nThe release to be created is used as the new name."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"5.0.0a -> 5.0.0b\n5.0.0b -> 5.0.0\n5.0.0  -> 5.1.0\n5.1.0  -> 5.2.0\n5.2.0  -> 5.3.0\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Change all necessary versions in the YAML files within the new directory.\nIn any case, the version of the pre-release or the version of the stable\nrelease must be replaced by the release to be created.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"The release to be created is submitted as a pull request as usual and then\nmerged.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add a tag with the name of the new release to the listed repositories."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"osism/container-image-ceph-ansible\nosism/container-image-inventory-reconciler\nosism/container-image-osism-ansible\nosism/container-images-kolla\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"After completing the creation of the images in repository ",(0,r.kt)("inlineCode",{parentName:"p"},"container-images-kolla"),",\nthe file ",(0,r.kt)("inlineCode",{parentName:"p"},"images.yml")," must be added to repository ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/sbom")," as\n",(0,r.kt)("inlineCode",{parentName:"p"},"5.0.0/openstack.yml")," (instead of ",(0,r.kt)("inlineCode",{parentName:"p"},"5.0.0"),", the corresponding release is used).\nThe file is available as a build artefact of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Release container images")," action\non the created tag."),(0,r.kt)("p",{parentName:"li"},"Before the file is added, it is enhanced with the checksums of the images. The script\nis available in the ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/sbom")," repository."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"VERSION=5.0.0 python3 scripts/add-image-checksum.py\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"If ",(0,r.kt)("inlineCode",{parentName:"p"},"5.0.0/openstack.yml")," is present in ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/sbom"),", repository\n",(0,r.kt)("inlineCode",{parentName:"p"},"osism/container-image-kolla-ansible")," can be tagged like the other\nrepositories before.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add the created SPDX files from the listed repositories to the ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/sbom")," repository.\nThe file are available as build artefacts of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Build container image")," action\non the created tags."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"osism/container-image-ceph-ansible\nosism/container-image-kolla-ansible\nosism/container-image-osism-ansible\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add and run temporary CI jobs in ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/testbed")," that uses the pre-release."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'- job:\n    name: testbed-deploy-stable-next\n    parent: testbed-deploy\n    vars:\n      manager_version: "5.0.0a"\n      refstack: true\n    nodeset: testbed-orchestrator\n\n- job:\n    name: testbed-upgrade-stable-next\n    parent: testbed-deploy\n    vars:\n      manager_version: "4.2.0"\n      manager_version_next: "5.0.0a"\n    nodeset: testbed-orchestrator\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Test. Test. Test.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Prepare a PR to change the stable version to the new stable version in the following Zuul jobs\nin the ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/testbed")," repository. All tests there must pass successfully before the tag is\nset on this repository in the next step. The temporary CI jobs (step 8)  are removed again with\nthis PR."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"testbed-deploy-stable\ntestbed-update-stable\ntestbed-update-stable\ntestbed-upgrade-stable\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add a new release notes file to ",(0,r.kt)("inlineCode",{parentName:"p"},"doc/sorce/notes"),". Generate the versions table with the\nhelp of the ",(0,r.kt)("inlineCode",{parentName:"p"},"release-table.py")," script in the ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/sbom")," repository.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"After all known issues are documented, a corresponding tag, e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"v5.0.0"),", is set on the\nrelease repository.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"As the last of the release process, the previously prepared PR is merged on the\n",(0,r.kt)("inlineCode",{parentName:"p"},"osism/testbed")," repository to change the stable version."))),(0,r.kt)("h2",{id:"how-we-write-release-notes"},"How we write release notes"),(0,r.kt)("p",null,"We use ",(0,r.kt)("a",{parentName:"p",href:"https://docs.openstack.org/reno/latest/"},"Reno")," to manage the release notes."),(0,r.kt)("h3",{id:"installation"},"Installation"),(0,r.kt)("p",null,"Reno is provided as a ",(0,r.kt)("a",{parentName:"p",href:"https://pypi.org/project/reno/"},"Python package")," and can be installed with pip."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"pip3 install reno\n")),(0,r.kt)("h3",{id:"usage"},"Usage"),(0,r.kt)("p",null,"For each change in a repository, a release note is created with Reno.\nSomething meaningful is used as the name for the note. For example, if the\nrequirements file for Ansible is removed, ",(0,r.kt)("inlineCode",{parentName:"p"},"remove-ansible-requirements")," is a good name."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ reno new remove-ansible-requirements\nno configuration file in: ./releasenotes/config.yaml, ./reno.yaml\nCreated new notes file in releasenotes/notes/remove-ansible-requirements-6c6eba43f616bc6b.yaml\n")),(0,r.kt)("p",null,"The created file contains prepared entries for several categories. It is described briefly\nin each instance which contents belong in which category. What is not needed is deleted."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"prelude: >\n    Replace this text with content to appear at the top of the section for this\n    release. All of the prelude content is merged together and then rendered\n    separately from the items listed in other parts of the file, so the text\n    needs to be worded so that both the prelude and the other items make sense\n    when read independently. This may mean repeating some details. Not every\n    release note requires a prelude. Usually only notes describing major\n    features or adding release theme details should have a prelude.\nfeatures:\n  - |\n    List new features here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nissues:\n  - |\n    List known issues here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nupgrade:\n  - |\n    List upgrade notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\ndeprecations:\n  - |\n    List deprecations notes here, or remove this section.  All of the list\n    items in this section are combined when the release notes are rendered, so\n    the text needs to be worded so that it does not depend on any information\n    only available in another section, such as the prelude. This may mean\n    repeating some details.\ncritical:\n  - |\n    Add critical notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nsecurity:\n  - |\n    Add security notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nfixes:\n  - |\n    Add normal bug fixes here, or remove this section.  All of the list items\n    in this section are combined when the release notes are rendered, so the\n    text needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\nother:\n  - |\n    Add other notes here, or remove this section.  All of the list items in\n    this section are combined when the release notes are rendered, so the text\n    needs to be worded so that it does not depend on any information only\n    available in another section, such as the prelude. This may mean repeating\n    some details.\n")),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("p",null,"Here is an example of a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/osism/cfg-generics/commit/e2f04a9f4a51eb058446d7a8ab6835df53989099"},"commit from the osism/cfg-generics repository"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"---\nfeatures:\n  - |\n    The `requirements.yml` has been removed. The version will be set in the `run.sh`\n    script for the seed process in the future exactly as later in the update process\n    via the parameters `ANSIBLE_COLLECTION_SERVICES_VERSION` and\n    `ANSIBLE_PLAYBOOKS_MANAGER_VERSION`.\nupgrade:\n  - |\n    In existing configuration repositories, the `environments/manager/requirements.yml`\n    file can be removed after the generics have been synced.\n")),(0,r.kt)("h3",{id:"repositories-without-release-notes"},"Repositories without release notes"),(0,r.kt)("p",null,"We do not create release notes in the following repositories:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"osism/github-manager"),(0,r.kt)("li",{parentName:"ul"},"osism/osism.github.io"),(0,r.kt)("li",{parentName:"ul"},"osism/release")))}h.isMDXComponent=!0}}]);