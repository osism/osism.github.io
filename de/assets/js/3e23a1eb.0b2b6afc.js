"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[6018],{7438:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>s,default:()=>m,frontMatter:()=>d,metadata:()=>c,toc:()=>r});var i=t(5893),n=t(1151);const d={sidebar_label:"Automated updates",sidebar_position:1},s="Image Manager update.py",c={id:"guides/operations-guide/openstack/tools/image-manager/update",title:"Image Manager update.py",description:"Overview",source:"@site/docs/guides/operations-guide/openstack/tools/image-manager/update.md",sourceDirName:"guides/operations-guide/openstack/tools/image-manager",slug:"/guides/operations-guide/openstack/tools/image-manager/update",permalink:"/de/docs/guides/operations-guide/openstack/tools/image-manager/update",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/tools/image-manager/update.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_label:"Automated updates",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Image Manager",permalink:"/de/docs/guides/operations-guide/openstack/tools/image-manager/"},next:{title:"Flavor Manager",permalink:"/de/docs/guides/operations-guide/openstack/tools/flavor-manager"}},o={},r=[{value:"Overview",id:"overview",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2}];function u(e){const a={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h1,{id:"image-manager-updatepy",children:"Image Manager update.py"}),"\n",(0,i.jsx)(a.h2,{id:"overview",children:"Overview"}),"\n",(0,i.jsxs)(a.p,{children:["The OpenStack Image Manager ",(0,i.jsx)(a.code,{children:"update.py"})," Script updates the ",(0,i.jsx)(a.code,{children:"/etc/images/*.yaml"})," files to the always latest release of the Distributions, set S3 Mirror Urls and uploads the Images to the mirror."]}),"\n",(0,i.jsx)(a.p,{children:"These updated yaml files are later processed by the Image Manger itself."}),"\n",(0,i.jsx)(a.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsxs)(a.p,{children:["Prepare to use the ",(0,i.jsx)(a.code,{children:"update.py"})," script."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"git clone https://github.com/osism/openstack-image-manager/ \ncd openstack-image-manager\npipenv install\npipenv shell\n"})}),"\n",(0,i.jsx)(a.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"python contrib/update.py --help\n                                                                                                                                                          \n Usage: update.py [OPTIONS]                                                                                                                               \n                                                                                                                                                          \n\u256d\u2500 Options \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256e\n\u2502 --debug                           Enable debug logging                                                                                                 \u2502\n\u2502 --dry-run                         Do not perform any changes                                                                                           \u2502\n\u2502 --minio-access-key          TEXT  Minio access key [env var: MINIO_ACCESS_KEY] [default: None]                                                         \u2502\n\u2502 --minio-secret-key          TEXT  Minio secret key [env var: MINIO_SECRET_KEY] [default: None]                                                         \u2502\n\u2502 --minio-server              TEXT  Minio server [env var: MINIO_SERVER] [default: swift.services.a.regiocloud.tech]                                     \u2502\n\u2502 --minio-bucket              TEXT  Minio bucket [env var: MINIO_BUCKET] [default: openstack-images]                                                     \u2502\n\u2502 --swift-prefix              TEXT  Swift prefix [env var: SWIFT_PREFIX] [default: swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/]                      \u2502\n\u2502 --install-completion              Install completion for the current shell.                                                                            \u2502\n\u2502 --show-completion                 Show completion for the current shell, to copy it or customize the installation.                                     \u2502\n\u2502 --help                            Show this message and exit.                                                                                          \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256f\n"})}),"\n",(0,i.jsx)(a.admonition,{type:"note",children:(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"At this time the update.py expects all yamls Files at /etc/images/, which can't be configured at the moment."}),"\n",(0,i.jsx)(a.li,{children:"Mirroring can't be disabled at the moment."}),"\n"]})}),"\n",(0,i.jsxs)(a.p,{children:["Best is to run this Script by cron or a CI job, to update all Distribution Files periodically to the latest release and afterwards run ",(0,i.jsx)(a.a,{href:"../image-manager/",children:"Openstack Image Manager"}),".\nThe Distribution Image yaml files must exists before running the script, you can use the files from Github repo at ",(0,i.jsx)(a.code,{children:"etc/images/"})," as template for your first run."]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{children:"$ python contrib/update.py\n2024-04-24 09:29:44 | INFO     | main:300 - Processing file /etc/images/centos.yml\n2024-04-24 09:29:44 | INFO     | update_image:179 - Checking image CentOS Stream 9\n2024-04-24 09:29:44 | INFO     | update_image:182 - Latest download URL is https://cloud.centos.org/centos/9-stream/x86_64/images/CentOS-Stream-GenericCloud-9-HEREBE\\d+\\.\\dDRAGONS.x86_64.qcow2\n2024-04-24 09:29:44 | INFO     | update_image:185 - Getting checksums from https://cloud.centos.org/centos/9-stream/x86_64/images/CHECKSUM\n2024-04-24 09:29:44 | INFO     | get_latest_default:62 - Latest URL is now https://cloud.centos.org/centos/9-stream/x86_64/images/CentOS-Stream-GenericCloud-9-20240422.0.x86_64.qcow2\n2024-04-24 09:29:44 | INFO     | get_latest_default:63 - Latest filename is now CentOS-Stream-GenericCloud-9-20240422.0.x86_64.qcow2\n2024-04-24 09:29:44 | INFO     | update_image:192 - Checksum of current CentOS-Stream-GenericCloud-9-20240422.0.x86_64.qcow2 is sha256:47dd9ad7048afe96bc6cc0b3fd8922f290e99c29d251affcd22d0afecfe0e337\n2024-04-24 09:29:44 | INFO     | update_image:208 - Our checksum is sha256:47dd9ad7048afe96bc6cc0b3fd8922f290e99c29d251affcd22d0afecfe0e337\n2024-04-24 09:29:44 | INFO     | update_image:211 - Image CentOS Stream 9 is up-to-date, nothing to do\n2024-04-24 09:29:44 | INFO     | main:300 - Processing file /etc/images/debian.yml\n2024-04-24 09:29:44 | INFO     | update_image:179 - Checking image Debian 11\n2024-04-24 09:29:44 | INFO     | update_image:182 - Latest download URL is https://cdimage.debian.org/cdimage/cloud/bullseye/latest/debian-11-genericcloud-amd64.raw\n2024-04-24 09:29:44 | INFO     | update_image:185 - Getting checksums from https://cdimage.debian.org/cdimage/cloud/bullseye/latest/SHA512SUMS\n2024-04-24 09:29:45 | INFO     | update_image:192 - Checksum of current debian-11-genericcloud-amd64-20240211-1654.raw is sha512:bdccf01b778a602024918e27bb8cfd84be32104609651f457ac1db10ee5d2a490d0c60e21ce3c0a7704e7ca439281724d0d7e48d279c9fc3a5133a7283e321e4\n2024-04-24 09:29:45 | INFO     | update_image:208 - Our checksum is sha512:bdccf01b778a602024918e27bb8cfd84be32104609651f457ac1db10ee5d2a490d0c60e21ce3c0a7704e7ca439281724d0d7e48d279c9fc3a5133a7283e321e4\n2024-04-24 09:29:45 | INFO     | update_image:211 - Image Debian 11 is up-to-date, nothing to do\n2024-04-24 09:29:45 | INFO     | update_image:179 - Checking image Debian 12\n2024-04-24 09:29:45 | INFO     | update_image:182 - Latest download URL is https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-genericcloud-amd64-daily.raw\n2024-04-24 09:29:45 | INFO     | update_image:185 - Getting checksums from https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/SHA512SUMS\n2024-04-24 09:29:46 | INFO     | update_image:192 - Checksum of current debian-12-genericcloud-amd64-daily-20240424-1727.raw is sha512:f4850b3910adb80801649399d4f89be08974a05a198aba7093f6e72d38d82183bc5b36183fb8dd34cd48a3e226d46802d8a8d85e8b5714b67c52e7ea642f085e\n2024-04-24 09:29:46 | INFO     | update_image:208 - Our checksum is sha512:5401f8c6361bb2a82c2c24b4b4606d95e77229152a80e61f9c613bc88e25de9257057d0ed68b0256b745c4059162a54970fe4a8daf456b2eb67b4f5db5c97fcc\n2024-04-24 09:29:46 | INFO     | update_image:229 - New values are {'version': '20240424', 'build_date': datetime.date(2024, 4, 24), 'checksum': 'sha512:f4850b3910adb80801649399d4f89be08974a05a198aba7093f6e72d38d82183bc5b36183fb8dd34cd48a3e226d46802d8a8d85e8b5714b67c52e7ea642f085e', 'url': 'https://cdimage.debian.org/cdimage/cloud/bookworm/daily/20240424-1727/debian-12-genericcloud-amd64-daily-20240424-1727.raw'}\n2024-04-24 09:29:46 | INFO     | main:300 - Processing file /etc/images/rockylinux.yml\n2024-04-24 09:29:46 | INFO     | update_image:179 - Checking image Rocky 9\n2024-04-24 09:29:46 | INFO     | update_image:182 - Latest download URL is https://download.rockylinux.org/pub/rocky/9/images/x86_64/Rocky-9-GenericCloud.latest.x86_64.qcow2\n2024-04-24 09:29:46 | INFO     | update_image:185 - Getting checksums from https://download.rockylinux.org/pub/rocky/9/images/x86_64/Rocky-9-GenericCloud.latest.x86_64.qcow2.CHECKSUM\n2024-04-24 09:29:47 | INFO     | update_image:192 - Checksum of current Rocky-9-GenericCloud.latest.x86_64.qcow2 is sha256:7713278c37f29b0341b0a841ca3ec5c3724df86b4d97e7ee4a2a85def9b2e651\n2024-04-24 09:29:47 | INFO     | update_image:208 - Our checksum is sha256:7713278c37f29b0341b0a841ca3ec5c3724df86b4d97e7ee4a2a85def9b2e651\n2024-04-24 09:29:47 | INFO     | update_image:211 - Image Rocky_9 is up-to-date, nothing to do\n2024-04-24 09:29:47 | INFO     | main:300 - Processing file /etc/images/ubuntu.yml\n2024-04-24 09:29:47 | INFO     | update_image:179 - Checking image Ubuntu 22.04\n2024-04-24 09:29:47 | INFO     | update_image:182 - Latest download URL is https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img\n2024-04-24 09:29:47 | INFO     | update_image:185 - Getting checksums from https://cloud-images.ubuntu.com/jammy/current/SHA256SUMS\n2024-04-24 09:29:47 | INFO     | update_image:192 - Checksum of current jammy-server-cloudimg-amd64.img is sha256:62af6445fd2c31f68a069151938a7dcb49158644cae531dd22efc36c1c15a710\n2024-04-24 09:29:47 | INFO     | update_image:208 - Our checksum is sha256:62af6445fd2c31f68a069151938a7dcb49158644cae531dd22efc36c1c15a710\n2024-04-24 09:29:47 | INFO     | update_image:211 - Image Ubuntu_22.04 is up-to-date, nothing to do\n2024-04-24 09:29:47 | INFO     | update_image:179 - Checking image Ubuntu 22.04 Minimal\n2024-04-24 09:29:47 | INFO     | update_image:182 - Latest download URL is https://cloud-images.ubuntu.com/minimal/releases/jammy/release/ubuntu-22.04-minimal-cloudimg-amd64.img\n2024-04-24 09:29:47 | INFO     | update_image:185 - Getting checksums from https://cloud-images.ubuntu.com/minimal/releases/jammy/release/SHA256SUMS\n2024-04-24 09:29:48 | INFO     | update_image:192 - Checksum of current ubuntu-22.04-minimal-cloudimg-amd64.img is sha256:bd99c64ad9d926eb5769f9f2cfd96ae4989a029bd64bd3e7e7deb8cff4251c65\n2024-04-24 09:29:48 | INFO     | update_image:208 - Our checksum is sha256:bd99c64ad9d926eb5769f9f2cfd96ae4989a029bd64bd3e7e7deb8cff4251c65\n2024-04-24 09:29:48 | INFO     | update_image:211 - Image Ubuntu 22.04 Minimal is up-to-date, nothing to do\n2024-04-24 09:29:48 | INFO     | update_image:179 - Checking image Ubuntu 24.04\n2024-04-24 09:29:48 | INFO     | update_image:182 - Latest download URL is https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img\n2024-04-24 09:29:48 | INFO     | update_image:185 - Getting checksums from https://cloud-images.ubuntu.com/noble/current/SHA256SUMS\n2024-04-24 09:29:48 | INFO     | update_image:192 - Checksum of current noble-server-cloudimg-amd64.img is sha256:32a9d30d18803da72f5936cf2b7b9efcb4d0bb63c67933f17e3bdfd1751de3f3\n2024-04-24 09:29:48 | INFO     | update_image:208 - Our checksum is sha256:d7ba8d5d1d073f2dc8351973bf4f35157c846a0ea6ee16fb2a9f45a78953e4a7\n2024-04-24 09:29:48 | INFO     | update_image:229 - New values are {'version': '20240423', 'build_date': datetime.date(2024, 4, 23), 'checksum': 'sha256:32a9d30d18803da72f5936cf2b7b9efcb4d0bb63c67933f17e3bdfd1751de3f3', 'url': 'https://cloud-images.ubuntu.com/noble/20240423/noble-server-cloudimg-amd64.img'}\n"})}),"\n",(0,i.jsx)(a.p,{children:"These yaml files are now extended with additional fields and the update.py will take care of the versions, checksum, url and build date to the latest release in the yaml file on every run."}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"latest_checksum_url  - URL of the distros checksum file"}),"\n",(0,i.jsx)(a.li,{children:"latest_url           - URL of the distros latest image"}),"\n",(0,i.jsx)(a.li,{children:"mirror_url           - URL of the Image File at the local S3 Mirror"}),"\n"]}),"\n",(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:"language-yaml",metastring:'title="someexample.yaml"',children:"---\nimages:\n  - name: Debian 12\n    enable: true\n    shortname: debian-12\n    format: qcow2\n    login: debian\n    min_disk: 8\n    min_ram: 512\n    status: active\n    visibility: public\n    multi: true\n    meta:\n      architecture: x86_64\n      hw_disk_bus: scsi\n      hw_rng_model: virtio\n      hw_scsi_model: virtio-scsi\n      hw_watchdog_action: reset\n      hypervisor_type: qemu\n      os_distro: debian\n      os_version: '12'\n      replace_frequency: quarterly\n      uuid_validity: last-3\n      provided_until: none\n    tags: []\n    latest_checksum_url: https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/SHA512SUMS\n    latest_url:\n      https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-genericcloud-amd64-daily.qcow2\n    versions:\n      - build_date: 2024-04-11\n        checksum:\n          sha512:3d6f26616e2c8b705993ddef874232887cebe42f1e70fcc020827ac88e8990177d537d34538c71ae2afd3b8baca953fff71eaa7ef71e752e82532c93dcdca436\n        url:\n          https://cdimage.debian.org/cdimage/cloud/bookworm/daily/20240411-1714/debian-12-genericcloud-amd64-daily-20240411-1714.qcow2\n        mirror_url:\n          https://swift.services.a.regiocloud.tech/swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/openstack-images/debian-12/20240411-debian-12.qcow2\n        version: '20240411'\n\n"})})]})}function m(e={}){const{wrapper:a}={...(0,n.a)(),...e.components};return a?(0,i.jsx)(a,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},1151:(e,a,t)=>{t.d(a,{Z:()=>c,a:()=>s});var i=t(7294);const n={},d=i.createContext(n);function s(e){const a=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function c(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),i.createElement(d.Provider,{value:a},e.children)}}}]);