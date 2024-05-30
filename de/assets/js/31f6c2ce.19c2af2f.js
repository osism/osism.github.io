"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1296],{5341:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>l,frontMatter:()=>s,metadata:()=>d,toc:()=>a});var r=t(5893),i=t(1151);const s={sidebar_label:"Infrastructure"},o="Infrastructure",d={id:"guides/operations-guide/infrastructure",title:"Infrastructure",description:"Open Search",source:"@site/docs/guides/operations-guide/infrastructure.md",sourceDirName:"guides/operations-guide",slug:"/guides/operations-guide/infrastructure",permalink:"/de/docs/guides/operations-guide/infrastructure",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/infrastructure.md",tags:[],version:"current",frontMatter:{sidebar_label:"Infrastructure"},sidebar:"tutorialSidebar",previous:{title:"Ceph",permalink:"/de/docs/guides/operations-guide/ceph"},next:{title:"Network",permalink:"/de/docs/guides/operations-guide/network"}},c={},a=[{value:"Open Search",id:"open-search",level:2},{value:"Get all indices",id:"get-all-indices",level:3},{value:"Delete an index",id:"delete-an-index",level:3}];function u(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",pre:"pre",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"infrastructure",children:"Infrastructure"}),"\n",(0,r.jsx)(n.h2,{id:"open-search",children:"Open Search"}),"\n",(0,r.jsx)(n.h3,{id:"get-all-indices",children:"Get all indices"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"$ curl https://api-int.testbed.osism.xyz:9200/_cat/indices?v\nhealth status index                          uuid                   pri rep docs.count docs.deleted store.size pri.store.size\ngreen  open   flog-2024.04.17                1rCP3NpUQSS5wmulCn6Y5g   1   1    1657832            0        1gb        654.4mb\ngreen  open   .opensearch-observability      UnS2gFb-QhC8oIefL3C52Q   1   2          0            0       624b           208b\ngreen  open   .plugins-ml-config             hMdzW6ooRMGZ_0OGcdNSgA   1   1          1            0      7.8kb          3.9kb\ngreen  open   .opendistro-job-scheduler-lock fa_Io8bJQ8qfGII4DypxFg   1   1          1            3     51.1kb         35.1kb\ngreen  open   .kibana_1                      v-aJ6ioSQsOwHQn_NNbeOg   1   1          0            0       416b           208b\n"})}),"\n",(0,r.jsx)(n.h3,{id:"delete-an-index",children:"Delete an index"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'$ curl -X DELETE https://api-int.testbed.osism.xyz:9200/flog-2024.04.17\n{"acknowledged":true}\n'})})]})}function l(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>o});var r=t(7294);const i={},s=r.createContext(i);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);