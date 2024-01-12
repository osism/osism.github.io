"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3619],{6860:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var s=t(5893),r=t(1151);const i={slug:"2024-01-11-kubernetes-service-deployment",title:"Kubernetes Service Deployments",authors:["berendt"],tags:["Sneak Peak","Kubernetes"]},o=void 0,a={permalink:"/blog/2024-01-11-kubernetes-service-deployment",source:"@site/blog/2024-01-11-kubernetes-service-deployments.md",title:"Kubernetes Service Deployments",description:"The deployment of services on the integrated Kubernetes cluster will be possible in",date:"2024-01-11T00:00:00.000Z",formattedDate:"January 11, 2024",tags:[{label:"Sneak Peak",permalink:"/blog/tags/sneak-peak"},{label:"Kubernetes",permalink:"/blog/tags/kubernetes"}],readingTime:.525,hasTruncateMarker:!1,authors:[{name:"Christian Berendt",title:"Founder of OSISM",url:"https://github.com/berendt",imageURL:"https://github.com/berendt.png",key:"berendt"}],frontMatter:{slug:"2024-01-11-kubernetes-service-deployment",title:"Kubernetes Service Deployments",authors:["berendt"],tags:["Sneak Peak","Kubernetes"]},unlisted:!1},c={authorsImageUrls:[void 0]},l=[];function u(e){const n={a:"a",code:"code",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["The deployment of services on the integrated Kubernetes cluster will be possible in\nfuture via the ",(0,s.jsx)(n.code,{children:"kubernetes"})," environment. A first simple example for the deployment\nof Nginx is already ",(0,s.jsx)(n.a,{href:"https://github.com/osism/testbed/tree/main/environments/kubernetes",children:"available in the osism/testbed repository"}),".\nThe new environment is used as usual with ",(0,s.jsx)(n.code,{children:"osism apply"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ osism apply -e kubernetes nginx\n\n$ kubectl get pods -n nginx\nNAME                    READY   STATUS    RESTARTS   AGE\nnginx-f7f5c78c5-crhnf   1/1     Running   0          2m28s\nnginx-f7f5c78c5-tjf6r   1/1     Running   0          2m28s\nnginx-f7f5c78c5-qbqjz   1/1     Running   0          2m28\n\n$ kubectl get services -n nginx\nNAME    TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE\nnginx   LoadBalancer   10.43.84.203   192.168.16.100   80:30612/TCP   2m46s\n\n$ curl -I http://192.168.16.100\nHTTP/1.1 200 OK\nServer: nginx/1.25.3\n"})})]})}function d(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var s=t(7294);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);