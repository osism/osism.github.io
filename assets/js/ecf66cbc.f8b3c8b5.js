"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5079],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=i.createContext({}),d=function(e){var t=i.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=d(e.components);return i.createElement(o.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=a,f=u["".concat(o,".").concat(m)]||u[m]||p[m]||r;return n?i.createElement(f,s(s({ref:t},c),{},{components:n})):i.createElement(f,s({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,s=new Array(r);s[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[u]="string"==typeof e?e:a,s[1]=l;for(var d=2;d<r;d++)s[d]=n[d];return i.createElement.apply(null,s)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},73:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var i=n(7462),a=(n(7294),n(3905));const r={sidebar_label:"Style Guide",sidebar_position:100},s="Style Guide",l={unversionedId:"advanced-guides/style-guide",id:"advanced-guides/style-guide",title:"Style Guide",description:"Ansible",source:"@site/docs/advanced-guides/style-guide.md",sourceDirName:"advanced-guides",slug:"/advanced-guides/style-guide",permalink:"/docs/advanced-guides/style-guide",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/advanced-guides/style-guide.md",tags:[],version:"current",sidebarPosition:100,frontMatter:{sidebar_label:"Style Guide",sidebar_position:100},sidebar:"tutorialSidebar",previous:{title:"Developer Guide",permalink:"/docs/advanced-guides/developer-guide"},next:{title:"References",permalink:"/docs/references/"}},o={},d=[{value:"Ansible",id:"ansible",level:2},{value:"Task names",id:"task-names",level:3},{value:"<code>become</code> directive",id:"become-directive",level:3},{value:"<code>when</code> directive",id:"when-directive",level:3},{value:"Lists as defaults",id:"lists-as-defaults",level:3},{value:"Containerfiles",id:"containerfiles",level:2},{value:"Commit messages",id:"commit-messages",level:2}],c={toc:d},u="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"style-guide"},"Style Guide"),(0,a.kt)("h2",{id:"ansible"},"Ansible"),(0,a.kt)("p",null,"We implement all the default rules of Ansible Lint. A listing of all these rules can be found in the\nAnsible Lint documentation: ",(0,a.kt)("a",{parentName:"p",href:"https://ansible-lint.readthedocs.io/en/latest/default_rules/"},"https://ansible-lint.readthedocs.io/en/latest/default_rules/")),(0,a.kt)("h3",{id:"task-names"},"Task names"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Tasks must always have names. The only exception allowed is for forked playbooks."),(0,a.kt)("li",{parentName:"ul"},"A name never starts with a small letter"),(0,a.kt)("li",{parentName:"ul"},"Names are written in present tense"),(0,a.kt)("li",{parentName:"ul"},"No punctuation is used in names")),(0,a.kt)("h3",{id:"become-directive"},(0,a.kt)("inlineCode",{parentName:"h3"},"become")," directive"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"become")," directive is only set when needed and is always set explicitly for each task that needs it."),(0,a.kt)("p",null,"Blocks, roles, or playbooks are never executed in a privileged mode."),(0,a.kt)("p",null,"We always insert the ",(0,a.kt)("inlineCode",{parentName:"p"},"become")," directive between the name of a task and the task itself. This also applies\nto related directives like ",(0,a.kt)("inlineCode",{parentName:"p"},"become_user"),"  or ",(0,a.kt)("inlineCode",{parentName:"p"},"become_flags"),". This is for better visibility if a task is\nprivileged or not."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'- name: Copy hddtemp configuration file\n  become: true\n  ansible.builtin.copy:\n    src: "{{ ansible_os_family }}/hddtemp"\n    dest: "{{ hddtemp_conf_file }}"\n    owner: root\n    group: root\n    mode: 0644\n  notify: Restart hddtemp service\n')),(0,a.kt)("h3",{id:"when-directive"},(0,a.kt)("inlineCode",{parentName:"h3"},"when")," directive"),(0,a.kt)("p",null,"If you need to use the ",(0,a.kt)("inlineCode",{parentName:"p"},"when")," directive add this at the end-section from the task where it is needed. This\nmakes the code easier to understand for others."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'- name: "Archive existing {{ resolvconf_file }} file"\n  become: true\n  ansible.posix.synchronize:\n    src: "/etc/resolv.conf"\n    dest: "/etc/resolv.conf.{{ ansible_date_time.date }}"\n    archive: true\n  delegate_to: "{{ inventory_hostname }}"\n  when: stat_resolvconf_file.stat.islnk is defined and not stat_resolvconf_file.stat.islnk\n')),(0,a.kt)("h3",{id:"lists-as-defaults"},"Lists as defaults"),(0,a.kt)("p",null,"Defaults that provide a list are always defined as in the following example."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker_hosts_defaults")," sets the defaults in the role. Overriding is only possible with the ",(0,a.kt)("inlineCode",{parentName:"p"},"defaults")," repository."),(0,a.kt)("p",null,"In the configuration repository, ",(0,a.kt)("inlineCode",{parentName:"p"},"docker_hosts_extra")," is then used to add additional items to the list."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker_hosts")," itself is never modified from the outside."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'docker_hosts_defaults:\n  - "unix:///var/run/docker.sock"\ndocker_hosts_extra: []\ndocker_hosts: "{{ docker_hosts_defaults + docker_hosts_extra }}"\n')),(0,a.kt)("h2",{id:"containerfiles"},"Containerfiles"),(0,a.kt)("h2",{id:"commit-messages"},"Commit messages"))}p.isMDXComponent=!0}}]);