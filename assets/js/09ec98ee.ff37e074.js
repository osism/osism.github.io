"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1031],{1610:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>l,frontMatter:()=>s,metadata:()=>t,toc:()=>i});const t=JSON.parse('{"id":"guides/upgrade-guide/docker","title":"Docker","description":"The Docker version used is defined via the parameter docker_version in the file","source":"@site/docs/guides/upgrade-guide/docker.md","sourceDirName":"guides/upgrade-guide","slug":"/guides/upgrade-guide/docker","permalink":"/docs/guides/upgrade-guide/docker","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/docker.md","tags":[],"version":"current","sidebarPosition":20,"frontMatter":{"sidebar_label":"Docker","sidebar_position":20},"sidebar":"tutorialSidebar","previous":{"title":"Upgrade with Rook","permalink":"/docs/guides/upgrade-guide/ceph/rook"},"next":{"title":"Infrastructure","permalink":"/docs/guides/upgrade-guide/infrastructure"}}');var a=r(4848),o=r(8453);const s={sidebar_label:"Docker",sidebar_position:20},d="Docker",c={},i=[{value:"Restart behaviour",id:"restart-behaviour",level:2}];function u(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"docker",children:"Docker"})}),"\n",(0,a.jsxs)(n.p,{children:["The Docker version used is defined via the parameter ",(0,a.jsx)(n.code,{children:"docker_version"})," in the file\n",(0,a.jsx)(n.code,{children:"environments/configuration.yml"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"docker_version: '5:20.10.24'\n"})}),"\n",(0,a.jsxs)(n.p,{children:["All installable versions can be displayed with ",(0,a.jsx)(n.code,{children:"apt-cache madison docker-ce"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"$ apt-cache madison docker-ce\n docker-ce | 5:24.0.6-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:24.0.5-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:24.0.4-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:24.0.3-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:24.0.2-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:24.0.1-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:24.0.0-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:23.0.6-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:23.0.5-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:23.0.4-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:23.0.3-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:23.0.2-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:23.0.1-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:23.0.0-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.24~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.23~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.22~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.21~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.20~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.19~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.18~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.17~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.16~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.15~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.14~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n docker-ce | 5:20.10.13~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n"})}),"\n",(0,a.jsxs)(n.p,{children:["If, for example, you want to change the Docker version from ",(0,a.jsx)(n.code,{children:"20.10.24"})," to ",(0,a.jsx)(n.code,{children:"24.0.6"}),", ",(0,a.jsx)(n.code,{children:"docker_version"})," in\n",(0,a.jsx)(n.code,{children:"environments/configuration.yml"})," is changed accordingly. The ",(0,a.jsx)(n.code,{children:"5:"})," prefix is placed in front of the version. Commit and push the changes to your configuration repository afterwards."]}),"\n",(0,a.jsx)(n.p,{children:"The upgrade of Docker is then done with the OSISM CLI. Docker on the manager itself is updated differently.\nThis does not work on the manager itself because the Docker service may be started during the upgrade and\nindividual containers may be started as a result. This would interrupt the run of the role itself."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply docker -l 'docker:!manager'\n"})}),"\n",(0,a.jsxs)(n.p,{children:["By default, ",(0,a.jsx)(n.code,{children:"serial"})," is set to ",(0,a.jsx)(n.code,{children:"1"})," so that the the hosts are upgrade one after the other.\nTo adjust this, either use the ",(0,a.jsx)(n.code,{children:"osism_serial"})," dictionary in the ",(0,a.jsx)(n.code,{children:"environments/configuration.yml"})," file\nto change the value in ",(0,a.jsx)(n.code,{children:"docker"})," or append ",(0,a.jsx)(n.code,{children:"-e serial=10%"})," to upgrade, for example, 10%\nwith each iteration."]}),"\n",(0,a.jsx)(n.p,{children:"Please note that it is not a good idea to upgrade more than one Docker service at a time.\nThis can lead to anomalies, especially on storage nodes and control nodes. It is recommended\nnot to change the default of 1."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"osism_serial:\n  docker: 10%\n"})}),"\n",(0,a.jsxs)(n.p,{children:["On the manager itself, the ",(0,a.jsx)(n.code,{children:"run.sh"})," script in the manager environment of the configuration must\ncurrently be used to upgrade the Docker service. In a future release a dedicated ",(0,a.jsx)(n.code,{children:"osism update docker"}),"\ncommand will be available for this purpose."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"cd /opt/configuration/environments/manager\nANSIBLE_ASK_VAULT_PASS=True ./run.sh docker\n"})}),"\n",(0,a.jsx)(n.h2,{id:"restart-behaviour",children:"Restart behaviour"}),"\n",(0,a.jsxs)(n.p,{children:["When upgrading, the Docker service is restarted. As a result, it can come to a restart of the\nrunning containers. This can lead to interruptions in individual services. A change in\n",(0,a.jsx)(n.code,{children:"/etc/docker/daemon.json"})," due to a new configuration parameter etc. can also result in a\nrequired restart."]}),"\n",(0,a.jsxs)(n.p,{children:["Whether the containers are restarted when the Docker Service is restarted depends on whether the\n",(0,a.jsx)(n.a,{href:"https://docs.docker.com/config/containers/live-restore/",children:"Live Restore feature"})," is used.\nThis can be configured via the parameter ",(0,a.jsx)(n.code,{children:"docker_live_restore"}),". Live restore is enabled by default."]}),"\n",(0,a.jsxs)(n.p,{children:["It is important to set the ",(0,a.jsx)(n.code,{children:"docker_live_restore"})," parameter explicitly as a string. This means\n",(0,a.jsx)(n.code,{children:'docker_live_restore: "false"'})," or ",(0,a.jsx)(n.code,{children:'docker_live_restore: "true"'}),"."]}),"\n",(0,a.jsx)(n.p,{children:"But even if the Live Restore feature is enabled, certain upgrades will cause running containers\nto be restarted:"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsxs)(n.p,{children:["Live restore allows you to keep containers running across Docker daemon updates, but is only\nsupported when installing patch releases (",(0,a.jsx)(n.code,{children:"YY.MM.x"}),"), not for major (",(0,a.jsx)(n.code,{children:"YY.MM"}),") daemon upgrades."]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"There are two ways to prevent a restart of the Docker service during an upgrade."}),"\n",(0,a.jsx)(n.p,{children:"If the restart behaviour of the Docker service is changed, always make sure to restart the\nDocker service manually afterwards (e.g. by a system reboot)."}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["A host group can be defined via the parameter ",(0,a.jsx)(n.code,{children:"docker_ignore_restart_groupname"}),". The\nrestart of the Docker service is not triggered for all hosts in this group. By default,\n",(0,a.jsx)(n.code,{children:"docker_ignore_restart_groupname"})," is set to ",(0,a.jsx)(n.code,{children:"manager"}),". The parameter is best set in the\n",(0,a.jsx)(n.code,{children:"environments/configuration.yml"})," file when making an adjustment. For example, to prevent\nthe restart on all hosts, ",(0,a.jsx)(n.code,{children:"docker_ignore_restart_groupname"})," is set to ",(0,a.jsx)(n.code,{children:"generic"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"docker_ignore_restart_groupname: generic\n"})}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["With the parameter ",(0,a.jsx)(n.code,{children:"docker_allow_restart"}),", the restart of the Docker service can be\nprevented. By default, ",(0,a.jsx)(n.code,{children:"docker_allow_restart"})," is set to ",(0,a.jsx)(n.code,{children:"true"}),". It is recommended to set\nthis parameter only at runtime. Otherwise, the best place for the parameter is the\n",(0,a.jsx)(n.code,{children:"environments/configuration.yml"})," file."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply docker -e docker_allow_restart=false\n"})}),"\n"]}),"\n"]})]})}function l(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>d});var t=r(6540);const a={},o=t.createContext(a);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);