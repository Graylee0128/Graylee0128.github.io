---
title: "GitOps FAQ: App Repo、Config Repo 與 Argo CD 怎麼串起來"
description: "用 devops-app 與 devops-config 拆解 GitHub Actions、GHCR、Kustomize、Argo CD 與 Kubernetes 的 GitOps 流程。"
pubDate: 2026-08-27
tags: ["GitOps", "ArgoCD", "Kubernetes", "GitHub Actions", "Kustomize"]
---

# GitOps FAQ: App Repo、Config Repo 與 Argo CD 怎麼串起來

## App Repo 與 Config Repo 分別負責什麼？

- **App Repo (`devops-app`)**：放 Go source code、tests、Dockerfile 與 GitHub Actions CI。
- **Config Repo (`devops-config`)**：放 Kubernetes manifests / Kustomize overlays，描述 Production 應該怎麼部署。

最簡單的理解：

- App Repo = **程式怎麼改**
- Config Repo = **Production 怎麼跑**

---

## App CI 做了什麼？

當 `devops-app/main` 有新的 push：

1. 執行 `go vet`、`go test`
2. Build container image
3. Push 到 GHCR，例如：

```text
ghcr.io/graylee0128/devops-app:<git-sha>
```

4. 用 `GITOPS_PAT` checkout `devops-config`
5. 執行：

```bash
kustomize edit set image \
  ghcr.io/graylee0128/devops-app=\
  ghcr.io/graylee0128/devops-app:<git-sha>
```

6. Commit 並 push Config Repo

因此 CI 不直接對 Kubernetes 執行 `kubectl apply`，而是只修改 GitOps desired state。

---

## `newTag: bootstrap` 是寫死的嗎？

不是。

例如 Config Repo 初始可能是：

```yaml
images:
  - name: ghcr.io/graylee0128/devops-app
    newTag: bootstrap
```

`bootstrap` 只是初始 placeholder。

App CI 成功 build 新 image 後，會用目前 App commit SHA 自動改寫：

```yaml
images:
  - name: ghcr.io/graylee0128/devops-app
    newTag: abc123...
```

所以 image name 大致固定，而 tag 會隨 App release 改變。

---

## PAT 為什麼放在 App Repo？

PAT 的用途是：

```text
App Repo GitHub Actions
        │
        │ GITOPS_PAT
        ▼
   Config Repo
```

因為 App CI 要跨 repo 寫入 `devops-config`，所以需要具有該 repo `Contents: Write` 權限的 fine-grained PAT。

PAT 不是給 Argo CD 使用的。

---

## Argo CD 怎麼監控 Config Repo？

Argo CD `Application` 會指定：

```yaml
source:
  repoURL: https://github.com/Graylee0128/devops-config.git
  targetRevision: main
  path: overlays/prod
```

Argo CD 持續比較：

```text
Git Desired State
        VS
Kubernetes Live State
```

如果兩邊不一樣，就會變成 `OutOfSync`。

若啟用 automated sync，Argo CD 會自動把 Kubernetes 調整回 Git 宣告的狀態。

---

## Config Repo 裡通常放什麼？

主要就是 deployment manifests，例如：

- Image：要跑哪個 container image / tag
- Replicas：要跑幾份 Pod
- Service：Pod 對內提供什麼穩定入口
- Ingress：外部 HTTP/HTTPS 流量怎麼進來
- Probe：startup / liveness / readiness health checks
- PDB：維護或 node drain 時至少保留多少 Pod
- Anti-Affinity：盡量把 replicas 分散到不同 Nodes
- Namespace：workload 放在哪個 Kubernetes 邏輯隔離空間

---

## 為什麼說 Config Repo 的 Git History 就是 Deployment History？

最簡單的說法：

> Config Repo 每一個 commit，都記錄「某個時間點 Production 應該長什麼樣子」。

例如：

```text
Commit A → image aaa111, replicas 3
Commit B → image bbb222, replicas 3
Commit C → image ccc333, replicas 5
```

因此 `git log` 不只是設定修改紀錄，也是在記錄 Production 部署狀態的演進。

這也是 GitOps rollback 很直觀的原因：如果新版有問題，只要把 Config Repo revert 到上一個正常狀態，Argo CD 就會把 Kubernetes reconcile 回去。

一句話記憶：

> **App Repo 的 Git history 記錄程式怎麼改；Config Repo 的 Git history 記錄 Production 怎麼改。**

---

## 整條 GitOps 流程怎麼記？

```text
Developer
   ↓ git push
App Repo
   ↓
GitHub Actions CI
   ├─ test
   ├─ build image
   ├─ push GHCR
   └─ update Config Repo image tag
          ↓
      Config Repo
          ↓
       Argo CD
          ↓ reconcile
      Kubernetes
          ↓
       New Pods
          ↓ pull image
         GHCR
```

核心責任分離：

- **CI**：Source Code → Artifact → 更新 GitOps desired state
- **Argo CD**：Config Repo → Reconcile → Kubernetes
