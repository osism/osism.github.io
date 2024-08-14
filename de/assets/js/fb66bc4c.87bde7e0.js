"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5961],{6504:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var s=t(5893),n=t(1151);const l={sidebar_label:"Style Guide"},o="Style Guide",r={id:"guides/other-guides/style-guide",title:"Style Guide",description:"Ansible",source:"@site/docs/guides/other-guides/style-guide.md",sourceDirName:"guides/other-guides",slug:"/guides/other-guides/style-guide",permalink:"/de/docs/guides/other-guides/style-guide",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/other-guides/style-guide.md",tags:[],version:"current",frontMatter:{sidebar_label:"Style Guide"},sidebar:"tutorialSidebar",previous:{title:"Zuul CI",permalink:"/de/docs/guides/other-guides/developer-guide/zuul"},next:{title:"Testbed Guide",permalink:"/de/docs/guides/other-guides/testbed"}},d={},c=[{value:"Ansible",id:"ansible",level:2},{value:"Task names",id:"task-names",level:3},{value:"<code>become</code> directive",id:"become-directive",level:3},{value:"<code>when</code> directive",id:"when-directive",level:3},{value:"Lists as defaults",id:"lists-as-defaults",level:3},{value:"Containerfiles",id:"containerfiles",level:2},{value:"Commit messages",id:"commit-messages",level:2},{value:"Python",id:"python",level:2},{value:"Installation",id:"installation",level:3},{value:"Formatting a Single File",id:"formatting-a-single-file",level:3},{value:"Formatting Multiple Files and/or directories",id:"formatting-multiple-files-andor-directories",level:3},{value:"Formatting an Entire Project",id:"formatting-an-entire-project",level:3},{value:"Check Mode (Dry Run)",id:"check-mode-dry-run",level:3},{value:"Excluding Files or Directories",id:"excluding-files-or-directories",level:3},{value:"Integration with Code Editors",id:"integration-with-code-editors",level:3},{value:"Example of failed python-black Zuul job",id:"example-of-failed-python-black-zuul-job",level:3}];function a(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"style-guide",children:"Style Guide"})}),"\n",(0,s.jsx)(i.h2,{id:"ansible",children:"Ansible"}),"\n",(0,s.jsxs)(i.p,{children:["We implement all the default rules of Ansible Lint. All default rules can be found in the\n",(0,s.jsx)(i.a,{href:"https://ansible.readthedocs.io/projects/lint/rules/",children:"Ansible Lint documentation"}),"."]}),"\n",(0,s.jsx)(i.h3,{id:"task-names",children:"Task names"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Tasks must always have names. The only exception allowed is for forked playbooks."}),"\n",(0,s.jsx)(i.li,{children:"A name never starts with a small letter"}),"\n",(0,s.jsx)(i.li,{children:"Names are written in present tense"}),"\n",(0,s.jsx)(i.li,{children:"No punctuation is used in names"}),"\n"]}),"\n",(0,s.jsxs)(i.h3,{id:"become-directive",children:[(0,s.jsx)(i.code,{children:"become"})," directive"]}),"\n",(0,s.jsxs)(i.p,{children:["The ",(0,s.jsx)(i.code,{children:"become"})," directive is only set when needed and is always set explicitly for each task that needs it."]}),"\n",(0,s.jsx)(i.p,{children:"Blocks, roles, or playbooks are never executed in a privileged mode."}),"\n",(0,s.jsxs)(i.p,{children:["We always insert the ",(0,s.jsx)(i.code,{children:"become"})," directive between the name of a task and the task itself. This also applies\nto related directives like ",(0,s.jsx)(i.code,{children:"become_user"}),"  or ",(0,s.jsx)(i.code,{children:"become_flags"}),". This is for better visibility if a task is\nprivileged or not."]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:'- name: Copy hddtemp configuration file\n  become: true\n  ansible.builtin.copy:\n    src: "{{ ansible_os_family }}/hddtemp"\n    dest: "{{ hddtemp_conf_file }}"\n    owner: root\n    group: root\n    mode: 0644\n  notify: Restart hddtemp service\n'})}),"\n",(0,s.jsxs)(i.h3,{id:"when-directive",children:[(0,s.jsx)(i.code,{children:"when"})," directive"]}),"\n",(0,s.jsxs)(i.p,{children:["If you need to use the ",(0,s.jsx)(i.code,{children:"when"})," directive add this at the end-section from the task where it is needed. This\nmakes the code easier to understand for others."]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:'- name: "Archive existing {{ resolvconf_file }} file"\n  become: true\n  ansible.posix.synchronize:\n    src: "/etc/resolv.conf"\n    dest: "/etc/resolv.conf.{{ ansible_date_time.date }}"\n    archive: true\n  delegate_to: "{{ inventory_hostname }}"\n  when: stat_resolvconf_file.stat.islnk is defined and not stat_resolvconf_file.stat.islnk\n'})}),"\n",(0,s.jsx)(i.h3,{id:"lists-as-defaults",children:"Lists as defaults"}),"\n",(0,s.jsx)(i.p,{children:"Defaults that provide a list are always defined as in the following example."}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"docker_hosts_defaults"})," sets the defaults in the role. Overriding is only possible with the ",(0,s.jsx)(i.code,{children:"defaults"})," repository."]}),"\n",(0,s.jsxs)(i.p,{children:["In the configuration repository, ",(0,s.jsx)(i.code,{children:"docker_hosts_extra"})," is then used to add additional items to the list."]}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"docker_hosts"})," itself is never modified from the outside."]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:'docker_hosts_defaults:\n  - "unix:///var/run/docker.sock"\ndocker_hosts_extra: []\ndocker_hosts: "{{ docker_hosts_defaults + docker_hosts_extra }}"\n'})}),"\n",(0,s.jsx)(i.h2,{id:"containerfiles",children:"Containerfiles"}),"\n",(0,s.jsx)(i.h2,{id:"commit-messages",children:"Commit messages"}),"\n",(0,s.jsx)(i.h2,{id:"python",children:"Python"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.a,{href:"https://github.com/psf/black",children:"Black"})," is a popular Python code formatter that automatically\nformats your code to adhere to a consistent style. We use it to automatically format the\nsyntax of Python. A job is running in the CI that checks, if Black has been applied. Therefore,\nformat the files with Black accordingly in advance."]}),"\n",(0,s.jsx)(i.h3,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(i.p,{children:(0,s.jsx)(i.code,{children:"pip install black"})}),"\n",(0,s.jsx)(i.h3,{id:"formatting-a-single-file",children:"Formatting a Single File"}),"\n",(0,s.jsx)(i.p,{children:(0,s.jsx)(i.code,{children:"black myfile.py"})}),"\n",(0,s.jsx)(i.h3,{id:"formatting-multiple-files-andor-directories",children:"Formatting Multiple Files and/or directories"}),"\n",(0,s.jsx)(i.p,{children:(0,s.jsx)(i.code,{children:"black file1.py file2.py dir/"})}),"\n",(0,s.jsx)(i.h3,{id:"formatting-an-entire-project",children:"Formatting an Entire Project"}),"\n",(0,s.jsx)(i.p,{children:"This command will format all Python files in the current directory and its subdirectories:"}),"\n",(0,s.jsx)(i.p,{children:(0,s.jsx)(i.code,{children:"black ."})}),"\n",(0,s.jsx)(i.h3,{id:"check-mode-dry-run",children:"Check Mode (Dry Run)"}),"\n",(0,s.jsxs)(i.p,{children:["Running Black with the ",(0,s.jsx)(i.code,{children:"--check"})," option performs a dry run and reports files that would be\nchanged without actually modifying them:"]}),"\n",(0,s.jsx)(i.p,{children:(0,s.jsx)(i.code,{children:"black --check myfile.py"})}),"\n",(0,s.jsx)(i.h3,{id:"excluding-files-or-directories",children:"Excluding Files or Directories"}),"\n",(0,s.jsxs)(i.p,{children:["You can exclude files or directories from formatting using the ",(0,s.jsx)(i.code,{children:"--exclude"})," option:"]}),"\n",(0,s.jsx)(i.p,{children:(0,s.jsx)(i.code,{children:"black --exclude=dir_to_exclude/ ."})}),"\n",(0,s.jsx)(i.h3,{id:"integration-with-code-editors",children:"Integration with Code Editors"}),"\n",(0,s.jsx)(i.p,{children:"Many code editors have extensions or plugins that can automatically run Black on your code.\nFor example, if you're using VSCode or PyCharm, you can easily integrate it into your IDE."}),"\n",(0,s.jsx)(i.h3,{id:"example-of-failed-python-black-zuul-job",children:"Example of failed python-black Zuul job"}),"\n",(0,s.jsx)(i.p,{children:"job-output.txt:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{children:'[\u2026]\n2023-11-16 14:38:14.149756 | TASK [python-black : Install pip module black]\n2023-11-16 14:38:18.717886 | ubuntu-jammy | changed\n2023-11-16 14:38:18.723062 | \n2023-11-16 14:38:18.723137 | TASK [python-black : Format code with Black if there is nothing to exclude]\n2023-11-16 14:38:19.138060 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/adminer.py\n2023-11-16 14:38:19.151965 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/bird.py\n2023-11-16 14:38:19.163608 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/auditd.py\n2023-11-16 14:38:19.187772 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/cephclient/package.py\n2023-11-16 14:38:19.192695 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/cephclient/container.py\n2023-11-16 14:38:19.219694 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/cgit.py\n2023-11-16 14:38:19.230577 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/dnsdist.py\n2023-11-16 14:38:19.275681 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/hddtemp/redhat.py\n2023-11-16 14:38:19.300350 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/homer.py\n2023-11-16 14:38:19.310641 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/lldpd.py\n2023-11-16 14:38:19.318096 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/docker.py\n2023-11-16 14:38:19.329099 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/osquery.py\n2023-11-16 14:38:19.344766 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/rsyslog.py\n2023-11-16 14:38:19.358190 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/smartd.py\n2023-11-16 14:38:19.363578 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/tuned.py\n2023-11-16 14:38:19.389205 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/util/util.py\n2023-11-16 14:38:19.406360 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/modules/kolla_container_facts.py\n2023-11-16 14:38:19.415046 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/filter/address.py\n2023-11-16 14:38:19.473508 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/modules/kolla_toolbox.py\n2023-11-16 14:38:19.908963 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/modules/kolla_docker.py\n2023-11-16 14:38:19.914395 | ubuntu-jammy |\n2023-11-16 14:38:19.914412 | ubuntu-jammy | Oh no! \xf0\u0178\u2019\xa5 \xf0\u0178\u2019\u201d \xf0\u0178\u2019\xa5\n2023-11-16 14:38:19.914419 | ubuntu-jammy | 20 files would be reformatted, 18 files would be left unchanged.\n2023-11-16 14:38:20.249358 | ubuntu-jammy | ERROR\n2023-11-16 14:38:20.249501 | ubuntu-jammy | {\n2023-11-16 14:38:20.249533 | ubuntu-jammy |   "delta": "0:00:01.053565",\n2023-11-16 14:38:20.249553 | ubuntu-jammy |   "end": "2023-11-16 14:38:19.932073",\n2023-11-16 14:38:20.249571 | ubuntu-jammy |   "msg": "non-zero return code",\n2023-11-16 14:38:20.249587 | ubuntu-jammy |   "rc": 1,\n2023-11-16 14:38:20.249603 | ubuntu-jammy |   "start": "2023-11-16 14:38:18.878508"\n2023-11-16 14:38:20.249618 | ubuntu-jammy | }\n[\u2026]\n'})})]})}function u(e={}){const{wrapper:i}={...(0,n.a)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},1151:(e,i,t)=>{t.d(i,{Z:()=>r,a:()=>o});var s=t(7294);const n={},l=s.createContext(n);function o(e){const i=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(l.Provider,{value:i},e.children)}}}]);