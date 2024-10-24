---
sidebar_label: Rookify (technical preview)
---

# Use Rookify: Migrate to Rook from Ceph Ansible (Technical Preview)

:::warning

Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_.
Nevertheless, it is **strongly advised** to test Rookify in a controlled environment first, such as the [OSISM testbed](https://github.com/osism/testbed). Additionally, ensure that precautionary backups are made, and all other necessary safety measures are in place.

:::

For a condensed summary of the information covered here, refer to the [Rookify GitHub repository](https://github.com/SovereignCloudStack/rookify).

## Consider Using a Pickle File

To track the migration, you can add a pickle file. Specify this option in the `config.yaml`:

```yaml title="config.example.yaml"
general:
  machine_pickle_file: data.pickle
```

You can then view the migration progress by running `rookify --show-state`.

:::warning
    Rookify treats the pickle file as a source of truth for its operations. If you want to start a clean migration, ensure you delete the file first.
:::

## Rookify CLI

### Run

:::note
    By default, Rookify runs in preflight mode (`--dry-run`).
:::

Rookify runs in preflight mode by default, meaning it performs all preflight checks on the modules and their dependent modules, as configured in `config.yaml`, without executing the migration.

### --dry-run

:::tip
    Run preflight-mode to ensure Rookify can connect to your target systems.
:::

Rookify's `preflight-mode` allows you to verify that basic commands and connections to the target systems are functioning correctly. Running `--dry-run` mode ensures no migration processes are executed.

### --help

Run `rookify --help` to view the various CLI options available.

### --show

Run `--show` to display the status of your migration process. Note that if you specified  a pickle file, Rookify will use it to determine the state of migration.

## Debugging and Testing

If you encounter issues with Rookify, you can start by setting the logging level to `DEBUG`.
If further troubleshooting is needed, you can run the tests included in the Rookify code.

### Set logging to debug level

Edit the `config.yaml` and set the logging level to "DEBUG":

```yaml title="config.example.yaml"
logging:
  level: DEBUG
  format:
    time: "%Y-%m-%d %H:%M.%S" # other example: "iso"
    renderer: console # or: json
```

You can also customize other formatting options, as shown in the comments. For more details, refer to the [structlog](https://www.structlog.org/en/stable/standard-library.html).

### Run tests

To run tests on Rookify, ensure you have access to the Rookify code on your system. Then:

1. Run `make run-tests-locally` from the working directory of the Rookify repository. If you prefer a containerized setup, use `make run-tests`.
2. Alternatively, run `.venv/bin/python -m pytest` from the virtual environment of your installation.
