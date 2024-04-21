"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3736],{3257:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>a,toc:()=>u});var t=s(5893),i=s(1151);const n={sidebar_label:"Security groups"},o="How to configure and use security groups",a={id:"guides/user-guide/openstack/security-groups",title:"How to configure and use security groups",description:"Security groups in OpenStack are part of the network security mechanisms provided for the users.",source:"@site/docs/guides/user-guide/openstack/security-groups.md",sourceDirName:"guides/user-guide/openstack",slug:"/guides/user-guide/openstack/security-groups",permalink:"/de/docs/guides/user-guide/openstack/security-groups",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/user-guide/openstack/security-groups.md",tags:[],version:"current",frontMatter:{sidebar_label:"Security groups"},sidebar:"tutorialSidebar",previous:{title:"OpenStack",permalink:"/de/docs/guides/user-guide/openstack/"},next:{title:"Other Guides",permalink:"/de/docs/guides/other-guides/"}},c={},u=[{value:"Identify the requirements of your setup",id:"identify-the-requirements-of-your-setup",level:2},{value:"Further security considerations",id:"further-security-considerations",level:3},{value:"How to create security groups",id:"how-to-create-security-groups",level:2},{value:"Default security group",id:"default-security-group",level:3},{value:"Recommended security groups",id:"recommended-security-groups",level:3},{value:"How to use security groups",id:"how-to-use-security-groups",level:2}];function l(e){const r={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"how-to-configure-and-use-security-groups",children:"How to configure and use security groups"}),"\n",(0,t.jsx)(r.p,{children:"Security groups in OpenStack are part of the network security mechanisms provided for the users.\nThey resemble sets of simple firewall rules allowing specific network traffic at a Port of a VM that connects it to a network.\nThe rules allow specific network port numbers and protocols while also differentiating between ingress and egress directions.\nUsually security groups are assigned to the Port(s) when a virtual machine is created, but assignments can also be changed at runtime later on.\nMultiple security groups can be assigned to a VM or Port simultaneously and in such case they will be combined as the union of all their rules."}),"\n",(0,t.jsx)(r.admonition,{type:"caution",children:(0,t.jsxs)(r.p,{children:["Security groups are mutable resources.\nTheir rules can be adjusted at any time after creation.\n",(0,t.jsx)(r.strong,{children:"Changing the rules of a security group will immediately apply the changes to all Ports or VMs it is assigned to."}),"\nIt is advisable to always review resources which use a security group before making changes to it."]})}),"\n",(0,t.jsx)(r.h2,{id:"identify-the-requirements-of-your-setup",children:"Identify the requirements of your setup"}),"\n",(0,t.jsx)(r.p,{children:"Every virtual machine that is created may need different firewall rules.\nThese requirements can also change over time.\nAdding or removing security groups will allow users to adapt the firewall rules specifically to their virtual machines."}),"\n",(0,t.jsx)(r.p,{children:"To harden the firewall settings for your virtual machine you may follow these steps:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"Before creating a virtual machine its purpose is usually already known. Use this information to identify all incoming and outgoing traffic rules that will be needed based on the communication patterns of the services it is meant to deploy. This includes communication protocols, port numbers, communication directions and optionally target/source address ranges."}),"\n",(0,t.jsx)(r.li,{children:"Look through already existing security groups and their rules. If a security group allows more traffic than needed it SHOULD NOT be used. If a security group contains only a subset of the required rules it MAY be used in combination with other security groups that contain rules which fulfill the remaining required traffic rules from point 1."}),"\n",(0,t.jsx)(r.li,{children:"If you were not successful in finding an appropriate combination of existing security groups or you need additional specific rules to cover all requirements, you MAY create one or more new Security Groups in which you can add the required rules."}),"\n",(0,t.jsx)(r.li,{children:"After ensuring the existence of one or more security groups that fulfill your requirements, you can create the VM with those security groups already specified in the creation command."}),"\n"]}),"\n",(0,t.jsx)(r.h3,{id:"further-security-considerations",children:"Further security considerations"}),"\n",(0,t.jsx)(r.p,{children:"When implementing network security requirements, firewall rules alone are not always sufficient and might need to be augmented with additional configuration or time-based constraints. Notable examples are:"}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"SSH"}),"\nSSH is needed on many virtual machines to operate their guest operating system.\nIn a security group the port 22 can be opened for the TCP protocol to allow incoming SSH connections.\nBut that only should be done while also restricting the SSH configuration to public key authentication only (the recommended way) or having a strong username and password policy already applied to the operating system of the virtual machine.\nOtherwise default usernames and passwords which are often preconfigured in system images may be exploited through the exposed SSH port which enables attackers to compromise the virtual machine."]}),"\n",(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.strong,{children:"ICMP"}),"\nIt might be useful to be able to ping a virtual machine or use other ICMP requests.\nBut for some virtual machine configurations this is either not necessary at all or only temporarily needed.\nOne benefit of security groups among other things is the ability to be easily added to and removed from existing virtual machines.\nSo a dedicated security group allowing ICMP could be added temporarily to a virtual machine for debugging purposes and removed from it afterwards."]}),"\n",(0,t.jsx)(r.h2,{id:"how-to-create-security-groups",children:"How to create security groups"}),"\n",(0,t.jsx)(r.p,{children:"Security groups are managed within a project.\nSo every project will have a different set of security groups.\nThey can be added dynamically to each virtual machine, during their creation or afterwards.\nAdditionally, they may also be removed from VMs at any point."}),"\n",(0,t.jsx)(r.p,{children:"Every project has its own default security group, which rules can be edited.\nAdditionally other security groups can be added until the project's quota is exhausted.\nTo add a security group, use the following command:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group create $SECURITY_GROUP\n"})}),"\n",(0,t.jsx)(r.p,{children:"Within every security group rules can be added up unto a defined maximum of rules, that usually is about 100.\nRules can be added to security groups with the following command:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group rule create [...] $SECURITY_GROUP\n"})}),"\n",(0,t.jsx)(r.p,{children:"To delete rules from a security group, the rule id has to be used.\nIt is listed in the details of the rules section of the security group."}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group rule delete $RULE_ID\n"})}),"\n",(0,t.jsx)(r.h3,{id:"default-security-group",children:"Default security group"}),"\n",(0,t.jsx)(r.p,{children:"Unless specified otherwise, the default security group is assigned to all VMs or Ports at creation.\nTo use any other than the default security group at creation it is necessary to specify the desired security group(s) during the creation process."}),"\n",(0,t.jsx)(r.p,{children:"To review which rules are defined in a security group, the following command can be used:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group show default\n"})}),"\n",(0,t.jsx)(r.h3,{id:"recommended-security-groups",children:"Recommended security groups"}),"\n",(0,t.jsx)(r.p,{children:"While projects can use very different aspects in security group rules and thus the security groups will always differ between projects, there are some security groups that are widely used.\nThrough the nature of security groups being seen as a set of rules that can be combined, having some basic security groups that allow basic protocols is a commonly used setup.\nThis section will demonstrate how to create some security groups for commonly used protocols and ports."}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"A security groups, that allows incoming SSH traffic:"}),"\n"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group create ssh\nopenstack security group rule create --ingress --protocol tcp --dst-port 22 ssh\n"})}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"A security group, that allows incoming HTTP requests:"}),"\n"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group create http\nopenstack security group rule create --ingress --protocol tcp --dst-port 80 http\n"})}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"A security group, that allows incoming HTTPS requests:"}),"\n"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group create https\nopenstack security group rule create --ingress --protocol tcp --dst-port 443 https\n"})}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"A security group, that allows incoming ICMP requests:"}),"\n"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack security group create icmp\nopenstack security group rule create --protocol icmp icmp\n"})}),"\n",(0,t.jsx)(r.h2,{id:"how-to-use-security-groups",children:"How to use security groups"}),"\n",(0,t.jsx)(r.admonition,{type:"info",children:(0,t.jsx)(r.p,{children:"Security groups can be assigned to multiple resources simultaneously (such as VMs or Ports).\nThis means that security groups are reusable and don't need to be recreated for each applicable resource individually."})}),"\n",(0,t.jsxs)(r.p,{children:["Usually, initial security groups are added at the time of the creation of a VM.\nDuring creation, multiple security groups can also be added at the same time by repeating the ",(0,t.jsx)(r.code,{children:"--security-group"})," argument:"]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack server create [...] --security-group $SECURITY_GROUP_1 --security-group $SECURITY_GROUP_2 $SERVER_NAME\n"})}),"\n",(0,t.jsx)(r.p,{children:"To add a security group to an existing VM, the following command can be used:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack server add security group $SERVER_NAME $SECURITY_GROUP\n"})}),"\n",(0,t.jsx)(r.p,{children:"To remove a security group from a VM, the following command can be used:"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"openstack server remove security group $SERVER_NAME $SECURITY_GROUP\n"})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsxs)(r.em,{children:["The source of this document can be found in the ",(0,t.jsx)(r.a,{href:"https://raw.githubusercontent.com/SovereignCloudStack/docs/main/docs/02-iaas/security-groups.md",children:"SovereignCloudStack/docs"})," repository."]})})]})}function d(e={}){const{wrapper:r}={...(0,i.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1151:(e,r,s)=>{s.d(r,{Z:()=>a,a:()=>o});var t=s(7294);const i={},n=t.createContext(i);function o(e){const r=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(n.Provider,{value:r},e.children)}}}]);