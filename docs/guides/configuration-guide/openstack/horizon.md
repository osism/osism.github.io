---
sidebar_label: Horizon
---

# Horizon

* [Horizon admin guide](https://docs.openstack.org/horizon/latest/admin/index.html)
* [Horizon configuration guide](https://docs.openstack.org/horizon/latest/configuration/index.html)
* [Horizon configuration reference](https://docs.openstack.org/horizon/latest/configuration/settings.html)

## Problems uploading machine images larger than 1 GiB

By default, the `LimitRequestBody` is set to `1073741824` (1 GiB).
This is a security feature ([CVE-2022-29404](https://access.redhat.com/security/cve/CVE-2022-29404))
and not a bug. Further details in the
[A new default for the LimitRequestBody directive in httpd configuration](https://access.redhat.com/articles/6975397)
article in the RedHat knowledgebase.

This limit can be increased via the parameter `horizon_httpd_limitrequestbody`.

```yaml title="environments/kolla/configuration.yml"
horizon_httpd_limitrequestbody: 2147483648  # 2 GiB
```
