---
sidebar_label: Tuned
---

# Tuned

The roller can be applied with `osism apply tuned`. The role is applied to all
compute nodes by default. This can be changed via the `hosts_tuned` parameter.

The profile to be used can be set via `tuned_profile`. By default, `virtual-host`
is used.

The following profiles are available:

| Profile                  | Description                                                                                                                   |
|:-------------------------|:------------------------------------------------------------------------------------------------------------------------------|
| accelerator-performance  | Throughput performance based tuning with disabled higher latency STOP states                                                  |
| atomic-guest             | Optimize virtual guests based on the Atomic variant                                                                           |
| atomic-host              | Optimize bare metal systems running the Atomic variant                                                                        |
| balanced                 | General non-specialized tuned profile                                                                                         |
| cpu-partitioning         | Optimize for CPU partitioning                                                                                                 |
| default                  | Legacy default tuned profile                                                                                                  |
| desktop                  | Optimize for the desktop use-case                                                                                             |
| desktop-powersave        | Optimize for the desktop use-case with power saving                                                                           |
| enterprise-storage       | Legacy profile for RHEL6, for RHEL7, please use throughput-performance profile                                                |
| hpc-compute              | Optimize for HPC compute workloads                                                                                            |
| intel-sst                | Configure for Intel Speed Select Base Frequency                                                                               |
| laptop-ac-powersave      | Optimize for laptop with power savings                                                                                        |
| laptop-battery-powersave | Optimize laptop profile with more aggressive power saving                                                                     |
| latency-performance      | Optimize for deterministic performance at the cost of increased power consumption                                             |
| mssql                    | Optimize for MS SQL Server                                                                                                    |
| network-latency          | Optimize for deterministic performance at the cost of increased power consumption, focused on low latency network performance |
| network-throughput       | Optimize for streaming network throughput, generally only necessary on older CPUs or 40G+ networks                            |
| optimize-serial-console  | Optimize for serial console use.                                                                                              |
| oracle                   | Optimize for Oracle RDBMS                                                                                                     |
| postgresql               | Optimize for PostgreSQL server                                                                                                |
| powersave                | Optimize for low power consumption                                                                                            |
| realtime                 | Optimize for realtime workloads                                                                                               |
| sap-hana                 | Optimize for SAP HANA                                                                                                         |
| sap-netweaver            | Optimize for SAP NetWeaver                                                                                                    |
| server-powersave         | Optimize for server power savings                                                                                             |
| spectrumscale-ece        | Optimized for Spectrum Scale Erasure Code Edition Servers                                                                     |
| spindown-disk            | Optimize for power saving by spinning-down rotational disks                                                                   |
| throughput-performance   | Broadly applicable tuning that provides excellent performance across a variety of common server workloads                     |
| virtual-guest            | Optimize for running inside a virtual guest                                                                                   |
| virtual-host             | Optimize for running KVM guests                                                                                               |
