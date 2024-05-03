"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7937],{5674:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var i=a(5893),t=a(1151);const s={sidebar_label:"User Data Backups"},r="User Data Backups",c={id:"guides/user-guide/openstack/user-data-backups",title:"User Data Backups",description:"This guide will explain common procedures for creating and restoring backups of user data accumulated in cloud resources such as volumes, images or ephemeral server disks.",source:"@site/docs/guides/user-guide/openstack/user-data-backups.md",sourceDirName:"guides/user-guide/openstack",slug:"/guides/user-guide/openstack/user-data-backups",permalink:"/docs/guides/user-guide/openstack/user-data-backups",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/user-guide/openstack/user-data-backups.md",tags:[],version:"current",frontMatter:{sidebar_label:"User Data Backups"},sidebar:"tutorialSidebar",previous:{title:"Security groups",permalink:"/docs/guides/user-guide/openstack/security-groups"},next:{title:"Other Guides",permalink:"/docs/guides/other-guides/"}},o={},l=[{value:"Glossary",id:"glossary",level:2},{value:"Scope",id:"scope",level:2},{value:"Overview of applicable User Data",id:"overview-of-applicable-user-data",level:3},{value:"Image backup using download",id:"image-backup-using-download",level:2},{value:"Ephemeral Storage backup using Glance images",id:"ephemeral-storage-backup-using-glance-images",level:2},{value:"Volume data backup using Cinder Backup API",id:"volume-data-backup-using-cinder-backup-api",level:2},{value:"Backup of detached volumes",id:"backup-of-detached-volumes",level:3},{value:"Backup of attached volumes",id:"backup-of-attached-volumes",level:3},{value:"Volume data backup using Glance images",id:"volume-data-backup-using-glance-images",level:2},{value:"Glance image backups of detached volumes",id:"glance-image-backups-of-detached-volumes",level:3},{value:"Glance image backups of attached (in-use) volumes",id:"glance-image-backups-of-attached-in-use-volumes",level:3},{value:"Barbican secrets backup using download",id:"barbican-secrets-backup-using-download",level:2},{value:"Retrieving encryption keys from Barbican",id:"retrieving-encryption-keys-from-barbican",level:3},{value:"Restore",id:"restore",level:2},{value:"Restoring a backup of a Barbican secret",id:"restoring-a-backup-of-a-barbican-secret",level:3},{value:"Restoring a backup of an unencrypted image",id:"restoring-a-backup-of-an-unencrypted-image",level:3},{value:"Restoring a backup of an encrypted image",id:"restoring-a-backup-of-an-encrypted-image",level:3},{value:"Restoring a volume backup from an image",id:"restoring-a-volume-backup-from-an-image",level:3},{value:"Restoring a volume backup from the Cinder Backup service",id:"restoring-a-volume-backup-from-the-cinder-backup-service",level:3},{value:"Restoring to a new volume (Cinder Backup)",id:"restoring-to-a-new-volume-cinder-backup",level:4},{value:"Restoring on an existing volume (Cinder Backup)",id:"restoring-on-an-existing-volume-cinder-backup",level:4},{value:"Restoring an encrypted volume backup (Cinder Backup)",id:"restoring-an-encrypted-volume-backup-cinder-backup",level:4},{value:"Appendix",id:"appendix",level:2},{value:"Image creation action for servers with attached volumes",id:"image-creation-action-for-servers-with-attached-volumes",level:3},{value:"LUKS encryption key conversion to decrypt volume images",id:"luks-encryption-key-conversion-to-decrypt-volume-images",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"user-data-backups",children:"User Data Backups"}),"\n",(0,i.jsx)(n.p,{children:"This guide will explain common procedures for creating and restoring backups of user data accumulated in cloud resources such as volumes, images or ephemeral server disks."}),"\n",(0,i.jsx)(n.h2,{id:"glossary",children:"Glossary"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Term"}),(0,i.jsx)(n.th,{children:"Explanation"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Virtual Machine"}),(0,i.jsxs)(n.td,{children:["Equals the ",(0,i.jsx)(n.code,{children:"server"})," resource in Nova."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Ephemeral Storage"}),(0,i.jsx)(n.td,{children:"Disk storage directly supplied to a virtual machine by Nova. Different from volumes."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"(Glance) Image"}),(0,i.jsx)(n.td,{children:"IaaS resource usually storing raw disk data. Managed by the Glance service."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"(Cinder) Volume"}),(0,i.jsx)(n.td,{children:"IaaS resource representing block storage disk that can be attached as a virtual disk to virtual machines. Managed by the Cinder service."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"(Volume) Snapshot"}),(0,i.jsx)(n.td,{children:"Thinly-provisioned copy-on-write snapshots of volumes. Stored in the same Cinder storage backend as volumes."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Volume Type"}),(0,i.jsx)(n.td,{children:"Attribute of volumes determining storage details of a volume such as backend location or whether the volume will be encrypted."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"(Barbican) Secret"}),(0,i.jsx)(n.td,{children:"IaaS resource storing cryptographic assets such as encryption keys. Managed by the Barbican service."})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"scope",children:"Scope"}),"\n",(0,i.jsx)(n.p,{children:"User data in the context of this guide describes data accumulated in cloud resources of a user at runtime.\nThis concerns primarily storage data of virtual machines stored at at-rest.\nThis does not cover in-transit or in-use data such as network traffic, virtual machines' RAM contents or IaaS configuration and metadata of cloud resources."}),"\n",(0,i.jsx)(n.h3,{id:"overview-of-applicable-user-data",children:"Overview of applicable User Data"}),"\n",(0,i.jsx)(n.p,{children:"Given the mentioned scope, the following can be classified as user data:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"images stored in Glance"}),"\n",(0,i.jsxs)(n.li,{children:["virtual machine disks, either:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Ephemeral Storage stored in Nova"}),"\n",(0,i.jsx)(n.li,{children:"volumes stored in Cinder"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"encryption keys stored as secrets in Barbican"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"The following sections will describe backup procedures for each of those resources individually."}),"\n",(0,i.jsx)(n.h2,{id:"image-backup-using-download",children:"Image backup using download"}),"\n",(0,i.jsx)(n.p,{children:"Glance images may act as backup targets for other resources (such as volumes) but don't have a dedicated backup service for themselves."}),"\n",(0,i.jsx)(n.p,{children:"When an image is to be backed up, it can be downloaded from the Glance image service and stored outside of the IaaS infrastructure for backup purposes.\nIn this case it is the user's responsibility to establish the backup procedure and appropriate target storage."}),"\n",(0,i.jsxs)(n.admonition,{type:"caution",children:[(0,i.jsx)(n.p,{children:"When creating images from volumes with a volume type that uses encryption, the resulting image will contain the raw LUKS-encrypted blocks of the volume.\nWhen transferred outside of the IaaS infrastructure, this data is only useful as a backup together with the corresponding encryption key."}),(0,i.jsxs)(n.p,{children:["Such images can be identified by an attribute called ",(0,i.jsx)(n.code,{children:"cinder_encryption_key_id"})," in the ",(0,i.jsx)(n.code,{children:"properties"})," metadata field of the image.\nIt only exists for encrypted images and references the encryption key in Barbican.\nRefer to the ",(0,i.jsx)(n.a,{href:"#barbican-secrets-backup-using-download",children:"Barbican secrets section"})," for instructions on how to backup the key."]})]}),"\n",(0,i.jsx)(n.p,{children:"The API or the OpenStack client may be used to initiate the download, for example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack image save --file $TARGET_FILE_PATH $IMAGE_NAME_OR_ID\n"})}),"\n",(0,i.jsx)(n.p,{children:"This or the underlying API request may be automated as part of a regular backup schedule involving the backup storage target on the user side."}),"\n",(0,i.jsx)(n.h2,{id:"ephemeral-storage-backup-using-glance-images",children:"Ephemeral Storage backup using Glance images"}),"\n",(0,i.jsxs)(n.admonition,{type:"caution",children:[(0,i.jsxs)(n.p,{children:["When using the ",(0,i.jsx)(n.code,{children:"createImage"})," Compute API action (e.g. via the ",(0,i.jsx)(n.code,{children:"openstack server image create"})," command) on a virtual machine that has volumes attached to it in addition to its Ephemeral Storage disk, the volumes will not be backed up into the image. Instead, a snapshot will be created for each attached volume and referenced in the image metadata. This does not replace genuine volume backups."]}),(0,i.jsxs)(n.p,{children:["See the ",(0,i.jsx)(n.a,{href:"#image-creation-action-for-servers-with-attached-volumes",children:"corresponding appendix section"})," for further details."]})]}),"\n",(0,i.jsxs)(n.p,{children:["Ephemeral Storage disks of virtual machines can be backed up to Glance images easily by using the ",(0,i.jsx)(n.code,{children:"createImage"})," Compute API action or the corresponding OpenStack client command:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack server image create --name $IMAGE_NAME $SERVER_NAME_OR_ID\n"})}),"\n",(0,i.jsx)(n.p,{children:"This will create a Glance image containing a one-to-one copy of the data on the Ephemeral Storage disk at the time of execution."}),"\n",(0,i.jsxs)(n.p,{children:["If the necessity arises to store this backup outside of the IaaS infrastructure, the download procedure as described in ",(0,i.jsx)(n.a,{href:"#image-backup-using-download",children:"Image backup using download"})," may be used after the image creation."]}),"\n",(0,i.jsx)(n.h2,{id:"volume-data-backup-using-cinder-backup-api",children:"Volume data backup using Cinder Backup API"}),"\n",(0,i.jsx)(n.p,{children:"The following instructions only apply if the infrastructure offers the Cinder Backup API."}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"Backups of volumes using a volume type that uses encryption will retain their encryption and a clone of the original encryption key is created in Barbican linked to the backup.\nThese backups can only be restored when the Barbican service is available and still has the corresponding copy of the encryption key."}),(0,i.jsxs)(n.p,{children:["Also, it is advised to take note of the exact volume type when creating a backup of an encrypted volume, because this information will be needed to restore the backup.\nSee ",(0,i.jsx)(n.a,{href:"#restoring-an-encrypted-volume-backup-cinder-backup",children:"restoring an encrypted volume backup"}),"."]})]}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["It might be difficult or even impossible for a user to transfer backups created by the Cinder Backup API outside of the IaaS infrastructure, depending on the backup backend.\nA more easily accessible backup of volumes can be created by using Glance images.\nSee the ",(0,i.jsx)(n.a,{href:"#volume-data-backup-using-glance-images",children:"section about volume data backup using Glance images"})," for details."]})}),"\n",(0,i.jsx)(n.h3,{id:"backup-of-detached-volumes",children:"Backup of detached volumes"}),"\n",(0,i.jsx)(n.p,{children:"Backups can be created using the Cinder Backup API or the corresponding OpenStack client commands:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume backup create $VOLUME_NAME_OR_ID\n"})}),"\n",(0,i.jsx)(n.p,{children:"Further backups of the same volume can subsequently be created as incremental backups using the following command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume backup create --incremental $VOLUME_NAME_OR_ID\n"})}),"\n",(0,i.jsx)(n.h3,{id:"backup-of-attached-volumes",children:"Backup of attached volumes"}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"When creating backups of attached (in-use) volumes, the state of the full volume is captured at runtime. Backups created this way will be crash-consistent but not app-consistent."})}),"\n",(0,i.jsxs)(n.p,{children:["In case of attached (in-use) volumes, backups can only be created while also specfiying the ",(0,i.jsx)(n.code,{children:"force"})," parameter:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume backup create --force $VOLUME_NAME_OR_ID\n"})}),"\n",(0,i.jsx)(n.p,{children:"Further backups of the same volume can subsequently be created as incremental backups using the following command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume backup create --force --incremental $VOLUME_NAME_OR_ID\n"})}),"\n",(0,i.jsx)(n.h2,{id:"volume-data-backup-using-glance-images",children:"Volume data backup using Glance images"}),"\n",(0,i.jsx)(n.p,{children:"In case the Cinder Backup storage is not available in the IaaS infrastructure, Glance images can be used as a backup target instead.\nSuch images may also subsequently be downloaded to transfer the backup outside of the IaaS infrastructure."}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Glance image backups of Cinder volumes only allow full backup copies and do not offer incremental or differential backup mechanisms."})}),"\n",(0,i.jsx)(n.h3,{id:"glance-image-backups-of-detached-volumes",children:"Glance image backups of detached volumes"}),"\n",(0,i.jsxs)(n.p,{children:["Volumes not attached to virtual machines can be directly copied into an image.\nSuch volumes can be identified by their status being ",(0,i.jsx)(n.code,{children:"available"}),".\nTo backup a detached volume to a Glance image, directly use the corresponding image creation action:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack image create --volume $VOLUME_NAME_OR_ID $IMAGE_NAME\n"})}),"\n",(0,i.jsx)(n.p,{children:"After the image creation has finished, a full backup copy of the volume will reside in the Glance storage backend."}),"\n",(0,i.jsxs)(n.p,{children:["If the necessity arises to store this backup outside of the IaaS infrastructure, the download procedure as described in ",(0,i.jsx)(n.a,{href:"#image-backup-using-download",children:"Image backup using download"})," may be used after the image creation."]}),"\n",(0,i.jsx)(n.h3,{id:"glance-image-backups-of-attached-in-use-volumes",children:"Glance image backups of attached (in-use) volumes"}),"\n",(0,i.jsx)(n.p,{children:"Cinder is unable to directly create Glance images from volumes which are attached to virtual machines.\nTo create backups of such volumes regardless, a detour using volume snapshots can be used which will be described below."}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["When creating snapshots of attached (in-use) volumes, the ",(0,i.jsx)(n.code,{children:"force"})," parameter has to be used. These snapshots capture a state of the full volume at runtime. They will be crash-consistent but not app-consistent."]})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Create a snapshot of the target volume while including the ",(0,i.jsx)(n.code,{children:"force"})," parameter in the request:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"openstack volume snapshot create --volume $VOLUME_NAME_OR_ID $SNAPSHOT_NAME"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Create a new temporary volume based on the snapshot to act as backup source:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"openstack volume create --snapshot $SNAPSHOT_NAME $TEMP_VOLUME_NAME"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Wait until the volume creation is finished and the temporary volume reaches the ",(0,i.jsx)(n.code,{children:"available"})," status."]}),"\n",(0,i.jsxs)(n.li,{children:["Create a backup image of the temporary volume:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"openstack image create --volume $TEMP_VOLUME_NAME $IMAGE_NAME"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Wait until the image creation finishes and the target image reaches the ",(0,i.jsx)(n.code,{children:"active"})," status."]}),"\n",(0,i.jsxs)(n.li,{children:["Delete the temporary volume and snapshot:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"openstack volume delete $TEMP_VOLUME_NAME"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"openstack volume snapshot delete $SNAPSHOT_NAME"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"A full backup copy of the volume now resides in the Glance storage backend."}),"\n",(0,i.jsxs)(n.p,{children:["If the necessity arises to store this backup outside of the IaaS infrastructure, the download procedure as described in ",(0,i.jsx)(n.a,{href:"#image-backup-using-download",children:"Image backup using download"})," may be used after the image creation."]}),"\n",(0,i.jsx)(n.h2,{id:"barbican-secrets-backup-using-download",children:"Barbican secrets backup using download"}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsx)(n.p,{children:"Secrets downloaded from Barbican will be in plaintext, which means that the secret is unprotected once received from the API.\nBefore downloading secrets from Barbican make sure that a secure target environment is established for receiving and securely storing the secret's contents."})}),"\n",(0,i.jsx)(n.p,{children:"Barbican secrets can be downloaded in plaintext using the corresponding API or client command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'openstack secret get --file $TARGET_FILE_PATH --payload_content_type "application/octet-stream" $SECRET_ID\n'})}),"\n",(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsxs)(n.p,{children:["In case the secret needs to be restored into an OpenStack Barbican later on, it is recommended to also note down the following attributes shown by ",(0,i.jsx)(n.code,{children:"openstack secret get $SECRET_ID"}),":"]}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Algorithm"}),"\n",(0,i.jsx)(n.li,{children:"Bit length"}),"\n",(0,i.jsx)(n.li,{children:"Secret type"}),"\n",(0,i.jsx)(n.li,{children:"Mode"}),"\n"]})]}),"\n",(0,i.jsx)(n.h3,{id:"retrieving-encryption-keys-from-barbican",children:"Retrieving encryption keys from Barbican"}),"\n",(0,i.jsx)(n.p,{children:"In case of encrypted volumes (i.e. using a volume type with encryption), a corresponding encryption key is stored in Barbican.\nWhen an image is created from such a volume, the encryption key is duplicated in Barbican for the image.\nIn order to backup those keys, the corresponding secret must first be identified."}),"\n",(0,i.jsx)(n.p,{children:"For volumes, this is possible starting with the Volume API microversion 3.64:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume show --os-volume-api-version 3.64 $VOLUME_NAME_OR_ID\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The response will contain an ",(0,i.jsx)(n.code,{children:"encryption_key_id"})," field with the ID of the Barbican secret."]}),"\n",(0,i.jsxs)(n.p,{children:["For images, the secret reference is stored in the ",(0,i.jsx)(n.code,{children:"properties"})," field instead:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack image show -f value -c properties $IMAGE_NAME_OR_ID\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In case of images created from encrypted volumes, the resulting output will have a nested ",(0,i.jsx)(n.code,{children:"cinder_encryption_key_id"})," field that contains the ID of the Barbican secret."]}),"\n",(0,i.jsxs)(n.p,{children:["The resulting IDs can be used to retrieve the corresponding key using the ",(0,i.jsx)(n.a,{href:"#barbican-secrets-backup-using-download",children:"Barbican instructions"})," above."]}),"\n",(0,i.jsxs)(n.admonition,{type:"caution",children:[(0,i.jsx)(n.p,{children:"Note that the key retrieved from the secret is not immediately usable as LUKS passphrase to the image data of the volume.\nOpenStack does some processing to the key before it is passed to the LUKS encryption, which must be mimicked accordingly in order to unlock the encryption outside of OpenStack!"}),(0,i.jsxs)(n.p,{children:["See the ",(0,i.jsx)(n.a,{href:"#luks-encryption-key-conversion-to-decrypt-volume-images",children:"example procedure for converting the LUKS key"})," in the appendix section."]})]}),"\n",(0,i.jsx)(n.h2,{id:"restore",children:"Restore"}),"\n",(0,i.jsx)(n.p,{children:"The following sections will illustrate how to restore the individual resource backups that have been documented above."}),"\n",(0,i.jsx)(n.h3,{id:"restoring-a-backup-of-a-barbican-secret",children:"Restoring a backup of a Barbican secret"}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Note that restoring a Barbican secret by re-uploading it via the Barbican API will lead to the secret receiving a new ID.\nExisting resources referencing an old secret ID cannot make use of the restored copy."})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack secret store --algorithm aes --bit-length 256 --mode cbc \\\n    --secret-type symmetric --file $KEY_FILE_PATH --name $SECRET_NAME\n"})}),"\n",(0,i.jsx)(n.p,{children:"Notes:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Attributes like algorithm, bit length, mode and secret type are not verified by Barbican. Their main purpose is to classify the secret on a metadata level. Make sure to align the attributes with the original secret."}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$KEY_FILE_PATH"})," is the local file path of the secret backup as created originally using the ",(0,i.jsx)(n.a,{href:"#barbican-secrets-backup-using-download",children:"instructions above"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"$SECRET_NAME"})," is entirely optional but helps identifying the restored secret later on and to distinguish it from secrets created by OpenStack itself. It is best to not put whitespace characters in the name, otherwise it has to be surrounded by quotes."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"The successful registration of the restored secret can subsequently be verified using:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack secret list --name $SECRET_NAME\n"})}),"\n",(0,i.jsx)(n.h3,{id:"restoring-a-backup-of-an-unencrypted-image",children:"Restoring a backup of an unencrypted image"}),"\n",(0,i.jsx)(n.p,{children:"Unencrypted image backups can simply be restored using the regular image upload functionality and specifying the backup file:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack image create --file $IMAGE_FILE_PATH $IMAGE_NAME\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["In case the original image backup was not based on a volume originally, the image may have had a non-default disk or container format.\nIn this case, add the command parameters ",(0,i.jsx)(n.code,{children:"--container-format"})," and ",(0,i.jsx)(n.code,{children:"--disk-format"})," to the command accordingly."]})}),"\n",(0,i.jsx)(n.h3,{id:"restoring-a-backup-of-an-encrypted-image",children:"Restoring a backup of an encrypted image"}),"\n",(0,i.jsx)(n.p,{children:"The following section only applies to image backups that were originally created from images of encrypted volumes."}),"\n",(0,i.jsxs)(n.p,{children:["First, restore the corresponding secret of the image using the ",(0,i.jsx)(n.a,{href:"#restoring-a-backup-of-a-barbican-secret",children:"instructions above"}),".\nThe restored secret will receive a new ID in the form of a ",(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Universally_unique_identifier",children:"UUID"}),".\nNote down the ID of the restored secret and insert it in place of ",(0,i.jsx)(n.code,{children:"$SECRET_ID"})," in the command below."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack image create --file $IMAGE_FILE_PATH \\\n    --property cinder_encryption_key_id=$SECRET_ID \\\n    --property cinder_encryption_key_deletion_policy=on_image_deletion \\\n    $IMAGE_NAME\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"cinder_encryption_key_deletion_policy"})," attribute is optional.\nIf not specified, the referenced secret will not be deleted on image deletion automatically.\nIn contrast, if set to ",(0,i.jsx)(n.code,{children:"on_image_deletion"}),", the referenced secret will be deleted as soon as the image referencing it is deleted."]}),"\n",(0,i.jsx)(n.h3,{id:"restoring-a-volume-backup-from-an-image",children:"Restoring a volume backup from an image"}),"\n",(0,i.jsx)(n.p,{children:"To restore a volume from an image backup, simply use the volume creation action and specify the image as source."}),"\n",(0,i.jsxs)(n.p,{children:["Depending on whether the original volume the image was created from was encrypted or not, the target volume type might need to be specified accordingly.\nWhether this is the case can be identified by inspecting the image's metadata using ",(0,i.jsx)(n.code,{children:"openstack image show $IMAGE_NAME_OR_ID"}),' and looking for a "cinder_encryption_key_id" field within "properties".\nIf it exists, the source volume of the image was encrypted.']}),"\n",(0,i.jsx)(n.p,{children:"To restore the image of an unencrypted volume:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume create --image $IMAGE_NAME_OR_ID \\\n    --size $VOLUME_SIZE_IN_GB $VOLUME_NAME\n"})}),"\n",(0,i.jsx)(n.p,{children:"To restore the image of an encrypted volume:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume create --image $IMAGE_NAME_OR_ID \\\n    --type $ENCRYPTED_VOLUME_TYPE \\\n    --size $VOLUME_SIZE_IN_GB $VOLUME_NAME\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If restoring an encrypted image, make sure to specify ",(0,i.jsx)(n.code,{children:"$ENCRYPTED_VOLUME_TYPE"})," correctly and have it reference a volume type which also supports the encryption.\nOtherwise the volume will be unbootable or unusable by Nova instances."]}),"\n",(0,i.jsx)(n.h3,{id:"restoring-a-volume-backup-from-the-cinder-backup-service",children:"Restoring a volume backup from the Cinder Backup service"}),"\n",(0,i.jsx)(n.p,{children:"The Cinder Backup service offers dedicated API actions and commands for restoring volume backups created using the service.\nThese backups can be restored in one of two ways:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Letting the Cinder Backup service create a new volume based on the backup."}),"\n",(0,i.jsx)(n.li,{children:"Overwriting an existing volume with the backup data."}),"\n"]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["If the volume backup was originally created from a volume that used a non-default encrypted volume type, letting Cinder Backup create a new volume for backup restoration does not work and the volume type must match exactly.\nIn such case provision an empty volume with the correct type first and then restore the backup onto it ",(0,i.jsx)(n.a,{href:"#restoring-an-encrypted-volume-backup-cinder-backup",children:"as explained further down"}),"."]})}),"\n",(0,i.jsx)(n.h4,{id:"restoring-to-a-new-volume-cinder-backup",children:"Restoring to a new volume (Cinder Backup)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume backup restore $BACKUP_NAME_OR_ID $TARGET_NAME\n"})}),"\n",(0,i.jsxs)(n.p,{children:["... where ",(0,i.jsx)(n.code,{children:"$TARGET_NAME"})," is the desired name of the new volume to be created.\nMake sure that no volume with this name already exists.\nThe Cinder Backup service will create the volume with the same size as the backup indicates."]}),"\n",(0,i.jsx)(n.h4,{id:"restoring-on-an-existing-volume-cinder-backup",children:"Restoring on an existing volume (Cinder Backup)"}),"\n",(0,i.jsx)(n.p,{children:"As an alternative to creating a new volume as the restore target, the backup can also be restored on an existing volume:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume backup restore --force $BACKUP_NAME_OR_ID $VOLUME_NAME_OR_ID\n"})}),"\n",(0,i.jsx)(n.p,{children:"... which will overwrite the data on the existing volume, regardless of whether it is empty or not!"}),"\n",(0,i.jsx)(n.p,{children:'The volume will enter the "restoring-backup" state temporarily and will return to the "available" state again once the restore process has finished.'}),"\n",(0,i.jsx)(n.h4,{id:"restoring-an-encrypted-volume-backup-cinder-backup",children:"Restoring an encrypted volume backup (Cinder Backup)"}),"\n",(0,i.jsx)(n.p,{children:'When restoring a volume backup of a volume that was using a non-default encrypted volume type, a new volume of that type needs to be created first and then the backup restored onto it.\nOtherwise, the restoration will fail with the target volume ending up in the "error_restoring" state.\nFor this procedure to succeed it is necessary to know the exact volume type of the volume the backup was created from.'}),"\n",(0,i.jsxs)(n.p,{children:["If the source volume of the backup still exists, the original volume type can be determined by inspecting the backup's ",(0,i.jsx)(n.code,{children:"volume_id"})," attribute and then using it to look up the corresponding volume and its ",(0,i.jsx)(n.code,{children:"type"})," attribute.\nThe following client command can be used for this (fill in the value for ",(0,i.jsx)(n.code,{children:"BACKUP_ID"}),"):"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'export BACKUP_ID=...\n\nSOURCE_VOLUME_ID="$(openstack volume backup show $BACKUP_ID -f value -c volume_id)"\nopenstack volume show -f value -c type "$SOURCE_VOLUME_ID"\n'})}),"\n",(0,i.jsx)(n.p,{children:"This returns the name of the original volume type.\nIf the source volume does not exist anymore, rely on documentation about the backup to determine the type, if available."}),"\n",(0,i.jsxs)(n.p,{children:["First, create a new empty volume as the restore target and use the backup's ",(0,i.jsx)(n.code,{children:"size"})," metadata attribute to match the size of the volume to the backup:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume create --size $BACKUP_SIZE --type $VOLUME_TYPE $TARGET_NAME\n"})}),"\n",(0,i.jsxs)(n.p,{children:["... where ",(0,i.jsx)(n.code,{children:"$TARGET_NAME"})," is the desired name of the new volume."]}),"\n",(0,i.jsx)(n.p,{children:'Once the volume reaches "available" state, restore the backup onto it:'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack volume backup restore --force $BACKUP_NAME_OR_ID $TARGET_NAME\n"})}),"\n",(0,i.jsx)(n.p,{children:'The volume will enter the "restoring-backup" state temporarily and will return to the "available" state again once the restore process has finished.'}),"\n",(0,i.jsx)(n.h2,{id:"appendix",children:"Appendix"}),"\n",(0,i.jsx)(n.h3,{id:"image-creation-action-for-servers-with-attached-volumes",children:"Image creation action for servers with attached volumes"}),"\n",(0,i.jsxs)(n.p,{children:["When the ",(0,i.jsx)(n.code,{children:"createImage"})," action of the Compute API (",(0,i.jsx)(n.code,{children:"openstack server image create"}),") is used on virtual machines that have at least one volume attached, a snapshot will be created for each attached volume individually and referenced in the resulting image's metadata."]}),"\n",(0,i.jsx)(n.p,{children:"This happens regardless of whether the virtual machine has an Ephemeral Storage disk attached.\nIn case of an Ephemeral Storage disk, only the Ephemeral Storage is copied into the Glance image as a 1:1 copy."}),"\n",(0,i.jsxs)(n.p,{children:["In case of a virtual machine that has no Ephemeral Storage but only volumes, the ",(0,i.jsx)(n.code,{children:"createImage"})," action leads to a Glance image that only consists of metadata (including the resulting volume snapshot references) but carries no actual binary data."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Figure: createImage action flow involving Ephemeral Storage and/or volumes",src:a(4844).Z+"",width:"1342",height:"1202"})}),"\n",(0,i.jsx)(n.h3,{id:"luks-encryption-key-conversion-to-decrypt-volume-images",children:"LUKS encryption key conversion to decrypt volume images"}),"\n",(0,i.jsx)(n.p,{children:"The volume encryption keys stored in Barbican are not directly used as LUKS passphrases by OpenStack because they are in binary format.\nOpenStack converts them to ASCII internally before passing them to the encryption layer.\nThis behavior needs to be reproduced if a decryption of a volume image is desired outside of OpenStack."}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsx)(n.p,{children:"The instructions below will expose plaintext data of encryption keys and encrypted volume images.\nMake sure to only execute these steps in a secure and trusted environment."})}),"\n",(0,i.jsx)(n.p,{children:"First, download the image:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"openstack image save --file image.raw $IMAGE_NAME_OR_ID\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Next, inspect the image metadata, determine the reference to the encryption key (",(0,i.jsx)(n.code,{children:"cinder_encryption_key_id"})," property) and download the encryption key:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'openstack image show -f value -c properties $IMAGE_NAME_OR_ID\n# (use the value of `cinder_encryption_key_id` as `$SECRET_ID` below)\nopenstack secret get --file image.key --payload_content_type "application/octet-stream" $SECRET_ID\n'})}),"\n",(0,i.jsx)(n.p,{children:"This will result in the following local files:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"image.raw"})," = the raw encrypted image downloaded from Glance"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"image.key"})," = the LUKS encryption key in binary format (plaintext)"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Since OpenStack internally uses Python's ",(0,i.jsx)(n.code,{children:"binascii.hexlify()"})," to convert the binary encryption key before passing it as a passphrase to the LUKS encryption, as a last step this conversion must be mimicked to unlock the encryption:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"python3 -c \"import binascii; \\\n    f = open('image.key', 'rb'); \\\n    print(binascii.hexlify(f.read()).decode('utf-8'))\" \\\n    | sudo cryptsetup luksOpen ./image.raw decrypted_image\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The decrypted image is now accessible at ",(0,i.jsx)(n.code,{children:"/dev/mapper/decrypted_image"}),".\nNote that this is a live en-/decryption operation on the ",(0,i.jsx)(n.code,{children:"image.raw"})," file.\nThe image is not converted, the encryption is simply unlocked in-memory using LUKS and dm-crypt until the encryption is closed again."]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"/dev/mapper/decrypted_image"})," can now be handled like a raw block device (e.g. mounted as a filesystem) or snapshotted in decrypted form."]}),"\n",(0,i.jsx)(n.p,{children:"To close the encryption execute:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"sudo cryptsetup luksClose decrypted_image\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["The source of this document can be found in the ",(0,i.jsx)(n.a,{href:"https://raw.githubusercontent.com/SovereignCloudStack/docs/main/docs/02-iaas/guides/user-guide/user-data-backups.md",children:"SovereignCloudStack/docs"})," repository."]})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},4844:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/user_data_backups_figure1-988dbd55659509cc1ddc9f68f2437648.png"},1151:(e,n,a)=>{a.d(n,{Z:()=>c,a:()=>r});var i=a(7294);const t={},s=i.createContext(t);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);