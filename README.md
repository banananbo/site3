# Docker Compose を使用した React + Kotlin Spring + MySQL プロジェクト

このプロジェクトは、Docker Compose を使用して React（フロントエンド）、Kotlin Spring Framework（バックエンド）、MySQL（データベース）の開発環境と本番環境を構築するテンプレートです。Traefik をリバースプロキシとして使用しています。

## プロジェクト構成

- **フロントエンド**: React
- **バックエンド**: Kotlin + Spring Framework
- **データベース**: MySQL
- **DB管理ツール**: Adminer
- **リバースプロキシ**: Traefik

## 環境設定

### 開発環境

- フロントエンド: http://lvh.me
- バックエンドAPI: http://api.lvh.me
- DB管理ツール: http://adminer.lvh.me
- Traefik ダッシュボード: http://localhost:8080

### 本番環境

- フロントエンド: https://banananbo.com, https://www.banananbo.com
- バックエンドAPI: https://api.banananbo.com
- DB管理ツール: https://admin.banananbo.com
- Traefik ダッシュボード: https://traefik.banananbo.com (認証付き)

## 開始方法

### 開発環境

1. 環境変数ファイルを設定します。

```bash
cp .env.example .env
# 必要に応じて .env ファイルを編集
```

2. 開発モードでDockerコンテナを起動します。

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

3. ブラウザで以下のURLにアクセスします。
   - フロントエンド: http://lvh.me
   - バックエンドAPI: http://api.lvh.me
   - DB管理ツール: http://adminer.lvh.me
   - Traefik ダッシュボード: http://localhost:8080

### 本番環境

1. 環境変数ファイルを設定します。

```bash
cp .env.prod.example .env.prod
# 強力なパスワードや実際のメールアドレスなどを設定
vi .env.prod
```

2. Traefik用のACMEディレクトリを作成します。

```bash
mkdir -p traefik/acme
touch traefik/acme/acme.json
chmod 600 traefik/acme/acme.json
```

3. 本番モードでDockerコンテナを起動します。

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d
```

## Traefikについて

Traefikはモダンなリバースプロキシとロードバランサーで、以下のような利点があります：

- Docker統合による自動サービス検出
- Let's Encryptとの統合による自動SSL証明書管理
- シンプルなルーティング設定
- ダッシュボードによる監視

### トラブルシューティング

Traefikのログを確認するには：

```bash
docker-compose logs -f traefik
```

## 開発

### フロントエンド開発

フロントエンドのソースコードは `frontend` ディレクトリにあります。開発環境では、ホットリロードが有効になっているため、コードの変更はブラウザに即座に反映されます。

### バックエンド開発

バックエンドのソースコードは `backend` ディレクトリにあります。開発環境では、Gradle の連続ビルドが有効になっているため、コードの変更は自動的に再ロードされます。

### データベース

MySQL データベースは開発環境と本番環境で共通の設定を使用します。初期化スクリプトは `db/init` ディレクトリに配置されています。

## 本番環境へのデプロイ

### 事前準備

1. 環境変数ファイルを設定します

```bash
cp .env.prod.example .env.prod
# 強力なパスワードや実際のメールアドレスなどを設定
vi .env.prod
```

2. Traefik用のACMEディレクトリを作成

```bash
mkdir -p traefik/acme
touch traefik/acme/acme.json
chmod 600 traefik/acme/acme.json
```

### デプロイ

1. まずイメージをビルドします

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod build
```

2. 本番環境のコンテナを起動します

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d
```

### メンテナンス

更新時には以下のコマンドでサービスを再デプロイできます

```bash
# 全サービスの更新
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d

# 特定のサービスのみ更新（例：バックエンド）
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod build backend
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d backend
```

### バックアップ

データベースのバックアップを取得するには：

```bash
docker exec site3-db-1 mysqldump -u root -p"${DB_ROOT_PASSWORD}" app_db > backup_$(date +%Y%m%d).sql
``` 