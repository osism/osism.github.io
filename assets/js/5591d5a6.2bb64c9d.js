"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7398],{3905:(e,n,i)=>{i.d(n,{Zo:()=>l,kt:()=>c});var r=i(7294);function a(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function o(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,r)}return i}function t(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?o(Object(i),!0).forEach((function(n){a(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function d(e,n){if(null==e)return{};var i,r,a=function(e,n){if(null==e)return{};var i,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)i=o[r],n.indexOf(i)>=0||(a[i]=e[i]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)i=o[r],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var s=r.createContext({}),m=function(e){var n=r.useContext(s),i=n;return e&&(i="function"==typeof e?e(n):t(t({},n),e)),i},l=function(e){var n=m(e.components);return r.createElement(s.Provider,{value:n},e.children)},u="mdxType",_={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var i=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=d(e,["components","mdxType","originalType","parentName"]),u=m(i),g=a,c=u["".concat(s,".").concat(g)]||u[g]||_[g]||o;return i?r.createElement(c,t(t({ref:n},l),{},{components:i})):r.createElement(c,t({ref:n},l))}));function c(e,n){var i=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=i.length,t=new Array(o);t[0]=g;var d={};for(var s in n)hasOwnProperty.call(n,s)&&(d[s]=n[s]);d.originalType=e,d[u]="string"==typeof e?e:a,t[1]=d;for(var m=2;m<o;m++)t[m]=i[m];return r.createElement.apply(null,t)}return r.createElement.apply(null,i)}g.displayName="MDXCreateElement"},8010:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>s,contentTitle:()=>t,default:()=>_,frontMatter:()=>o,metadata:()=>d,toc:()=>m});var r=i(7462),a=(i(7294),i(3905));const o={sidebar_label:"Keystone"},t="Keystone",d={unversionedId:"guides/configuration-guides/openstack/keystone",id:"guides/configuration-guides/openstack/keystone",title:"Keystone",description:"Domain manager role",source:"@site/docs/guides/configuration-guides/openstack/keystone.md",sourceDirName:"guides/configuration-guides/openstack",slug:"/guides/configuration-guides/openstack/keystone",permalink:"/docs/guides/configuration-guides/openstack/keystone",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guides/openstack/keystone.md",tags:[],version:"current",frontMatter:{sidebar_label:"Keystone"},sidebar:"tutorialSidebar",previous:{title:"Horizon",permalink:"/docs/guides/configuration-guides/openstack/horizon"},next:{title:"Self-signed certificates",permalink:"/docs/guides/configuration-guides/self-signed-certificates"}},s={},m=[{value:"Domain manager role",id:"domain-manager-role",level:2},{value:"OIDC Federation",id:"oidc-federation",level:2}],l={toc:m},u="wrapper";function _(e){let{components:n,...i}=e;return(0,a.kt)(u,(0,r.Z)({},l,i,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"keystone"},"Keystone"),(0,a.kt)("h2",{id:"domain-manager-role"},"Domain manager role"),(0,a.kt)("p",null,"To configure and use the domain manager role from the SCS project, the\n",(0,a.kt)("inlineCode",{parentName:"p"},"environments/kolla/files/overlays/keystone/policy.yaml")," file is created\nin the configuration repository. The deployment and upgrade of the Keystone\nservice itself is then done as usual."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="environments/kolla/files/overlays/keystone/policy.yaml"',title:'"environments/kolla/files/overlays/keystone/policy.yaml"'},'# classify domain managers with a special role\n"is_domain_manager": "role:domain-manager"\n\n# specify a rule that whitelists roles which domain admins are permitted\n# to assign and revoke within their domain\n"is_domain_managed_role": "\'member\':%(target.role.name)s"\n\n# allow domain admins to retrieve their own domain\n"identity:get_domain": "(rule:is_domain_manager and token.domain.id:%(target.domain.id)s) or rule:admin_required"\n\n# list_domains is needed for GET /v3/domains?name=... requests\n# this is mandatory for things like\n# `create user --domain $DOMAIN_NAME $USER_NAME` to correctly discover\n# domains by name\n"identity:list_domains": "rule:is_domain_manager or rule:admin_required"\n\n# list_roles is needed for GET /v3/roles?name=... requests\n# this is mandatory for things like `role add ... $ROLE_NAME`` to correctly\n# discover roles by name\n"identity:list_roles": "rule:is_domain_manager or rule:admin_required"\n\n# get_role is needed for GET /v3/roles/{role_id} requests\n# this is mandatory for the OpenStack SDK to properly process role assignments\n# which are issued by role id instead of name\n"identity:get_role": "(rule:is_domain_manager and rule:is_domain_managed_role) or rule:admin_required"\n\n# allow domain admins to manage users within their domain\n"identity:list_users": "(rule:is_domain_manager and token.domain.id:%(target.domain_id)s) or rule:admin_required"\n"identity:get_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n"identity:create_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n"identity:update_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n"identity:delete_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n\n# allow domain admins to manage projects within their domain\n"identity:list_projects": "(rule:is_domain_manager and token.domain.id:%(target.domain_id)s) or rule:admin_required"\n"identity:get_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:admin_required"\n"identity:create_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:admin_required"\n"identity:update_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:admin_required"\n"identity:delete_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:admin_required"\n"identity:list_user_projects": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n\n# allow domain managers to manage role assignments within their domain\n# (restricted to specific roles by the \'is_domain_managed_role\' rule)\n#\n# project-level role assignment to user within domain\n"is_domain_user_project_grant": "token.domain.id:%(target.user.domain_id)s and token.domain.id:%(target.project.domain_id)s and rule:is_domain_managed_role"\n# project-level role assignment to group within domain\n"is_domain_group_project_grant": "token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.project.domain_id)s and rule:is_domain_managed_role"\n# domain-level role assignment to group\n"is_domain_level_group_grant": "token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.domain.id)s and rule:is_domain_managed_role"\n# domain-level role assignment to user\n"is_domain_level_user_grant": "token.domain.id:%(target.user.domain_id)s and token.domain.id:%(target.domain.id)s and rule:is_domain_managed_role"\n"domain_manager_grant": "rule:is_domain_manager and (rule:is_domain_user_project_grant or rule:is_domain_group_project_grant or rule:is_domain_level_group_grant or rule:is_domain_level_user_grant)"\n"identity:check_grant": "rule:domain_manager_grant or rule:admin_required"\n"identity:list_grants": "rule:domain_manager_grant or rule:admin_required"\n"identity:create_grant": "rule:domain_manager_grant or rule:admin_required"\n"identity:revoke_grant": "rule:domain_manager_grant or rule:admin_required"\n"identity:list_role_assignments": "(rule:is_domain_manager and token.domain.id:%(target.domain_id)s) or rule:admin_required"\n\n# allow domain managers to manage groups within their domain\n"identity:list_groups": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:admin_required"\n"identity:get_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:admin_required"\n"identity:create_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:admin_required"\n"identity:update_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:admin_required"\n"identity:delete_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:admin_required"\n"identity:list_groups_for_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n"identity:list_users_in_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:admin_required"\n"identity:remove_user_from_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n"identity:check_user_in_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n"identity:add_user_to_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.user.domain_id)s) or rule:admin_required"\n')),(0,a.kt)("p",null,"The role ",(0,a.kt)("inlineCode",{parentName:"p"},"domain-manager")," is created using the OpenStack CLI. Alternatively, the role can\nbe added using Ansible or other tools."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'$ openstack --os-cloud admin \\\n    role create \\\n    --or-show \\\n    --description "Domain Manager Role" \\\n    domain-manager\n+-------------+----------------------------------+\n| Field       | Value                            |\n+-------------+----------------------------------+\n| description | Domain Manager Role              |\n| domain_id   | None                             |\n| id          | 9b7140bfe628468ab9b86b365f9ac4c2 |\n| name        | domain-manager                   |\n| options     | {}                               |\n+-------------+----------------------------------+\n')),(0,a.kt)("p",null,"A user can then be made a domain manager for a particular domain by assigning this role."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ openstack --os-cloud admin \\\n    role add \\\n    --user test \\\n    --domain test \\\n    domain-manager\n")),(0,a.kt)("h2",{id:"oidc-federation"},"OIDC Federation"))}_.isMDXComponent=!0}}]);