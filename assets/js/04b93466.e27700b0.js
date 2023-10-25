"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2471],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>g});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=i.createContext({}),m=function(e){var t=i.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=m(e.components);return i.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=m(a),c=n,g=p["".concat(s,".").concat(c)]||p[c]||d[c]||r;return a?i.createElement(g,o(o({ref:t},u),{},{components:a})):i.createElement(g,o({ref:t},u))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,o=new Array(r);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:n,o[1]=l;for(var m=2;m<r;m++)o[m]=a[m];return i.createElement.apply(null,o)}return i.createElement.apply(null,a)}c.displayName="MDXCreateElement"},6056:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>m});var i=a(7462),n=(a(7294),a(3905));const r={sidebar_label:"Image Manager",sidebar_position:50},o="Image Manager",l={unversionedId:"guides/operations-guide/openstack/image-manager",id:"guides/operations-guide/openstack/image-manager",title:"Image Manager",description:"The OpenStack Image Manager is a tool for managing all images on an OpenStack environment",source:"@site/docs/guides/operations-guide/openstack/image-manager.md",sourceDirName:"guides/operations-guide/openstack",slug:"/guides/operations-guide/openstack/image-manager",permalink:"/docs/guides/operations-guide/openstack/image-manager",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/image-manager.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_label:"Image Manager",sidebar_position:50},sidebar:"tutorialSidebar",previous:{title:"Octavia",permalink:"/docs/guides/operations-guide/openstack/octavia"},next:{title:"Flavor Manager",permalink:"/docs/guides/operations-guide/openstack/flavor-manager"}},s={},m=[{value:"Requirements",id:"requirements",level:2},{value:"OpenStack Image Service (Glance)",id:"openstack-image-service-glance",level:3},{value:"Object storage backend",id:"object-storage-backend",level:3},{value:"Getting started",id:"getting-started",level:2},{value:"Image definitions",id:"image-definitions",level:2},{value:"SCS image standard",id:"scs-image-standard",level:3},{value:"Image with regular rebuilds",id:"image-with-regular-rebuilds",level:3},{value:"Image without regular rebuild",id:"image-without-regular-rebuild",level:3},{value:"Other properties",id:"other-properties",level:3},{value:"Image properties",id:"image-properties",level:4},{value:"Image tags",id:"image-tags",level:4},{value:"image status",id:"image-status",level:4},{value:"Image visibility",id:"image-visibility",level:4},{value:"Usage",id:"usage",level:2},{value:"Mirroring images",id:"mirroring-images",level:3},{value:"Updating images",id:"updating-images",level:3}],u={toc:m},p="wrapper";function d(e){let{components:t,...a}=e;return(0,n.kt)(p,(0,i.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"image-manager"},"Image Manager"),(0,n.kt)("p",null,"The OpenStack Image Manager is a tool for managing all images on an OpenStack environment"),(0,n.kt)("h2",{id:"requirements"},"Requirements"),(0,n.kt)("p",null,"This information is only relevant for the operator of an OpenStack environment. You can skip this section if\nyou want to use OpenStack Image Manager as a normal user and you are not an operator of an openStack environment."),(0,n.kt)("h3",{id:"openstack-image-service-glance"},"OpenStack Image Service (Glance)"),(0,n.kt)("p",null,"The OpenStack Image Service (Glance) is required to upload and discover data assets that are used by other\nservices."),(0,n.kt)("p",null,"Since this script stores many images in a single project, the Glance quota must be set accordingly high or to unlimited."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ini"},"[DEFAULT]\nuser_storage_quota = 1TB\n")),(0,n.kt)("p",null,"With most storage backends it makes sense to convert the imported images directly to RAW. So it is required for using Ceph and it\xb4s\nfeatures too. Recited from the Ceph documentation ",(0,n.kt)("a",{parentName:"p",href:"https://docs.ceph.com/en/latest/rbd/qemu-rbd/"},"https://docs.ceph.com/en/latest/rbd/qemu-rbd/")," and\n",(0,n.kt)("a",{parentName:"p",href:"https://docs.ceph.com/en/nautilus/rbd/rbd-openstack/"},"https://docs.ceph.com/en/nautilus/rbd/rbd-openstack/"),":"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},'"The raw data format is really the only sensible format option to use with RBD. Technically, you could use other QEMU-supported formats\n(such as qcow2 or vmdk), but doing so would add additional overhead, and would also render the volume unsafe for virtual machine live\nmigration when caching (see below) is enabled."'),(0,n.kt)("p",{parentName:"blockquote"},'"Important Ceph doesn\'t support QCOW2 for hosting a virtual machine disk. Thus if you want to boot virtual machines in Ceph (ephemeral\nbackend or boot from volume), the Glance image format must be RAW."')),(0,n.kt)("p",null,"This requires the following parameter for the image import workflow."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ini"},"[taskflow_executor]\nconversion_format = raw\n\n[image_import_opts]\nimage_import_plugins = ['image_decompression', 'image_conversion']\n\n[image_conversion]\noutput_format = raw\n")),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"See ",(0,n.kt)("a",{parentName:"p",href:"https://docs.openstack.org/glance/latest/configuration/sample-configuration.html"},"OpenStack Glance documentation"),"\nfor more details.")),(0,n.kt)("h3",{id:"object-storage-backend"},"Object storage backend"),(0,n.kt)("p",null,"If the mirror functionality is used, an object storage backend is required. The use of the mirror functionality\nis optional and is not used by default."),(0,n.kt)("h2",{id:"getting-started"},"Getting started"),(0,n.kt)("p",null,"This ",(0,n.kt)("strong",{parentName:"p"},"Getting started")," will upload a private image to your OpenStack environment with\nthe help of the OpenStack Image Manager."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Install the ",(0,n.kt)("inlineCode",{parentName:"p"},"openstack-image-manager")," package with ",(0,n.kt)("inlineCode",{parentName:"p"},"pip"),"."),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"pip3 install openstack-image-manager\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Create a image definition in the file ",(0,n.kt)("inlineCode",{parentName:"p"},"getting-started.yml")," in the local directory ",(0,n.kt)("inlineCode",{parentName:"p"},"images"),"."),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"---\nimages:\n  - name: MyCirros\n    format: qcow2\n    login: cirros\n    password: gocubsgo\n    min_disk: 1\n    min_ram: 32\n    status: active\n    visibility: private\n    multi: false\n    meta:\n architecture: x86_64\n hw_disk_bus: scsi\n hw_rng_model: virtio\n hw_scsi_model: virtio-scsi\n hw_watchdog_action: reset\n os_distro: cirros\n replace_frequency: never\n uuid_validity: none\n provided_until: none\n    tags: []\n    versions:\n - version: '0.6.0'\n   url: https://github.com/cirros-dev/cirros/releases/download/0.6.0/cirros-0.6.0-x86_64-disk.img\n   checksum: \"sha256:94e1e2c94dbbae7d4bdc38e68590a1daf73c9de2d03dd693857b4b0a042548e8\"\n   build_date: 2022-09-28\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Run the OpenStack Image Manager. It is assumed that a profile with the name ",(0,n.kt)("inlineCode",{parentName:"p"},"openstack")," exists in the\n",(0,n.kt)("a",{parentName:"p",href:"https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#configuration-files"},"clouds.yaml"),"."),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'openstack-image-manager --cloud openstack --filter ".*Cirr.*" --images images/\n')))),(0,n.kt)("h2",{id:"image-definitions"},"Image definitions"),(0,n.kt)("p",null,"The configuration consists of different parameter settings, such as values for\nminimum RAM or the visibility of the image. Have a look at the examples below\nfor all parameters. After a change to the configuration, validate it with\n",(0,n.kt)("inlineCode",{parentName:"p"},"tox -- --dry-run"),"."),(0,n.kt)("h3",{id:"scs-image-standard"},"SCS image standard"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"The value of ",(0,n.kt)("inlineCode",{parentName:"li"},"login")," is stored as ",(0,n.kt)("inlineCode",{parentName:"li"},"image_original_user")," in the metadata of an image."),(0,n.kt)("li",{parentName:"ul"},"If ",(0,n.kt)("inlineCode",{parentName:"li"},"image_description")," is not set as meta information, ",(0,n.kt)("inlineCode",{parentName:"li"},"image_description")," is set to the name of the image."),(0,n.kt)("li",{parentName:"ul"},"The value of ",(0,n.kt)("inlineCode",{parentName:"li"},"build_date")," of a specific version of an image is stored as ",(0,n.kt)("inlineCode",{parentName:"li"},"image_build_date")," in the metadata of an image."),(0,n.kt)("li",{parentName:"ul"},"The value of ",(0,n.kt)("inlineCode",{parentName:"li"},"url")," of a specific version of an image is stored as ",(0,n.kt)("inlineCode",{parentName:"li"},"image_source")," in the metadata of an image.")),(0,n.kt)("h3",{id:"image-with-regular-rebuilds"},"Image with regular rebuilds"),(0,n.kt)("p",null,"This type of image definition is used for images that are rebuilt at regular\nintervals. For example, this is the case for the daily builds of the Ubuntu\nimages."),(0,n.kt)("p",null,"The attribute ",(0,n.kt)("inlineCode",{parentName:"p"},"multi: true")," is set."),(0,n.kt)("p",null,"With this type of image definition, the version of the distribution (or product,\nwhatever is contained in the image) used is already in the name of the image\ndefinition. The ",(0,n.kt)("inlineCode",{parentName:"p"},"version")," properties from the definition's ",(0,n.kt)("inlineCode",{parentName:"p"},"versions")," list\nare appended only to older iterations of the image as timestamp suffixes\nin parentheses upon each rotation (except for the latest entry)."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"images:\n  - name: Ubuntu 16.04\n    format: qcow2\n    login: ubuntu\n    min_disk: 8\n    min_ram: 512\n    status: active\n    visibility: public\n    multi: true\n    meta:\n      architecture: x86_64\n      hw_disk_bus: scsi\n      hw_scsi_model: virtio-scsi\n      hw_watchdog_action: reset\n      os_distro: ubuntu\n      os_version: '16.04'\n    tags: []\n    versions:\n      - version: '20180928'\n        url: https://cloud-images.ubuntu.com/xenial/20180928/xenial-server-cloudimg-amd64-disk1.img\n      - version: '20181004'\n        url: https://cloud-images.ubuntu.com/xenial/20181004/xenial-server-cloudimg-amd64-disk1.img\n")),(0,n.kt)("p",null,"This configuration creates the following images:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Ubuntu 16.04 (20180928)")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Ubuntu 16.04"))),(0,n.kt)("p",null,"If a newer build is added, the following rotation takes place:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Ubuntu 16.04 (20180928)")," does not change"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Ubuntu 16.04")," becomes ",(0,n.kt)("strong",{parentName:"li"},"Ubuntu 16.04 (20181004)")),(0,n.kt)("li",{parentName:"ul"},"the new image becomes ",(0,n.kt)("strong",{parentName:"li"},"Ubuntu 16.04"))),(0,n.kt)("p",null,"By default the last three images will be visible. When a fourth image is added, the visibility of\nthe last image in the list is changed to ",(0,n.kt)("inlineCode",{parentName:"p"},"community")," and the image can be deleted in the future."),(0,n.kt)("h3",{id:"image-without-regular-rebuild"},"Image without regular rebuild"),(0,n.kt)("p",null,"This type of image definition is used for images that are not rebuilt. For example,\nthis is the case for the flatcar images. For each release of Flatcar there is exactly\none image which will not be rebuilt in the future."),(0,n.kt)("p",null,"The attribute ",(0,n.kt)("inlineCode",{parentName:"p"},"multi: false")," is set."),(0,n.kt)("p",null,"With this type of image definition, the version of the distribution (or product,\nwhatever is contained in the image) used is not in the name of the image definition.\nInstead, the ",(0,n.kt)("inlineCode",{parentName:"p"},"version")," properties from the image definition's ",(0,n.kt)("inlineCode",{parentName:"p"},"versions")," list\nare appended as static version suffixes to the images' names."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},"images:\n  - name: RancherOS\n    format: qcow2\n    login: rancher\n    min_disk: 8\n    min_ram: 2048\n    status: active\n    visibility: public\n    multi: false\n    meta:\n      architecture: x86_64\n      hw_disk_bus: scsi\n      hw_scsi_model: virtio-scsi\n      hw_watchdog_action: reset\n    tags: []\n    versions:\n      - version: '1.3.0'\n        url: https://github.com/rancher/os/releases/download/v1.3.0/rancheros-openstack.img\n      - version: '1.4.0'\n        url: https://github.com/rancher/os/releases/download/v1.4.0/rancheros-openstack.img\n      - version: '1.4.1'\n        url: https://github.com/rancher/os/releases/download/v1.4.1/rancheros-openstack.img\n")),(0,n.kt)("p",null,"This configuration creates the following images:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"RancherOS 1.3.0")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"RancherOS 1.4.0")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"RancherOS 1.4.1"))),(0,n.kt)("p",null,"If a new version is added, no rotation takes place. The new version is added\nas ",(0,n.kt)("strong",{parentName:"p"},"RancherOS x.y.z"),". Here also the visibility of older images is not changed."),(0,n.kt)("h3",{id:"other-properties"},"Other properties"),(0,n.kt)("h4",{id:"image-properties"},"Image properties"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Removal of properties is not yet possible"),(0,n.kt)("li",{parentName:"ul"},"URL, name and format can not be changed"),(0,n.kt)("li",{parentName:"ul"},"Any keys can be added to ",(0,n.kt)("inlineCode",{parentName:"li"},"meta"),", these will be added to the image"),(0,n.kt)("li",{parentName:"ul"},"Existing keys in ",(0,n.kt)("inlineCode",{parentName:"li"},"meta")," can be changed, the same applies to ",(0,n.kt)("inlineCode",{parentName:"li"},"min_disk"),"\nand ",(0,n.kt)("inlineCode",{parentName:"li"},"min_ram"))),(0,n.kt)("h4",{id:"image-tags"},"Image tags"),(0,n.kt)("h4",{id:"image-status"},"image status"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"deactivation: change ",(0,n.kt)("inlineCode",{parentName:"li"},"status")," to ",(0,n.kt)("inlineCode",{parentName:"li"},"deactivated")),(0,n.kt)("li",{parentName:"ul"},"reactivation: change ",(0,n.kt)("inlineCode",{parentName:"li"},"status")," to ",(0,n.kt)("inlineCode",{parentName:"li"},"active")," ")),(0,n.kt)("h4",{id:"image-visibility"},"Image visibility"),(0,n.kt)("p",null,"A full documentation about the visibility of images can be found in the ",(0,n.kt)("strong",{parentName:"p"},"Image visibility")," section in the\n",(0,n.kt)("a",{parentName:"p",href:"https://docs.openstack.org/api-ref/image/v2/index.html#general-information"},"OpenStack Image Service API Documentation"),"."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"public: set ",(0,n.kt)("inlineCode",{parentName:"li"},"visibility")," to ",(0,n.kt)("inlineCode",{parentName:"li"},"public")),(0,n.kt)("li",{parentName:"ul"},"community: set ",(0,n.kt)("inlineCode",{parentName:"li"},"visibility")," to ",(0,n.kt)("inlineCode",{parentName:"li"},"community")),(0,n.kt)("li",{parentName:"ul"},"shared: set ",(0,n.kt)("inlineCode",{parentName:"li"},"visibility")," to ",(0,n.kt)("inlineCode",{parentName:"li"},"shared")),(0,n.kt)("li",{parentName:"ul"},"private: set ",(0,n.kt)("inlineCode",{parentName:"li"},"visibility")," to ",(0,n.kt)("inlineCode",{parentName:"li"},"private"))),(0,n.kt)("h2",{id:"usage"},"Usage"),(0,n.kt)("h3",{id:"mirroring-images"},"Mirroring images"),(0,n.kt)("p",null,"Since the upstreams often only keep their images for a short time, we mirror most of the images on REGIO.cloud.\nThis makes us independent of the availability of the images in the individual upstreams."),(0,n.kt)("h3",{id:"updating-images"},"Updating images"),(0,n.kt)("p",null,"Some of the images are automatically updated by a CI job. The latest available build at the time of the CI job execution is mirrored and\nmade available as the current version."),(0,n.kt)("p",null,"Currently, the following images are updated once a week (every Sunday at 0 am):"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Almalinux"),(0,n.kt)("li",{parentName:"ul"},"CentOS"),(0,n.kt)("li",{parentName:"ul"},"Debian"),(0,n.kt)("li",{parentName:"ul"},"Rockylinux"),(0,n.kt)("li",{parentName:"ul"},"Ubuntu")))}d.isMDXComponent=!0}}]);