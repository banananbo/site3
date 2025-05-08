# プロジェクトアーキテクチャ

## 概要

このプロジェクトはDocker Composeを使用して、ローカル開発環境と本番環境を同一構成で構築します。システムは以下のコンポーネントで構成されています：

- **フロントエンド**: React
- **バックエンド**: Kotlin + Spring Framework
- **データベース**: MySQL
- **DB管理ツール**: Adminer
- **リバースプロキシ**: Traefik

## システム構成図

```
                          ┌─────────────────┐
                          │                 │
                          │     Traefik     │
                          │ (リバースプロキシ) │
                          │                 │
                          └─────────┬───────┘
                                    │
                 ┌─────────────────┬┴──────────────────┐
                 │                 │                   │
                 ▼                 ▼                   ▼
        ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
        │                 │ │                 │ │                 │
        │   フロントエンド   │ │    バックエンド   │ │     Adminer     │
        │    (React)      │ │(Kotlin+Spring) │ │                 │
        │                 │ │                 │ │                 │
        └─────────────────┘ └────────┬────────┘ └─────────────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │                 │
                            │    データベース   │
                            │    (MySQL)     │
                            │                 │
                            └─────────────────┘
```

## 環境設定

- **開発環境**: 
  - フロントエンド: lvh.me
  - バックエンドAPI: api.lvh.me
  - Adminer: adminer.lvh.me
  - Traefik ダッシュボード: localhost:8080

- **本番環境**: 
  - フロントエンド: banananbo.com, www.banananbo.com
  - バックエンドAPI: api.banananbo.com
  - Adminer: admin.banananbo.com
  - Traefik ダッシュボード: traefik.banananbo.com (認証付き)

## ディレクトリ構造

```
/
├── docker-compose.yml         # 共通Docker Compose設定
├── docker-compose.dev.yml     # 開発環境固有の設定
├── docker-compose.prod.yml    # 本番環境固有の設定
├── frontend/                  # Reactフロントエンドコード
├── backend/                   # Kotlin+Springバックエンドコード
├── db/                        # データベース初期化スクリプト
├── traefik/                   # Traefik設定ファイル
│   ├── traefik.yml           # 静的設定
│   ├── dynamic_conf.yml      # 動的設定
│   └── acme/                 # SSL証明書（本番環境）
└── docs/                      # プロジェクトドキュメント
``` 