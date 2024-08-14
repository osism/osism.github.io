"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4031],{4108:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"2024-03-04-show-versions-used-on-the-manager","metadata":{"permalink":"/blog/2024-03-04-show-versions-used-on-the-manager","source":"@site/blog/2024-03-04-show-versions-used-on-the-manager.md","title":"Show versions used on the manager","description":"The osism get versions manager command can be used to display the","date":"2024-03-04T00:00:00.000Z","tags":[{"inline":true,"label":"OSISM","permalink":"/blog/tags/osism"},{"inline":true,"label":"Machine Room","permalink":"/blog/tags/machine-room"}],"readingTime":0.41,"hasTruncateMarker":false,"authors":[{"name":"Christian Berendt","title":"Founder of OSISM","url":"https://github.com/berendt","imageURL":"https://github.com/berendt.png","key":"berendt","page":null}],"frontMatter":{"slug":"2024-03-04-show-versions-used-on-the-manager","title":"Show versions used on the manager","authors":["berendt"],"tags":["OSISM","Machine Room"]},"unlisted":false,"nextItem":{"title":"Switch to OpenTofu","permalink":"/blog/2024-01-16-switch-to-opentofu"}},"content":"The `osism get versions manager` command can be used to display the\\nversions of the individual modules used by OSISM. The OSISM version\\nused is listed under `OSISM Version`. If available, the release used\\nfor the corresponding module is listed under `Module Release`.\\n\\n```\\n$ osism get versions manager\\n+---------------+-----------------+------------------+\\n| Module        | OSISM version   | Module release   |\\n|---------------+-----------------+------------------|\\n| osism-ansible | 7.0.0b          |                  |\\n| ceph-ansible  | 7.0.0b          | quincy           |\\n| kolla-ansible | 7.0.0b          | 2023.2           |\\n+---------------+-----------------+------------------+\\n```"},{"id":"2024-01-16-switch-to-opentofu","metadata":{"permalink":"/blog/2024-01-16-switch-to-opentofu","source":"@site/blog/2024-01-16-switch-to-opentofu.md","title":"Switch to OpenTofu","description":"In blog posts with the tag News,","date":"2024-01-16T00:00:00.000Z","tags":[{"inline":true,"label":"OSISM","permalink":"/blog/tags/osism"},{"inline":true,"label":"News","permalink":"/blog/tags/news"}],"readingTime":0.435,"hasTruncateMarker":false,"authors":[{"name":"Christian Berendt","title":"Founder of OSISM","url":"https://github.com/berendt","imageURL":"https://github.com/berendt.png","key":"berendt","page":null}],"frontMatter":{"slug":"2024-01-16-switch-to-opentofu","title":"Switch to OpenTofu","authors":["berendt"],"tags":["OSISM","News"]},"unlisted":false,"prevItem":{"title":"Show versions used on the manager","permalink":"/blog/2024-03-04-show-versions-used-on-the-manager"},"nextItem":{"title":"Use of the container shell","permalink":"/blog/2024-01-16-use-of-the-container-shell"}},"content":"In blog posts with the tag [News](https://osism.tech/blog/tags/news),\\nwe will now write about news that are not directly related to a new\\nfeature or one of our managed infrastrucutre environments.\\n\\nMarc Sch\xf6chlin, Site Reliability Engineer at the [Sovereign Cloud Stack](https://scs.community)\\nproject, successfully completed the migration of [osism/testbed](https://github.com/osism/testbed)\\nfrom [Terraform](https://github.com/hashicorp/terraform) to [OpenTofu](https://github.com/opentofu/opentofu)\\nyesterday. The migration went smoothly and basically only the Terraform binary\\nhad to be replaced with the new OpenTofu binary.\\n\\nMore details in the SCS blog in the [Opensource - Testbed adopts OpenTofu](https://scs.community/2024/01/12/testbed-with-opentofu/)\\narticle written by Marc."},{"id":"2024-01-16-use-of-the-container-shell","metadata":{"permalink":"/blog/2024-01-16-use-of-the-container-shell","source":"@site/blog/2024-01-16-use-of-the-container-shell.md","title":"Use of the container shell","description":"With the OSISM CLI it is possible to enter a shell on a container running on a node.","date":"2024-01-16T00:00:00.000Z","tags":[{"inline":true,"label":"OSISM","permalink":"/blog/tags/osism"},{"inline":true,"label":"Machine Room","permalink":"/blog/tags/machine-room"}],"readingTime":0.345,"hasTruncateMarker":false,"authors":[{"name":"Christian Berendt","title":"Founder of OSISM","url":"https://github.com/berendt","imageURL":"https://github.com/berendt.png","key":"berendt","page":null}],"frontMatter":{"slug":"2024-01-16-use-of-the-container-shell","title":"Use of the container shell","authors":["berendt"],"tags":["OSISM","Machine Room"]},"unlisted":false,"prevItem":{"title":"Switch to OpenTofu","permalink":"/blog/2024-01-16-switch-to-opentofu"},"nextItem":{"title":"Use of the ClusterShell","permalink":"/blog/2024-01-14-use-of-the-clustershell"}},"content":"With the OSISM CLI it is possible to enter a shell on a container running on a node.\\n\\nThis is useful, for example, to view running instances that are managed via Libvirt.\\n\\nIn this example, the command `virsh list` is executed in the `nova_libvirt` container\\nrunning on the `com1069` node.\\n\\n```\\n$ osism console com1069/nova_libvirt\\n(nova-libvirt)[root@com1069 /]# virsh list\\n Id    Name                State\\n------------------------------------\\n 190   instance-001b2492   running\\n\\n(nova-libvirt)[root@com1069 /]#\\n```"},{"id":"2024-01-14-use-of-the-clustershell","metadata":{"permalink":"/blog/2024-01-14-use-of-the-clustershell","source":"@site/blog/2024-01-14-use-of-the-clustershell.md","title":"Use of the ClusterShell","description":"ClusterShell is an","date":"2024-01-14T00:00:00.000Z","tags":[{"inline":true,"label":"OSISM","permalink":"/blog/tags/osism"},{"inline":true,"label":"Machine Room","permalink":"/blog/tags/machine-room"}],"readingTime":0.805,"hasTruncateMarker":false,"authors":[{"name":"Christian Berendt","title":"Founder of OSISM","url":"https://github.com/berendt","imageURL":"https://github.com/berendt.png","key":"berendt","page":null}],"frontMatter":{"slug":"2024-01-14-use-of-the-clustershell","title":"Use of the ClusterShell","authors":["berendt"],"tags":["OSISM","Machine Room"]},"unlisted":false,"prevItem":{"title":"Use of the container shell","permalink":"/blog/2024-01-16-use-of-the-container-shell"},"nextItem":{"title":"Restart of a container on a specific node","permalink":"/blog/2024-01-12-restart-of-a-container-on-a-specific-node"}},"content":"[ClusterShell](https://clustershell.readthedocs.io/en/latest/intro.html) is an\\nevent-driven open source Python framework, designed to run local or distant commands\\nin parallel on server farms or on large Linux clusters. We learned to use it by chance\\nduring a large HPC project with the team there and learned to like it.\\n\\nClusterShell can be used in a rudimentary way via the `console` command of the OSISM CLI.\\nThe Ansible inventory groups are available as node groups. These are automatically\\ngenerated and updated by the inventory reconciler.\\n\\nIn this example, the command `uname -v` is executed on all nodes in the node group\\n`housing1047`.\\n\\n```\\n$ osism console --type clush housing1047\\nEnter \'quit\' to leave this interactive mode\\nWorking with nodes: com[1047-1050]\\nclush> uname -v\\ncom1049: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\\ncom1050: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\\ncom1047: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\\ncom1048: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\\nclush>\\n```"},{"id":"2024-01-12-restart-of-a-container-on-a-specific-node","metadata":{"permalink":"/blog/2024-01-12-restart-of-a-container-on-a-specific-node","source":"@site/blog/2024-01-12-restart-of-a-container-on-a-specific-node.md","title":"Restart of a container on a specific node","description":"We not only develop OSISM, we also use it to operate our own cloud","date":"2024-01-12T00:00:00.000Z","tags":[{"inline":true,"label":"OSISM","permalink":"/blog/tags/osism"},{"inline":true,"label":"Machine Room","permalink":"/blog/tags/machine-room"}],"readingTime":1.53,"hasTruncateMarker":false,"authors":[{"name":"Christian Berendt","title":"Founder of OSISM","url":"https://github.com/berendt","imageURL":"https://github.com/berendt.png","key":"berendt","page":null}],"frontMatter":{"slug":"2024-01-12-restart-of-a-container-on-a-specific-node","title":"Restart of a container on a specific node","authors":["berendt"],"tags":["OSISM","Machine Room"]},"unlisted":false,"prevItem":{"title":"Use of the ClusterShell","permalink":"/blog/2024-01-14-use-of-the-clustershell"},"nextItem":{"title":"Kubernetes Service Deployments","permalink":"/blog/2024-01-11-kubernetes-service-deployment"}},"content":"We not only develop OSISM, we also use it to operate our own cloud\\ninfrastructure, the REGIO.cloud. When operating REGIO.cloud, we often\\ncome across tasks in our day-to-day business that we can already solve\\nwith the help of OSISM. If not, we [open an issue](https://github.com/osism/issues/issues)\\nfor the task and build it in so that we can solve it directly in OSISM in the future.\\n\\nIn blog posts with the tag [Machine Room](https://osism.tech/blog/tags/machine-room),\\nwe will now write about such tasks and how we were able to solve them with OSISM.\\n\\nYesterday we had a hiccup in our RabbitMQ cluster. This has caused problems\\nwith the attachment of volumes to instances during the night. After analyzing the\\nproblem, it was decided that only a restart of the `nova_compute` containers,\\nwhich provide the Nova Compute Service, would solve the problem. With the play\\n`manage-container` it is possible to run an action, e.g. `restart`, of a specific\\ncontainer.\\n\\nAs we have our compute nodes in housings, we have also mapped them in the inventory\\nin `inventory/10-custom` and can now use those groups to restart all Nova Compute\\nservices one by one.\\n\\n```\\n$ osism apply manage-container \\\\\\n    -e container_action=restart \\\\\\n    -e container_name=nova_compute \\\\\\n    -l housing1047\\n2024-01-12 08:28:55 | INFO     | Task was prepared for execution. It takes a moment until the task has been started and output is visible here.\\n\\nPLAY [Manage container] ********************************************************\\n\\nTASK [Manage container] ********************************************************\\nchanged: [com1047]\\n\\nPLAY [Manage container] ********************************************************\\n\\nTASK [Manage container] ********************************************************\\nchanged: [com1048]\\n\\nPLAY [Manage container] ********************************************************\\n\\nTASK [Manage container] ********************************************************\\nchanged: [com1049]\\n\\nPLAY [Manage container] ********************************************************\\n\\nTASK [Manage container] ********************************************************\\nchanged: [com1050]\\n\\nPLAY RECAP *********************************************************************\\ncom1047                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\\ncom1048                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\\ncom1049                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\\ncom1050                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\\n```"},{"id":"2024-01-11-kubernetes-service-deployment","metadata":{"permalink":"/blog/2024-01-11-kubernetes-service-deployment","source":"@site/blog/2024-01-11-kubernetes-service-deployments.md","title":"Kubernetes Service Deployments","description":"New big and small features are constantly being added to OSISM. This makes using OSISM","date":"2024-01-11T00:00:00.000Z","tags":[{"inline":true,"label":"Sneak Peak","permalink":"/blog/tags/sneak-peak"},{"inline":true,"label":"Kubernetes","permalink":"/blog/tags/kubernetes"}],"readingTime":1.025,"hasTruncateMarker":false,"authors":[{"name":"Christian Berendt","title":"Founder of OSISM","url":"https://github.com/berendt","imageURL":"https://github.com/berendt.png","key":"berendt","page":null}],"frontMatter":{"slug":"2024-01-11-kubernetes-service-deployment","title":"Kubernetes Service Deployments","authors":["berendt"],"tags":["Sneak Peak","Kubernetes"]},"unlisted":false,"prevItem":{"title":"Restart of a container on a specific node","permalink":"/blog/2024-01-12-restart-of-a-container-on-a-specific-node"}},"content":"New big and small features are constantly being added to OSISM. This makes using OSISM\\na little better for operators of the [Sovereign Cloud Stack](https://scs.community) every day.\\n\\nSince we currently only do a major release every 6 months in which we write about these big\\nand small features in the release notes, there will be this kind of blog posts from now on.\\nIn blog posts with the tag [Sneak Peak](https://osism.tech/blog/tags/sneak-peak),\\nwe will now write about new features before the next major release.\\n\\nThis blog entry is specifically about the possibility of deploying services on the recently\\nintegrated Kubernetes cluster.\\n\\nThe deployment of services on the integrated Kubernetes cluster will be possible in\\nfuture via the `kubernetes` environment. A first simple example for the deployment\\nof Nginx is already [available in the osism/testbed repository](https://github.com/osism/testbed/tree/main/environments/kubernetes).\\nThe new environment is used as usual with `osism apply`.\\n\\n```\\n$ osism apply -e kubernetes nginx\\n\\n$ kubectl get pods -n nginx\\nNAME                    READY   STATUS    RESTARTS   AGE\\nnginx-f7f5c78c5-crhnf   1/1     Running   0          2m28s\\nnginx-f7f5c78c5-tjf6r   1/1     Running   0          2m28s\\nnginx-f7f5c78c5-qbqjz   1/1     Running   0          2m28\\n\\n$ kubectl get services -n nginx\\nNAME    TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE\\nnginx   LoadBalancer   10.43.84.203   192.168.16.100   80:30612/TCP   2m46s\\n\\n$ curl -I http://192.168.16.100\\nHTTP/1.1 200 OK\\nServer: nginx/1.25.3\\n```"}]}}')}}]);