FROM node:18-alpine

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ホットリロード用にボリュームマウントするため、残りのファイルはコンテナ起動時にマウントされる

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"] 