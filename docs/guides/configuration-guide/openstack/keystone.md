---
sidebar_label: Keystone
---

# Keystone

* [Keystone admin guide](https://docs.openstack.org/keystone/latest/admin/index.html)
* [Keystone configuration reference](https://docs.openstack.org/keystone/latest/configuration/index.html)

## Domain manager role

**This policy is currently still in draft status. Its use in production is currently not recommended.**

| SCS Standard Track                               | SCS Standard                                                                                                        | SCS Documentation                                                                                                  |
|:-------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------|
| [IAM](https://docs.scs.community/standards/iam/) | [scs-0302](https://github.com/SovereignCloudStack/standards/blob/main/Standards/scs-0302-v1-domain-manager-role.md) | [Domain Manager configuration for Keystone](https://docs.scs.community/standards/scs-0302-v1-domain-manager-role/) |

To configure and use the domain manager role from the SCS project, the
`environments/kolla/files/overlays/keystone/policy.yaml` file is created
in the configuration repository. The deployment and upgrade of the Keystone
service itself is then done as usual.

```yaml title="environments/kolla/files/overlays/keystone/policy.yaml"
---
# SCS Domain Manager policy configuration

# Section A: OpenStack base definitions
# The entries beginning with "base_<rule>" should be exact copies of the
# default "identity:<rule>" definitions for the target OpenStack release.
# They will be extended upon for the domain manager role below this section.
"base_get_domain": "(role:reader and system_scope:all) or token.domain.id:%(target.domain.id)s or token.project.domain.id:%(target.domain.id)s"
"base_list_domains": "(role:reader and system_scope:all)"
"base_list_roles": "(role:reader and system_scope:all)"
"base_get_role": "(role:reader and system_scope:all)"
"base_list_users": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.domain_id)s)"
"base_get_user": "(role:reader and system_scope:all) or (role:reader and token.domain.id:%(target.user.domain_id)s) or user_id:%(target.user.id)s"
"base_create_user": "(role:admin and system_scope:all) or (role:admin and token.domain.id:%(target.user.domain_id)s)"
"base_update_user": "(role:admin and system_scope:all) or (role:admin and token.domain.id:%(target.user.domain_id)s)"
"base_delete_user": "(role:admin and system_scope:all) or (role:admin and token.domain.id:%(target.user.domain_id)s)"
"base_list_projects": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.domain_id)s)"
"base_get_project": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.project.domain_id)s) or project_id:%(target.project.id)s"
"base_create_project": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s)"
"base_update_project": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s)"
"base_delete_project": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.project.domain_id)s)"
"base_list_user_projects": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.user.domain_id)s) or user_id:%(target.user.id)s"
"base_check_grant": "(role:reader and system_scope:all) or ((role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)) and (domain_id:%(target.role.domain_id)s or None:%(target.role.domain_id)s)"
"base_list_grants": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)"
"base_create_grant": "(role:admin and system_scope:all) or ((role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)) and (domain_id:%(target.role.domain_id)s or None:%(target.role.domain_id)s)"
"base_revoke_grant": "(role:admin and system_scope:all) or ((role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.user.domain_id)s and domain_id:%(target.domain.id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.project.domain_id)s) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.domain.id)s)) and (domain_id:%(target.role.domain_id)s or None:%(target.role.domain_id)s)"
"base_list_role_assignments": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.domain_id)s)"
"base_list_groups": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s)"
"base_get_group": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s)"
"base_create_group": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s)"
"base_update_group": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s)"
"base_delete_group": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s)"
"base_list_groups_for_user": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.user.domain_id)s) or user_id:%(user_id)s"
"base_list_users_in_group": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s)"
"base_remove_user_from_group": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.user.domain_id)s)"
"base_check_user_in_group": "(role:reader and system_scope:all) or (role:reader and domain_id:%(target.group.domain_id)s and domain_id:%(target.user.domain_id)s)"
"base_add_user_to_group": "(role:admin and system_scope:all) or (role:admin and domain_id:%(target.group.domain_id)s and domain_id:%(target.user.domain_id)s)"

# Section B: Domain Manager Extensions

# classify domain managers with a special role
"is_domain_manager": "role:manager"

# specify a rule that whitelists roles which domain admins are permitted
# to assign and revoke within their domain
"is_domain_managed_role": "'member':%(target.role.name)s or 'load-balancer_member':%(target.role.name)s or 'creator':%(target.role.name)s"

# allow domain admins to retrieve their own domain (does not need changes)
"identity:get_domain": "rule:base_get_domain or rule:admin_required"

# list_domains is needed for GET /v3/domains?name=... requests
# this is mandatory for things like
# `create user --domain $DOMAIN_NAME $USER_NAME` to correctly discover
# domains by name
"identity:list_domains": "rule:is_domain_manager or rule:base_list_domains or rule:admin_required"

# list_roles is needed for GET /v3/roles?name=... requests
# this is mandatory for things like `role add ... $ROLE_NAME`` to correctly
# discover roles by name
"identity:list_roles": "rule:is_domain_manager or rule:base_list_roles or rule:admin_required"

# get_role is needed for GET /v3/roles/{role_id} requests
# this is mandatory for the OpenStack SDK to properly process role assignments
# which are issued by role id instead of name
"identity:get_role": "(rule:is_domain_manager and rule:is_domain_managed_role) or rule:base_get_role or rule:admin_required"

# allow domain admins to manage users within their domain
"identity:list_users": "(rule:is_domain_manager and token.domain.id:%(target.domain_id)s) or rule:base_list_users or rule:admin_required"
"identity:get_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:base_get_user or rule:admin_required"
"identity:create_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:base_create_user or rule:admin_required"
"identity:update_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:base_update_user or rule:admin_required"
"identity:delete_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:base_delete_user or rule:admin_required"

# allow domain admins to manage projects within their domain
"identity:list_projects": "(rule:is_domain_manager and token.domain.id:%(target.domain_id)s) or rule:base_list_projects or rule:admin_required"
"identity:get_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:base_get_project or rule:admin_required"
"identity:create_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:base_create_project or rule:admin_required"
"identity:update_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:base_update_project or rule:admin_required"
"identity:delete_project": "(rule:is_domain_manager and token.domain.id:%(target.project.domain_id)s) or rule:base_delete_project or rule:admin_required"
"identity:list_user_projects": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:base_list_user_projects or rule:admin_required"

# allow domain managers to manage role assignments within their domain
# (restricted to specific roles by the 'is_domain_managed_role' rule)
#
# project-level role assignment to user within domain
"is_domain_user_project_grant": "token.domain.id:%(target.user.domain_id)s and token.domain.id:%(target.project.domain_id)s"
# project-level role assignment to group within domain
"is_domain_group_project_grant": "token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.project.domain_id)s"
# domain-level role assignment to group
"is_domain_level_group_grant": "token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.domain.id)s"
# domain-level role assignment to user
"is_domain_level_user_grant": "token.domain.id:%(target.user.domain_id)s and token.domain.id:%(target.domain.id)s"
"domain_manager_grant": "rule:is_domain_manager and (rule:is_domain_user_project_grant or rule:is_domain_group_project_grant or rule:is_domain_level_group_grant or rule:is_domain_level_user_grant)"
"identity:check_grant": "rule:domain_manager_grant or rule:base_check_grant or rule:admin_required"
"identity:list_grants": "rule:domain_manager_grant or rule:base_list_grants or rule:admin_required"
"identity:create_grant": "(rule:domain_manager_grant and rule:is_domain_managed_role) or rule:base_create_grant or rule:admin_required"
"identity:revoke_grant": "(rule:domain_manager_grant and rule:is_domain_managed_role) or rule:base_revoke_grant or rule:admin_required"
"identity:list_role_assignments": "(rule:is_domain_manager and token.domain.id:%(target.domain_id)s) or rule:base_list_role_assignments or rule:admin_required"


# allow domain managers to manage groups within their domain
"identity:list_groups": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or (role:reader and system_scope:all) or rule:base_list_groups or rule:admin_required"
"identity:get_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or (role:reader and system_scope:all) or rule:base_get_group or rule:admin_required"
"identity:create_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:base_create_group or rule:admin_required"
"identity:update_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:base_update_group or rule:admin_required"
"identity:delete_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:base_delete_group or rule:admin_required"
"identity:list_groups_for_user": "(rule:is_domain_manager and token.domain.id:%(target.user.domain_id)s) or rule:base_list_groups_for_user or rule:admin_required"
"identity:list_users_in_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s) or rule:base_list_users_in_group or rule:admin_required"
"identity:remove_user_from_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.user.domain_id)s) or rule:base_remove_user_from_group or rule:admin_required"
"identity:check_user_in_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.user.domain_id)s) or rule:base_check_user_in_group or rule:admin_required"
"identity:add_user_to_group": "(rule:is_domain_manager and token.domain.id:%(target.group.domain_id)s and token.domain.id:%(target.user.domain_id)s) or rule:base_add_user_to_group or rule:admin_required"
```

The role `manager` is created using the OpenStack CLI. Alternatively, the role can
be added using Ansible or other tools.

```console
$ openstack --os-cloud admin \
    role create \
    --or-show \
    --description "Domain Manager Role" \
    manager
+-------------+----------------------------------+
| Field       | Value                            |
+-------------+----------------------------------+
| description | Domain Manager Role              |
| domain_id   | None                             |
| id          | 9b7140bfe628468ab9b86b365f9ac4c2 |
| name        | manager                          |
| options     | {}                               |
+-------------+----------------------------------+
```

A user can then be made a domain manager for a particular domain by assigning this role.

```bash
openstack --os-cloud admin \
  role add \
  --user test \
  --domain test \
  manager
```

## OIDC Federation

With OpenID Connect (OIDC) federation, the users of a Keystone domain are not managed in Keystone.
They log in to an external identity provider (IdP) such as Keycloak, Microsoft Entra ID, Okta or Dex.
Keystone trusts this IdP, maps the claims of its tokens to a user in the domain and grants roles
through group memberships. This section explains how to attach a domain to an OIDC IdP. Keycloak is
used as the example IdP.

* [Keystone federation guide](https://docs.openstack.org/keystone/latest/admin/federation/configure_federation.html)
* [Keystone mapping combinations](https://docs.openstack.org/keystone/latest/admin/federation/mapping_combinations.html)
* [Kolla-Ansible federated identity](https://docs.openstack.org/kolla-ansible/latest/reference/shared-services/keystone-guide.html#federated-identity)
* [mod_auth_openidc configuration reference](https://github.com/OpenIDC/mod_auth_openidc/blob/master/auth_openidc.conf)

:::info

This section applies to OSISM 10 with OpenStack 2025.1. As of OpenStack 2025.2, Kolla-Ansible runs
Apache with mod_auth_openidc in a separate `keystone_httpd` container. As of OpenStack 2026.1, the
metadata files are processed as Jinja templates.

:::

### How it works

1. In Horizon, the user selects the IdP in the **Authenticate using** list.
2. Horizon redirects the browser to Keystone
   (`/v3/auth/OS-FEDERATION/identity_providers/<idp>/protocols/openid/websso`).
3. mod_auth_openidc, running in the Apache of the Keystone container, redirects the browser to the
   IdP. After the login, the IdP sends the browser back to `<Keystone public endpoint>/redirect_uri`
   (authorization code flow).
4. mod_auth_openidc validates the token of the IdP and passes its claims to Keystone as `HTTP_OIDC_*`
   variables, for example `HTTP_OIDC_ISS` or `HTTP_OIDC_PREFERRED_USERNAME`.
5. Keystone looks up the IdP by the issuer in `HTTP_OIDC_ISS`, applies the mapping of the IdP and
   creates or updates a federated user in the domain of the IdP.
6. Keystone passes an unscoped token back to Horizon. The user can then work in all projects that
   the mapped groups have access to.

The OpenStack CLI does not use a browser. It gets an access token from the IdP and presents it as
bearer token to `/v3/OS-FEDERATION/identity_providers/<idp>/protocols/openid/auth`. mod_auth_openidc
checks the signature of the access token against the keys of the IdP.

The following objects are involved in Keystone:

| Object                      | Example                                   | Created by                         |
|:----------------------------|:------------------------------------------|:-----------------------------------|
| Domain                      | `customer-a`                              | Kolla-Ansible (`openstack_domain`) |
| Identity provider           | `keycloak-customer-a`, remote ID = issuer | Kolla-Ansible                      |
| Mapping                     | `keycloak-customer-a`                     | Kolla-Ansible (JSON file)          |
| Federation protocol         | `openid`                                  | Kolla-Ansible                      |
| Groups and role assignments | `openstack-members`, `openstack-admins`   | Operator                           |

An identity provider belongs to exactly one domain. The domain of an identity provider cannot be
changed after it has been created. To attach several domains, use one identity provider per domain,
for example one Keycloak realm per domain. Never federate the `Default` domain. It contains the
`admin` user and the service users.

### Prerequisites

* TLS is enabled for the external endpoints (`kolla_enable_tls_external`, enabled by default in
  OSISM). The IdP sends the browser back to the public Keystone endpoint.
* The Keystone containers can reach the token endpoint and the JWKS endpoint of the IdP. If an HTTP
  proxy is required, see [Additional mod_auth_openidc options](#additional-mod_auth_openidc-options).
  If the IdP uses a certificate signed by a private CA, the CA must be known in the containers
  (see [Self-signed certificates](../loadbalancer.md#self-signed-certificates)).
* The secret `keystone_federation_openid_crypto_password` is set in `environments/kolla/secrets.yml`.
  Configuration repositories generated with the Cookiecutter contain it. If it is missing, generate a
  value with `pwgen 32` and add it with `make ansible_vault_edit FILE=environments/kolla/secrets.yml`.

The following values are used in the examples:

| Setting                             | Value                                            |
|:------------------------------------|:-------------------------------------------------|
| Keystone public endpoint            | `https://api.example.com:5000`                   |
| Horizon                             | `https://api.example.com`                        |
| Issuer of the Keycloak realm        | `https://keycloak.example.com/realms/customer-a` |
| Keycloak client                     | `keystone`                                       |
| Keystone domain                     | `customer-a`                                     |
| Keystone identity provider, mapping | `keycloak-customer-a`                            |

### Step 1: Register Keystone as a client of the IdP

In the Keycloak admin console of the realm `customer-a`:

1. Create a new client (**Clients** > **Create client**).

   * Client type: `OpenID Connect`
   * Client ID: `keystone`
   * Client authentication: `On` (confidential client)
   * Authentication flow: `Standard flow`
   * Valid redirect URIs: `https://api.example.com:5000/redirect_uri`

2. Copy the client secret from the **Credentials** tab of the client.

3. Add the group memberships of the users as claim `groups`. Open **Client scopes** >
   `keystone-dedicated` > **Configure a new mapper** > **Group Membership** and set:

   * Name and Token Claim Name: `groups`
   * Full group path: `Off`
   * Add to ID token, Add to access token, Add to userinfo: `On`

OSISM uses the authorization code flow (`keystone_federation_oidc_response_type: "code"`), so the
implicit flow is not needed. The only redirect URI is the public Keystone endpoint followed by
`/redirect_uri`. The WebSSO URLs of Keystone and Horizon are not redirect URIs of the client.

For other IdPs, register a confidential web application with the same redirect URI and add the
group memberships of the user as claim `groups` to the ID token and to the access token.

Determine the issuer of the IdP. The `identifier` of the identity provider must match the `iss`
claim character by character, including a trailing slash if there is one. Keycloak releases older
than 17 use the prefix `/auth` in their URLs.

```console
$ curl -s https://keycloak.example.com/realms/customer-a/.well-known/openid-configuration | jq -r .issuer
https://keycloak.example.com/realms/customer-a
```

### Step 2: Provide the IdP metadata

mod_auth_openidc gets the metadata and client credentials of every IdP from a metadata directory.
The files are placed in the configuration repository:

```text
environments/kolla/files/overlays/keystone/federation/oidc/
├── attribute_maps
│   └── keycloak-customer-a.json
└── metadata
    ├── keycloak.example.com%2Frealms%2Fcustomer-a.client
    ├── keycloak.example.com%2Frealms%2Fcustomer-a.conf
    └── keycloak.example.com%2Frealms%2Fcustomer-a.provider
```

The file names in `metadata` are the issuer without `https://` and without a trailing slash,
URL-encoded (`/` becomes `%2F`, `:` becomes `%3A`). All three files must exist for every IdP.

```bash
ISSUER=https://keycloak.example.com/realms/customer-a
DIR=environments/kolla/files/overlays/keystone/federation/oidc
NAME=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1].split("://", 1)[1].rstrip("/"), safe=""))' "$ISSUER")

mkdir -p "$DIR/metadata" "$DIR/attribute_maps"
curl -sf "$ISSUER/.well-known/openid-configuration" -o "$DIR/metadata/$NAME.provider"
echo '{}' > "$DIR/metadata/$NAME.conf"
```

* `.provider` is the discovery document of the IdP. If the IdP changes its endpoints, download the
  file again. The signing keys are fetched from the `jwks_uri` at runtime, so a key rotation at the
  IdP does not require a change.
* `.conf` overrides settings of mod_auth_openidc for this IdP. `{}` keeps the defaults. If the IdP
  enforces PKCE, use `{"pkce_method": "S256"}`.
* `.client` contains the client ID and the client secret from step 1.

```json title="environments/kolla/files/overlays/keystone/federation/oidc/metadata/keycloak.example.com%2Frealms%2Fcustomer-a.client"
{
  "client_id": "keystone",
  "client_secret": "CLIENT_SECRET_FROM_KEYCLOAK"
}
```

Encrypt the `.client` file with Ansible Vault. Ansible decrypts it when the file is copied to the
control nodes.

```bash
make ansible_vault_edit FILE="environments/kolla/files/overlays/keystone/federation/oidc/metadata/keycloak.example.com%2Frealms%2Fcustomer-a.client"
```

With OpenStack 2025.1, the metadata files are copied unchanged. Variables such as secrets from
`environments/kolla/secrets.yml` cannot be used in them.

### Step 3: Create the attribute mapping

The mapping defines how the claims of the IdP become a user and group memberships in Keystone.
Mapping the IdP groups to Keystone groups keeps the authorization in the IdP: adding a user to a
group in Keycloak grants the roles of the matching Keystone group.

```json title="environments/kolla/files/overlays/keystone/federation/oidc/attribute_maps/keycloak-customer-a.json"
[
  {
    "local": [
      {
        "user": {
          "id": "{0}",
          "name": "{1}",
          "type": "ephemeral"
        },
        "groups": "{2}",
        "domain": {
          "name": "customer-a"
        }
      }
    ],
    "remote": [
      {
        "type": "HTTP_OIDC_SUB"
      },
      {
        "type": "HTTP_OIDC_PREFERRED_USERNAME"
      },
      {
        "type": "HTTP_OIDC_GROUPS",
        "whitelist": [
          "openstack-admins",
          "openstack-members"
        ]
      }
    ]
  }
]
```

* The `remote` entries are the claims passed on by mod_auth_openidc: `HTTP_OIDC_` followed by the
  claim name in upper case. `{0}`, `{1}` and `{2}` refer to the values of these entries in order.
* `user.id` is taken from the `sub` claim, which does not change at the IdP. Without `id`, Keystone
  uses the user name as ID, and a renamed user at the IdP becomes a new user in Keystone.
* The users are ephemeral users. Keystone creates them in the domain of the identity provider
  (`customer-a`).
* The values of the `groups` claim are Keystone group names in the domain `customer-a`. Keystone
  expects multiple values separated by `;`, which is the Kolla-Ansible default of
  `keystone_federation_oidc_claim_delimiter`. Groups that do not exist in Keystone are ignored.
* `whitelist` limits the IdP groups that are passed to Keystone. All other groups of the user are
  ignored.
* A rule only matches if all `remote` claims are present. If a user has no groups at all, the token
  contains no `groups` claim and the login is rejected.

Instead of groups, the mapping can also create a project per user with direct role assignments.
These assignments stay in place when the user loses access at the IdP, so groups are the better
choice for most setups. See [Keystone mapping combinations](https://docs.openstack.org/keystone/latest/admin/federation/mapping_combinations.html)
for all options.

### Step 4: Configure Kolla-Ansible

```yaml title="environments/kolla/configuration.yml"
##########################################################
# keystone federation

enable_keystone_federation: true
keystone_enable_federation_openid: true

keystone_identity_providers:
  - name: "keycloak-customer-a"
    openstack_domain: "customer-a"
    protocol: "openid"
    identifier: "https://keycloak.example.com/realms/customer-a"
    public_name: "Customer A"
    attribute_mapping: "keycloak-customer-a"
    metadata_folder: "{{ node_custom_config }}/keystone/federation/oidc/metadata"

keystone_identity_mappings:
  - name: "keycloak-customer-a"
    file: "{{ node_custom_config }}/keystone/federation/oidc/attribute_maps/keycloak-customer-a.json"

# Validation of bearer tokens used by the OpenStack CLI
keystone_federation_oidc_jwks_uri: "https://keycloak.example.com/realms/customer-a/protocol/openid-connect/certs"

keystone_federation_oidc_forwarded_headers: "X-Forwarded-Proto"
```

* `enable_keystone_federation` and `keystone_enable_federation_openid` must be set explicitly as
  booleans. OSISM sets both to `false` by default.
* `name` is the name of the identity provider in Keystone. It is part of the federation URLs and is
  used as `identity_provider` in the `clouds.yaml` file.
* `openstack_domain` is the domain of the identity provider. Kolla-Ansible creates the domain if it
  does not exist.
* `identifier` is the issuer from step 1. It is registered as the remote ID of the identity provider.
* `public_name` is the label of the IdP in the **Authenticate using** list of Horizon.
* `metadata_folder` is the same directory for all IdPs.
* `keystone_federation_oidc_jwks_uri` is required for the OpenStack CLI. Without it, bearer tokens
  cannot be verified. The URL is the `jwks_uri` from the discovery document.
* `keystone_federation_oidc_forwarded_headers` makes mod_auth_openidc use the protocol from the
  `X-Forwarded-Proto` header that HAProxy sets. The variable `keystone_oidc_forward_header` from
  the OSISM defaults is not used by Kolla-Ansible and has no effect.

#### Additional mod_auth_openidc options

Further directives of mod_auth_openidc can be added with `keystone_federation_oidc_additional_options`,
for example an HTTP proxy for the connections to the IdP:

```yaml title="environments/kolla/configuration.yml"
keystone_federation_oidc_additional_options:
  OIDCOutgoingProxy: "http://proxy.example.com:3128"
```

### Step 5: Apply the configuration

```bash
osism apply -a reconfigure loadbalancer
osism apply -a reconfigure keystone
osism apply -a reconfigure horizon
```

If Skyline is used, also run `osism apply -a reconfigure skyline`.

* `loadbalancer` switches the Keystone backends in HAProxy to `balance source`, so that all
  requests of a login reach the same Keystone container.
* `keystone` configures mod_auth_openidc, copies the metadata and mapping files and registers the
  domain, the mapping, the identity provider and the federation protocol in Keystone.
* `horizon` enables WebSSO and adds the IdP to the **Authenticate using** list.

After changing the mapping or the metadata files, run `osism apply -a reconfigure keystone` again.
`osism apply -a upgrade keystone` does not register identity providers and mappings.

### Step 6: Create groups and assign roles

Kolla-Ansible does not create groups or role assignments. Create a Keystone group in the domain for
every IdP group listed in the mapping and assign roles to it.

```bash
openstack --os-cloud admin group create --domain customer-a openstack-members
openstack --os-cloud admin group create --domain customer-a openstack-admins
openstack --os-cloud admin project create --domain customer-a project-a

openstack --os-cloud admin role add \
  --group openstack-members --group-domain customer-a \
  --project project-a --project-domain customer-a \
  member

openstack --os-cloud admin role add \
  --group openstack-admins --group-domain customer-a \
  --domain customer-a \
  manager
```

The members of `openstack-admins` get the `manager` role on the domain and can manage projects and
role assignments in the domain themselves (see [Domain manager role](#domain-manager-role)). To give
a group access to all projects of the domain, assign the role on the domain with `--inherited`.

### Step 7: Verify the configuration

Check the objects registered in Keystone:

```bash
openstack --os-cloud admin identity provider show keycloak-customer-a
openstack --os-cloud admin mapping show keycloak-customer-a
openstack --os-cloud admin federation protocol list --identity-provider keycloak-customer-a
```

Test the mapping without a login. Run the following commands on a control node. The input file
contains one claim per line in the form `NAME: value`.

```bash
cat > /tmp/assertion.txt <<EOF
HTTP_OIDC_SUB: 0b5d4c1e-2d8f-4a4c-9f8b-2c1e0d6f7a11
HTTP_OIDC_PREFERRED_USERNAME: alice
HTTP_OIDC_GROUPS: openstack-members;other-group
EOF

docker cp /tmp/assertion.txt keystone:/tmp/assertion.txt
docker exec keystone keystone-manage mapping_engine \
  --rules /var/lib/kolla/config_files/federation/oidc/attribute_maps/keycloak-customer-a.json \
  --input /tmp/assertion.txt
```

Then log in to Horizon, select `Customer A` in the **Authenticate using** list and log in to
Keycloak. After the first login, the federated user is listed in the domain:

```bash
openstack --os-cloud admin user list --domain customer-a
```

### Step 8: Use the OpenStack CLI

The OpenStack CLI supports several OIDC flows. The device authorization flow works without passing
passwords to the CLI and supports multi-factor authentication at the IdP. For the CLI, create a
second client in Keycloak:

* Client ID: `openstack-cli`
* Client authentication: `Off` (public client)
* Authentication flow: only `OAuth 2.0 Device Authorization Grant`
* Add the same **Group Membership** mapper as for the client `keystone`.

```yaml title="clouds.yaml"
clouds:
  customer-a:
    auth_type: v3oidcdeviceauthz
    auth:
      auth_url: https://api.example.com:5000/v3
      identity_provider: keycloak-customer-a
      protocol: openid
      client_id: openstack-cli
      discovery_endpoint: https://keycloak.example.com/realms/customer-a/.well-known/openid-configuration
      project_name: project-a
      project_domain_name: customer-a
    identity_api_version: 3
```

```bash
openstack --os-cloud customer-a token issue
```

The CLI prints a URL and a code. Open the URL in a browser, enter the code and log in. The device
authorization flow requires keystoneauth1 5.11.0 or later on the client.

Other plugins are `v3oidcpassword` (username and password, requires **Direct access grants** at the
client), `v3oidcclientcredentials` (service accounts) and `v3oidcaccesstoken` (an existing access
token).

:::warning

mod_auth_openidc accepts every access token that is signed with the keys from
`keystone_federation_oidc_jwks_uri`. The audience of the token is not checked. In Keycloak, this
includes tokens issued for other clients of the same realm. Use a dedicated realm for OpenStack,
or add a condition on the `azp` claim (the client that requested the token) to the `remote` list
of the mapping:

```json
{
  "type": "HTTP_OIDC_AZP",
  "any_one_of": [
    "keystone",
    "openstack-cli"
  ]
}
```

A condition with `any_one_of` only checks the claim and does not change the numbering of `{0}`,
`{1}` and `{2}`.

:::

### Attach further domains

Add one entry per domain to `keystone_identity_providers` and `keystone_identity_mappings` and add
the metadata files of the new IdP to the same `metadata` directory. Each identity provider needs
its own issuer, because Keystone accepts a remote ID only once. With Keycloak, use one realm per
domain.

`keystone_federation_oidc_jwks_uri` accepts only one URL. With it, the CLI works for one IdP only.
To use the CLI with several IdPs, set `certificate_file` for every IdP instead. The file contains
the signing certificate of the IdP and must be named after the key ID (`kid`) from the `jwks_uri`,
for example `{{ node_custom_config }}/keystone/federation/oidc/<kid>.pem`. The certificate must be
replaced when the IdP rotates its signing key.

### Notes

* Removing an entry from `keystone_identity_providers` or `keystone_identity_mappings` does not
  delete it from Keystone. Use `openstack identity provider delete` and
  `openstack mapping delete`.
* Changing `openstack_domain` of an existing identity provider has no effect. Delete the identity
  provider in Keystone first and run `osism apply -a reconfigure keystone` again.
* Group memberships from the mapping are only valid for the lifetime of the token. When a user is
  removed from a group at the IdP, the change takes effect at the next login. Tokens that were
  already issued stay valid until they expire (`fernet_token_expiry`, 24 hours by default).
* Federated users that get their roles only through mapped groups cannot create application
  credentials. An authorization TTL on the identity provider keeps the group memberships for the
  given number of minutes after the last login:
  `openstack identity provider set --authorization-ttl 1440 keycloak-customer-a`. Application
  credentials of the user stop working when the memberships expire.
* Logging out of Horizon does not end the session at the IdP.
* Keystone only sends tokens to trusted dashboards. By default, these are `/auth/websso/` on
  `kolla_external_fqdn` and on the Horizon endpoint. If Horizon is reachable under another name,
  set `keystone_trusted_dashboards`. The entries must match exactly, including the trailing slash.

### Troubleshooting

The logs are located on the control nodes:

* `/var/log/kolla/keystone/keystone-apache-public-error.log` contains the messages of mod_auth_openidc.
* `/var/log/kolla/keystone/keystone.log` contains the messages of the mapping and the identity provider lookup.

| Error                                                                                | Cause                                                                                                                    |
|:-------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------|
| Keycloak shows `Invalid parameter: redirect_uri`                                     | The redirect URI of the client is not `https://api.example.com:5000/redirect_uri`.                                       |
| `Could not find Identity Provider identifier in environment`                         | mod_auth_openidc did not pass the issuer. Check the metadata file names and the Apache error log.                        |
| `Incoming identity provider identifier not included among the accepted identifiers.` | `identifier` does not match the `iss` claim exactly.                                                                     |
| `Could not map any federated user properties to identity values.`                    | No rule of the mapping matched, for example because the `groups` claim is missing. For the CLI, check the access token.  |
| Login works, but the user sees no projects                                           | The groups do not exist in the domain, the names do not match (Full group path), or the groups have no role assignments. |
| The CLI gets HTTP 401 from `/v3/OS-FEDERATION/.../auth`                              | `keystone_federation_oidc_jwks_uri` is not set, or the token was issued by another IdP.                                  |
