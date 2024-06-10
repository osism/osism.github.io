---
sidebar_label: Generate a clouds.yaml
---
# Generate a clouds.yaml 

If you have your openrc file from a dashboard, but you need those information at a clouds.yaml file,
this is easy to convert by using an editor or a script.

## Use an editor

Content of the openrc File from Horizon dashboard:
```sh title="admin-rc.sh"
#!/usr/bin/env bash
# To use an OpenStack cloud you need to authenticate against the Identity
# service named keystone, which returns a **Token** and **Service Catalog**.
# The catalog contains the endpoints for all services the user/tenant has
# access to - such as Compute, Image Service, Identity, Object Storage, Block
# Storage, and Networking (code-named nova, glance, keystone, swift,
# cinder, and neutron).
#
# *NOTE*: Using the 3 *Identity API* does not necessarily mean any other
# OpenStack API is version 3. For example, your cloud provider may implement
# Image API v1.1, Block Storage API v2, and Compute API v2.0. OS_AUTH_URL is
# only for the Identity API served through keystone.
export OS_AUTH_URL=https://identiyprodiver.your.cloud:5000/v3/
# With the addition of Keystone we have standardized on the term **project**
# as the entity that owns the resources.
export OS_PROJECT_ID=7942e314c60041cfaf28545e4714f3cb
export OS_PROJECT_NAME="myproject"
export OS_USER_DOMAIN_NAME="Default"
if [ -z "$OS_USER_DOMAIN_NAME" ]; then unset OS_USER_DOMAIN_NAME; fi
export OS_PROJECT_DOMAIN_ID="default"
if [ -z "$OS_PROJECT_DOMAIN_ID" ]; then unset OS_PROJECT_DOMAIN_ID; fi
# unset v2.0 items in case set
unset OS_TENANT_ID
unset OS_TENANT_NAME
# In addition to the owning entity (tenant), OpenStack stores the entity
# performing the action as the **user**.
export OS_USERNAME="my-user-name"
# With Keystone you pass the keystone password.
echo "Please enter your OpenStack Password for project $OS_PROJECT_NAME as user $OS_USERNAME: "
read -sr OS_PASSWORD_INPUT
export OS_PASSWORD=$OS_PASSWORD_INPUT
# If your configuration has multiple regions, we set that information here.
# OS_REGION_NAME is optional and only valid in certain environments.
export OS_REGION_NAME="eu-east2"
# Don't leave a blank variable, unset it if it was empty
if [ -z "$OS_REGION_NAME" ]; then unset OS_REGION_NAME; fi
export OS_INTERFACE=public
export OS_IDENTITY_API_VERSION=3%  
```

Now you need to create a clouds.yaml file, take care of the indentation, use spaces not tab, this important.

```yaml title="clouds.yaml"
clouds:
  cloudidentifier:
    auth:
      auth_url: <OS_AUTH_URL goes here> 
      password: <OS_PASSWORD goes here, if not set, enter you password here>
      project_domain_name: <OS_PROJECT_DOMAIN_NAME goes here>
      project_name: <OS_PROJECT_NAME goes here>
      user_domain_name: <OS_USER_DOMAIN_NAME goes here>
      username: <OS_USERNAME goes here>
   region_name: <OS_REGION_NAME goes here>
   identity_api_version: <OS_IDENTITY_API_VERSION goes here> 
   interface: <OS_INTERFACE goes here>
```

the final clouds.yaml for your openrc will then look like this one:

```yaml title="clouds.yaml"
clouds:
  mycluster:
    auth:
      auth_url: https://identiyprodiver.your.cloud:5000/v3/
      password: dsadfr3rqwfasdfasda
      project_domain_name: default
      project_name: myproject
      user_domain_name: Default
      username: my-user-name
   region_name: eu-east2
   identity_api_version: 3
   interface: public
```
## Use a script

### python

```python title="clouds.py"
import os
import yaml
 
clouds = {
   "clouds":{
    "mycluster": {
        "auth" : {
            "auth_url" : os.environ["OS_AUTH_URL"], 
            "project_name": os.environ["OS_PROJECT_NAME"],
            "project_domain_name": os.environ["OS_PROJECT_DOMAIN_NAME"],
            "username": os.environ["OS_USERNAME"],
            "user_domain_name": os.environ["OS_USER_DOMAIN_NAME"],
            "password": os.environ["OS_PASSWORD"],
        },
        "region_name": os.environ["OS_REGION_NAME"],
        "identity_api_version":  os.environ["OS_IDENTITY_API_VERSION"],
        "interface": "public" 
    }
    }
}
 
 
print (yaml.dump(clouds))
```
Source: [https://adam.younglogic.com/2022/03/generating-a-clouds-yaml-file](https://adam.younglogic.com/2022/03/generating-a-clouds-yaml-file)


First you need to source your openrc file so that the OS_ variables are available.

```
source /home/to/your/openrc-file
```

now you can execute the python script and a clouds.yaml will be written to your execution location.

```
python clouds.py > clouds.yaml
```

### bash

You need to point the **source** line to your openrc script location first, then execute the bash script.

```
#!/bin/bash

source /home/to/your/openrc-file

PROJECT_ID=$(openstack project list | grep $OS_PROJECT_NAME | awk '{print $2}')

cat << EOF > clouds.yaml
clouds:
  mycluster:
    auth:
      auth_url: $OS_AUTH_URL
      username: "$OS_USERNAME"
      password: "$OS_PASSWORD"
      project_name: "$OS_PROJECT_NAME"
      project_id: "$PROJECT_ID"
      user_domain_name: "$OS_USER_DOMAIN_NAME"
    region_name: "$OS_REGION_NAME"
    interface: "public"
    identity_api_version: $OS_IDENTITY_API_VERSION
EOF
```
Source: [https://andreaskaris.github.io/blog/openstack/using_clouds_yaml](https://andreaskaris.github.io/blog/openstack/using_clouds_yaml)

This will create the clouds.yaml file in your currect directory

## Using clouds.yaml

OpenStackClient looks for the  clouds.yaml in the following locations:

- current directory
- ~/.config/openstack
- /etc/openstack

With the openstack CLI, use the generated clouds.yaml by providing ```--os-cloud <cloud identifier>```:

```
openstack --os-cloud mycluster network list
```

