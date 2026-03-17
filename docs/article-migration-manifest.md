# Article Migration Manifest

Source workspace: `../personal-blog/technical-articles`

This manifest records the content move into the Astro content collection. Article bodies were mechanically copied, then only frontmatter was added above the original first heading.

| Source | Target | Slug | Category | Status |
| --- | --- | --- | --- | --- |
| `aws-private-network-explained.md` | `src/content/blog/technical/aws-private-network-explained.md` | `aws-private-network-explained` | AWS | Published |
| `DNS在幹啥.md` | `src/content/blog/technical/dns-complete-guide.md` | `dns-complete-guide` | Networking | Published |
| `NAT 在雲端架構設計中的缺點.md` | `src/content/blog/technical/nat-cloud-architecture-drawbacks.md` | `nat-cloud-architecture-drawbacks` | AWS | Published |
| `內網是啥.md` | `src/content/blog/technical/private-network-direct-connect.md` | `private-network-direct-connect` | AWS | Published |
| `系統架構與組織結構.md` | `src/content/blog/technical/architecture-organization-structure.md` | `architecture-organization-structure` | Systems Architecture | Published |
| `網路安全嗎.md` | `src/content/blog/technical/network-security-zero-trust.md` | `network-security-zero-trust` | Security | Published |

Internal references retained in `docs/`:

| Source | Target |
| --- | --- |
| `../personal-blog/technical-articles/README.md` | `docs/personal-blog-technical-articles.md` |
| `../personal-blog/plan.md` | `docs/personal-blog-astro-plan.md` |
