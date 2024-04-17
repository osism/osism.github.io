---
sidebar_label: Infrastructure
---

# Infrastructure

## Open Search

### Get all indices

```
$ curl https://api-int.testbed.osism.xyz:9200/_cat/indices?v
health status index                          uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   flog-2024.04.17                1rCP3NpUQSS5wmulCn6Y5g   1   1    1657832            0        1gb        654.4mb
green  open   .opensearch-observability      UnS2gFb-QhC8oIefL3C52Q   1   2          0            0       624b           208b
green  open   .plugins-ml-config             hMdzW6ooRMGZ_0OGcdNSgA   1   1          1            0      7.8kb          3.9kb
green  open   .opendistro-job-scheduler-lock fa_Io8bJQ8qfGII4DypxFg   1   1          1            3     51.1kb         35.1kb
green  open   .kibana_1                      v-aJ6ioSQsOwHQn_NNbeOg   1   1          0            0       416b           208b
```

### Delete an index

```
$ curl -X DELETE https://api-int.testbed.osism.xyz:9200/flog-2024.04.17
{"acknowledged":true}
```
