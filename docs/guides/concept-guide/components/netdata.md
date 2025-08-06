# Netdata

Netdata is a real-time, distributed monitoring and troubleshooting platform designed to provide instant visibility into system and application performance. It collects thousands of metrics per second with minimal overhead, offering high-resolution insights into infrastructure health without requiring complex configuration or dedicated storage backends.

Netdata is built for modern infrastructure monitoring, providing per-second granularity for all metrics, automated anomaly detection, and a powerful visualization interface that enables rapid troubleshooting and root cause analysis across distributed systems.

## Key Benefits of Netdata

* **Real-time Monitoring**: Collects and visualizes metrics with per-second granularity, providing immediate visibility into system behavior and performance changes.
* **Zero Configuration**: Automatically detects and monitors hundreds of applications and system components out of the box without manual configuration.
* **Low Overhead**: Highly optimized data collection with minimal CPU and memory footprint (typically < 2% CPU and < 100MB RAM per node).
* **Distributed Architecture**: Supports both standalone and parent-child configurations for scalable monitoring across large infrastructures.
* **ML-Powered Anomaly Detection**: Built-in machine learning algorithms automatically detect anomalies and unusual patterns without manual threshold configuration.
* **Comprehensive Coverage**: Monitors system resources, containers, VMs, applications, databases, web servers, and custom metrics through a unified interface.
* **Cloud Native Ready**: Native support for Kubernetes, Docker, and containerized environments with automatic service discovery.
* **Open Source**: Fully open source with an active community and no licensing costs for core functionality.

## Architecture and Components

### Core Components

Netdata's architecture consists of several key components that work together to provide comprehensive monitoring:

#### Netdata Agent
The primary data collection component that runs on each monitored node:
* **Collectors**: Modular plugins that gather metrics from various sources (system, applications, containers)
* **Database Engine**: Time-series database optimized for real-time metrics storage with automatic data retention management
* **Web Server**: Built-in web server providing the dashboard UI and API endpoints
* **Health Engine**: Processes health checks and triggers alerts based on configured thresholds
* **Streaming Engine**: Enables metric streaming between parent and child nodes

#### Netdata Cloud (Optional)
Centralized SaaS platform for unified monitoring across multiple Netdata agents:
* Provides aggregated views across all infrastructure
* Centralized alerting and notification management
* Team collaboration features and role-based access control
* No metric data storage - acts as a proxy to individual agents

### Data Collection Methods

Netdata supports multiple data collection approaches:

1. **Internal Collectors**: Native plugins written in C for maximum performance
   - System metrics (CPU, memory, disk, network)
   - Process monitoring
   - Container statistics

2. **External Collectors**: Python-based collectors for application-specific metrics
   - Database monitoring (MySQL, PostgreSQL, MongoDB, Redis)
   - Web server metrics (Apache, Nginx, HAProxy)
   - Message queues (RabbitMQ, Kafka)
   - Custom application metrics

3. **StatsD Integration**: Accept metrics from StatsD-compatible applications
4. **Prometheus Endpoints**: Scrape metrics from Prometheus exporters
5. **Custom Collectors**: User-defined collectors for proprietary applications
