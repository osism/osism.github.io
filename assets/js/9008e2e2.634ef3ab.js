"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7360],{7885:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"guides/operations-guide/openstack/tools/image-manager/index","title":"Image Manager","description":"The OpenStack Image Manager is","source":"@site/docs/guides/operations-guide/openstack/tools/image-manager/index.md","sourceDirName":"guides/operations-guide/openstack/tools/image-manager","slug":"/guides/operations-guide/openstack/tools/image-manager/","permalink":"/docs/guides/operations-guide/openstack/tools/image-manager/","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/tools/image-manager/index.md","tags":[],"version":"current","sidebarPosition":50,"frontMatter":{"sidebar_label":"Image Manager","sidebar_position":50},"sidebar":"tutorialSidebar","previous":{"title":"Tools","permalink":"/docs/guides/operations-guide/openstack/tools/"},"next":{"title":"Automated updates","permalink":"/docs/guides/operations-guide/openstack/tools/image-manager/update"}}');var t=i(4848),a=i(8453);const r={sidebar_label:"Image Manager",sidebar_position:50},o="Image Manager",l={},d=[{value:"Requirements",id:"requirements",level:2},{value:"Getting started",id:"getting-started",level:2},{value:"Image definitions",id:"image-definitions",level:2},{value:"SCS image standard",id:"scs-image-standard",level:3},{value:"Image with regular rebuilds",id:"image-with-regular-rebuilds",level:3},{value:"Image without regular rebuild",id:"image-without-regular-rebuild",level:3},{value:"Other properties",id:"other-properties",level:3},{value:"Image properties",id:"image-properties",level:4},{value:"Image tags",id:"image-tags",level:4},{value:"image status",id:"image-status",level:4},{value:"Image visibility",id:"image-visibility",level:4}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"image-manager",children:"Image Manager"})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.a,{href:"https://pypi.org/project/openstack-image-manager/",children:"OpenStack Image Manager"})," is\na tool for managing all machine images on an OpenStack environment."]}),"\n",(0,t.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsx)(n.p,{children:"This information is only relevant for the operator of an OpenStack environment. You\ncan skip this section if you want to use OpenStack Image Manager as a normal user\nand you are not an operator of an OpenStack environment."})}),"\n",(0,t.jsx)(n.p,{children:"The OpenStack Image Service (Glance) is required to upload and discover data assets\nthat are used by other services."}),"\n",(0,t.jsx)(n.p,{children:"Since this script stores many images in a single project, the Glance quota must be set\naccordingly high or to unlimited."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",metastring:'file="environments/kolla/files/overlays/glance/glance-api.conf"',children:"[DEFAULT]\nuser_storage_quota = 1TB\n"})}),"\n",(0,t.jsxs)(n.p,{children:["With most storage backends it makes sense to convert the imported images directly to RAW.\nSo it is required for using Ceph and it's features too. Recited from the Ceph documentation\n",(0,t.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rbd/qemu-rbd/",children:"QEMU and block devices"})," and\n",(0,t.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rbd/rbd-openstack/",children:"Block devices and OpenStack"}),"."]}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsx)(n.p,{children:"The raw data format is really the only sensible format option to use with RBD. Technically,\nyou could use other QEMU-supported formats (such as qcow2 or vmdk), but doing so would add\nadditional overhead, and would also render the volume unsafe for virtual machine live\nmigration when caching (see below) is enabled."}),(0,t.jsx)(n.p,{children:"Important Ceph doesn't support QCOW2 for hosting a virtual machine disk. Thus if you want\nto boot virtual machines in Ceph (ephemeral backend or boot from volume), the Glance image\nformat must be RAW."}),(0,t.jsxs)(n.p,{children:["See the ",(0,t.jsx)(n.a,{href:"https://docs.openstack.org/glance/latest/configuration/sample-configuration.html",children:"OpenStack Glance documentation"}),"\nfor more details."]})]}),"\n",(0,t.jsx)(n.p,{children:"This requires the following parameter for the image import workflow."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",metastring:'file="environments/kolla/files/overlays/glance/glance-api.conf"',children:"[taskflow_executor]\nconversion_format = raw\n\n[image_import_opts]\nimage_import_plugins = ['image_decompression', 'image_conversion']\n\n[image_conversion]\noutput_format = raw\n"})}),"\n",(0,t.jsx)(n.h2,{id:"getting-started",children:"Getting started"}),"\n",(0,t.jsxs)(n.p,{children:["This ",(0,t.jsx)(n.strong,{children:"Getting started"})," will upload a private image to your OpenStack environment with\nthe help of the OpenStack Image Manager."]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Install the ",(0,t.jsx)(n.a,{href:"https://pypi.org/project/openstack-image-manager/",children:"openstack-image-manager"}),"\npackage with ",(0,t.jsx)(n.a,{href:"https://pypi.org/project/pip/",children:"pip"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"pip3 install openstack-image-manager\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The installation can also be done via ",(0,t.jsx)(n.a,{href:"https://pypi.org/project/pipenv/",children:"pipenv"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["A ",(0,t.jsx)(n.code,{children:"Pipefile"})," file is created with this content. The ",(0,t.jsx)(n.a,{href:"https://pypi.org/project/openstack-image-manager/#history",children:"latest version of openstack-image-manager"}),"\nis used."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",children:'[[source]]\nurl = "https://pypi.org/simple"\nverify_ssl = true\nname = "pypi"\n\n[packages]\nopenstack-image-manager = "==0.20250413.0"\n\n[dev-packages]\n\n[requires]\npython_version = "3.10"\n'})}),"\n",(0,t.jsx)(n.p,{children:"The dependencies are then installed and the shell is prepared for use:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"pipenv install\npipenv shell\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Create a image definition in the file ",(0,t.jsx)(n.code,{children:"getting-started.yml"})," in the local directory ",(0,t.jsx)(n.code,{children:"images"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"---\nimages:\n  - name: MyCirros\n    enable: true\n    format: qcow2\n    login: cirros\n    password: gocubsgo\n    min_disk: 1\n    min_ram: 32\n    status: active\n    visibility: private\n    multi: false\n    meta:\n      architecture: x86_64\n      hw_disk_bus: scsi\n      hw_rng_model: virtio\n      hw_scsi_model: virtio-scsi\n      hw_watchdog_action: reset\n      hypervisor_type: qemu\n      os_distro: cirros\n      replace_frequency: never\n      uuid_validity: none\n      provided_until: none\n    tags: []\n    versions:\n      - version: '0.6.2'\n        url: https://github.com/cirros-dev/cirros/releases/download/0.6.2/cirros-0.6.2-x86_64-disk.img\n        checksum: \"sha256:07e44a73e54c94d988028515403c1ed762055e01b83a767edf3c2b387f78ce00\"\n        build_date: 2023-05-30\n      - version: '0.6.3'\n        url: https://github.com/cirros-dev/cirros/releases/download/0.6.3/cirros-0.6.3-x86_64-disk.img\n        checksum: \"sha256:7d6355852aeb6dbcd191bcda7cd74f1536cfe5cbf8a10495a7283a8396e4b75b\"\n        build_date: 2024-09-26\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Run the OpenStack Image Manager. It is assumed that a profile with the name ",(0,t.jsx)(n.code,{children:"openstack"})," exists in the\n",(0,t.jsx)(n.a,{href:"https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#configuration-files",children:"clouds.yaml"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'openstack-image-manager --cloud openstack --filter ".*Cirr.*" --images images/\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"image-definitions",children:"Image definitions"}),"\n",(0,t.jsxs)(n.p,{children:["The configuration consists of different parameter settings, such as values for\nminimum RAM or the visibility of the image. Have a look at the examples below\nfor all parameters. After a change to the configuration, validate it with\n",(0,t.jsx)(n.code,{children:"tox -- --dry-run"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"scs-image-standard",children:"SCS image standard"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The value of ",(0,t.jsx)(n.code,{children:"login"})," is stored as ",(0,t.jsx)(n.code,{children:"image_original_user"})," in the metadata of an image."]}),"\n",(0,t.jsxs)(n.li,{children:["If ",(0,t.jsx)(n.code,{children:"image_description"})," is not set as meta information, ",(0,t.jsx)(n.code,{children:"image_description"})," is set\nto the name of the image."]}),"\n",(0,t.jsxs)(n.li,{children:["The value of ",(0,t.jsx)(n.code,{children:"build_date"})," of a specific version of an image is stored as ",(0,t.jsx)(n.code,{children:"image_build_date"}),"\nin the metadata of an image."]}),"\n",(0,t.jsxs)(n.li,{children:["The value of ",(0,t.jsx)(n.code,{children:"url"})," of a specific version of an image is stored as ",(0,t.jsx)(n.code,{children:"image_source"}),"\nin the metadata of an image."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"image-with-regular-rebuilds",children:"Image with regular rebuilds"}),"\n",(0,t.jsx)(n.p,{children:"This type of image definition is used for images that are rebuilt at regular\nintervals. For example, this is the case for the daily builds of the Ubuntu\nimages."}),"\n",(0,t.jsxs)(n.p,{children:["The attribute ",(0,t.jsx)(n.code,{children:"multi: true"})," is set."]}),"\n",(0,t.jsxs)(n.p,{children:["With this type of image definition, the version of the distribution (or product,\nwhatever is contained in the image) used is already in the name of the image\ndefinition. The ",(0,t.jsx)(n.code,{children:"version"})," properties from the definition's ",(0,t.jsx)(n.code,{children:"versions"})," list\nare appended only to older iterations of the image as timestamp suffixes\nin parentheses upon each rotation (except for the latest entry)."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"images:\n  - name: Ubuntu 24.04\n    format: qcow2\n    login: ubuntu\n    min_disk: 8\n    min_ram: 512\n    status: active\n    visibility: public\n    multi: true\n    meta:\n      architecture: x86_64\n      hw_disk_bus: scsi\n      hw_scsi_model: virtio-scsi\n      hw_watchdog_action: reset\n      os_distro: ubuntu\n      os_version: '24.04'\n    tags: []\n    versions:\n      - version: '20240416'\n        url: https://cloud-images.ubuntu.com/noble/20240416/noble-server-cloudimg-amd64.img\n      - version: '20240422'\n        url: https://cloud-images.ubuntu.com/noble/20240422/noble-server-cloudimg-amd64.img\n"})}),"\n",(0,t.jsx)(n.p,{children:"This configuration creates the following images:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"Ubuntu 24.04 (20240416)"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"Ubuntu 24.04"})}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"If a newer build is added, the following rotation takes place:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Ubuntu 24.04 (20240416)"})," does not change"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Ubuntu 24.04"})," becomes ",(0,t.jsx)(n.strong,{children:"Ubuntu 24.04 (20240422)"})]}),"\n",(0,t.jsxs)(n.li,{children:["the new image becomes ",(0,t.jsx)(n.strong,{children:"Ubuntu 24.04"})]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["By default the last three images will be visible. When a fourth image is added, the visibility of\nthe last image in the list is changed to ",(0,t.jsx)(n.code,{children:"community"})," and the image can be deleted in the future."]}),"\n",(0,t.jsx)(n.h3,{id:"image-without-regular-rebuild",children:"Image without regular rebuild"}),"\n",(0,t.jsx)(n.p,{children:"This type of image definition is used for images that are not rebuilt. For example,\nthis is the case for the flatcar images. For each release of Flatcar there is exactly\none image which will not be rebuilt in the future."}),"\n",(0,t.jsxs)(n.p,{children:["The attribute ",(0,t.jsx)(n.code,{children:"multi: false"})," is set."]}),"\n",(0,t.jsxs)(n.p,{children:["With this type of image definition, the version of the distribution (or product,\nwhatever is contained in the image) used is not in the name of the image definition.\nInstead, the ",(0,t.jsx)(n.code,{children:"version"})," properties from the image definition's ",(0,t.jsx)(n.code,{children:"versions"})," list\nare appended as static version suffixes to the images' names."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"images:\n  - name: RancherOS\n    format: qcow2\n    login: rancher\n    min_disk: 8\n    min_ram: 2048\n    status: active\n    visibility: public\n    multi: false\n    meta:\n      architecture: x86_64\n      hw_disk_bus: scsi\n      hw_scsi_model: virtio-scsi\n      hw_watchdog_action: reset\n    tags: []\n    versions:\n      - version: '1.3.0'\n        url: https://github.com/rancher/os/releases/download/v1.3.0/rancheros-openstack.img\n      - version: '1.4.0'\n        url: https://github.com/rancher/os/releases/download/v1.4.0/rancheros-openstack.img\n      - version: '1.4.1'\n        url: https://github.com/rancher/os/releases/download/v1.4.1/rancheros-openstack.img\n"})}),"\n",(0,t.jsx)(n.p,{children:"This configuration creates the following images:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"RancherOS 1.3.0"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"RancherOS 1.4.0"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"RancherOS 1.4.1"})}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["If a new version is added, no rotation takes place. The new version is added\nas ",(0,t.jsx)(n.strong,{children:"RancherOS x.y.z"}),". Here also the visibility of older images is not changed."]}),"\n",(0,t.jsx)(n.h3,{id:"other-properties",children:"Other properties"}),"\n",(0,t.jsx)(n.h4,{id:"image-properties",children:"Image properties"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Removal of properties is not yet possible"}),"\n",(0,t.jsx)(n.li,{children:"URL, name and format can not be changed"}),"\n",(0,t.jsxs)(n.li,{children:["Any keys can be added to ",(0,t.jsx)(n.code,{children:"meta"}),", these will be added to the image"]}),"\n",(0,t.jsxs)(n.li,{children:["Existing keys in ",(0,t.jsx)(n.code,{children:"meta"})," can be changed, the same applies to ",(0,t.jsx)(n.code,{children:"min_disk"}),"\nand ",(0,t.jsx)(n.code,{children:"min_ram"})]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"image-tags",children:"Image tags"}),"\n",(0,t.jsx)(n.h4,{id:"image-status",children:"image status"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["deactivation: change ",(0,t.jsx)(n.code,{children:"status"})," to ",(0,t.jsx)(n.code,{children:"deactivated"})]}),"\n",(0,t.jsxs)(n.li,{children:["reactivation: change ",(0,t.jsx)(n.code,{children:"status"})," to ",(0,t.jsx)(n.code,{children:"active"})]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"image-visibility",children:"Image visibility"}),"\n",(0,t.jsxs)(n.p,{children:["A full documentation about the visibility of images can be found in the ",(0,t.jsx)(n.strong,{children:"Image visibility"})," section in the\n",(0,t.jsx)(n.a,{href:"https://docs.openstack.org/api-ref/image/v2/index.html#general-information",children:"OpenStack Image Service API Documentation"}),"."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["public: set ",(0,t.jsx)(n.code,{children:"visibility"})," to ",(0,t.jsx)(n.code,{children:"public"})]}),"\n",(0,t.jsxs)(n.li,{children:["community: set ",(0,t.jsx)(n.code,{children:"visibility"})," to ",(0,t.jsx)(n.code,{children:"community"})]}),"\n",(0,t.jsxs)(n.li,{children:["shared: set ",(0,t.jsx)(n.code,{children:"visibility"})," to ",(0,t.jsx)(n.code,{children:"shared"})]}),"\n",(0,t.jsxs)(n.li,{children:["private: set ",(0,t.jsx)(n.code,{children:"visibility"})," to ",(0,t.jsx)(n.code,{children:"private"})]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>o});var s=i(6540);const t={},a=s.createContext(t);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);