"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9167],{7243:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var s=t(5893),i=t(1151);const a={sidebar_label:"Install instance from ISO image"},o="Install instance from ISO image",r={id:"guides/user-guide/openstack/install-instance-from-iso",title:"Install instance from ISO image",description:"While in general it is considered best practice to create instances from existing or specially crafted images, sometimes it is necessary to install an instance using a traditional installer packaged in an ISO image.",source:"@site/docs/guides/user-guide/openstack/install-instance-from-iso.md",sourceDirName:"guides/user-guide/openstack",slug:"/guides/user-guide/openstack/install-instance-from-iso",permalink:"/docs/guides/user-guide/openstack/install-instance-from-iso",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/user-guide/openstack/install-instance-from-iso.md",tags:[],version:"current",frontMatter:{sidebar_label:"Install instance from ISO image"},sidebar:"tutorialSidebar",previous:{title:"OpenStack",permalink:"/docs/guides/user-guide/openstack/"},next:{title:"Client",permalink:"/docs/guides/user-guide/openstack/openstackclient"}},c={},l=[{value:"Upload the ISO image",id:"upload-the-iso-image",level:2},{value:"Creating the instance",id:"creating-the-instance",level:2},{value:"Using nova local storage",id:"using-nova-local-storage",level:3},{value:"Using boot from volume",id:"using-boot-from-volume",level:3},{value:"Install the created instance from the uploaded ISO",id:"install-the-created-instance-from-the-uploaded-iso",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"install-instance-from-iso-image",children:"Install instance from ISO image"})}),"\n",(0,s.jsxs)(n.p,{children:["While in general it is considered best practice to create instances from existing or specially crafted images, sometimes it is necessary to install an instance using a traditional installer packaged in an ISO image.\nOne way to do this in OpenStack is to leverage the ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/user/rescue.html",children:"instance rescue mechanism"}),", which allows to boot an instance from another image while providing access to the instances storage."]}),"\n",(0,s.jsx)(n.h2,{id:"upload-the-iso-image",children:"Upload the ISO image"}),"\n",(0,s.jsx)(n.p,{children:"If the required ISO image is not available in the image store yet upload it first:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'PATH_TO_ISO_IMAGE=""\nIMAGE_NAME=""\nopenstack image create \\\n  --disk-format iso \\\n  --file $PATH_TO_ISO_IMAGE \\\n  --property hw_rescue_device=disk \\\n  --property hw_rescue_bus=virtio \\\n  $IMAGE_NAME\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"hw_rescue_device"})," and ",(0,s.jsx)(n.code,{children:"hw_rescue_bus"})," properties may be omitted if you do not intent to create an instance from a boot volume."]}),"\n",(0,s.jsx)(n.h2,{id:"creating-the-instance",children:"Creating the instance"}),"\n",(0,s.jsx)(n.h3,{id:"using-nova-local-storage",children:"Using nova local storage"}),"\n",(0,s.jsx)(n.p,{children:"Create an instance with a blank local boot device, e.g.:"}),"\n",(0,s.jsxs)(n.p,{children:["Until ",(0,s.jsx)(n.a,{href:"https://bugs.launchpad.net/nova/+bug/2090926",children:"this bug"})," is fixed, one cannot create an instance with a blank local boot device. As a workaround create an unbootable dummy image first, e.g.:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'DUMMY_IMAGE_NAME="dummy"\ndd if=/dev/zero of="$DUMMY_IMAGE_NAME" bs=1k count=1\nopenstack image create \\\n  --file "$DUMMY_IMAGE_NAME" \\\n  "$DUMMY_IMAGE_NAME"\nrm  "$DUMMY_IMAGE_NAME"\n'})}),"\n",(0,s.jsx)(n.p,{children:"Create the instance:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'INSTANCE_NAME=""\nFLAVOR=""\nopenstack server create \\\n  --flavor "$FLAVOR" \\\n  --image "$DUMMY_IMAGE_NAME" \\\n  --no-network \\\n  "$INSTANCE_NAME"\n'})}),"\n",(0,s.jsx)(n.p,{children:"Once the bug is fixed the instance may be created directly:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'INSTANCE_NAME=""\nFLAVOR=""\nopenstack server create \\\n  --flavor "$FLAVOR" \\\n  --block-device "source_type=blank,destination_type=local,guest_format=raw,boot_index=0" \\\n  --no-network \\\n  "$INSTANCE_NAME"\n'})}),"\n",(0,s.jsx)(n.h3,{id:"using-boot-from-volume",children:"Using boot from volume"}),"\n",(0,s.jsx)(n.p,{children:"Create an instance with a blank boot volume"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'INSTANCE_NAME=""\nFLAVOR=""\nBOOT_VOLUME_SIZE=""\nopenstack server create \\\n  --flavor "$FLAVOR" \\\n  --block-device "source_type=blank,destination_type=volume,volume_size=$BOOT_VOLUME_SIZE,boot_index=0" \\\n  --no-network \\\n  "$INSTANCE_NAME"\n'})}),"\n",(0,s.jsx)(n.p,{children:"Set the created volume to bootable"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack volume set --bootable $(openstack server show $INSTANCE_NAME -f json -c attached_volumes | jq -r '.attached_volumes | first | .id')\n"})}),"\n",(0,s.jsx)(n.h2,{id:"install-the-created-instance-from-the-uploaded-iso",children:"Install the created instance from the uploaded ISO"}),"\n",(0,s.jsx)(n.p,{children:"Use the rescue mechanism to boot the ISO, e.g.:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack server rescue \\\n  --image $IMAGE_NAME \\\n  $INSTANCE_NAME\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Wait for the instance to be rescued. This will take a moment, as a soft reboot is tried before issueing a hard reboot.\nWatch the instance ",(0,s.jsx)(n.code,{children:"task_state"})," and ",(0,s.jsx)(n.code,{children:"status"})," to see the latter change from ",(0,s.jsx)(n.code,{children:"ACTIVE"})," to ",(0,s.jsx)(n.code,{children:"RESCUE"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"watch openstack server show $INSTANCE_NAME -f value -c status -c task_state\n"})}),"\n",(0,s.jsx)(n.p,{children:"Start the installation procedure, e.g. by opening the instance's console"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack console url show $INSTANCE_NAME\n"})}),"\n",(0,s.jsx)(n.p,{children:"The instances storage device should be available as a destination for the installation.\nRebooting the instance in this state will lead to the rescue image being booted again.\nTo boot the instance from its freshly provisioned boot device unrescue the instance:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack server unrescue $INSTANCE_NAME\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>o});var s=t(7294);const i={},a=s.createContext(i);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);