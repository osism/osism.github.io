# K3s

[K3s](https://k3s.io/) is a lightweight Kubernetes distribution designed for
resource-constrained environments and edge computing. It is fully compliant with
upstream Kubernetes, while offering significant simplifications to reduce
operational overhead.

In OSISM contexts, K3s can serve as an alternative to full Kubernetes
distributions like Kubernetes with Magnum or RKE2. Its minimal footprint makes
it particularly suitable for testing, CI/CD runners, edge clusters, and
bootstrapping control-plane components for infrastructure management.

## K3s main features

- **Simple installation:** A small single binary with minimal setup. Swap out
  the binary, restart - no orchestration complexity.
- **Reduced attack surface:** By stripping non-essential plugins and embedding
  TLS certificate management by default, K3s minimizes exposed vectors
- **Less overhead**: Fewer components reduce complexity and operational friction
  in CI/CD pipelines and maintenance workflows.
- **Built-in components:** Includes core add-ons like Helm controller,
  containerd, Traefik (optional), and local storage provisioner.
- **Optimized for Edge:** Designed for low-resource environments and supports
  ARM, x86_64, and other CPU architectures.

K3s shines not because it's tiny, but because it breaks down Kubernetes
complexity. With K3s you can support **edge or remote clusters** where full
Kubernetes is not practical, uniform Kubernetes experience across environments,
and scale from dev to prod smoothly.

## Lifecycle Management of K3S in OSISM
