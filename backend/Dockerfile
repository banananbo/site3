FROM gradle:7.6.3-jdk17

WORKDIR /app

# gzipでAPIレスポンスを圧縮
ENV SPRING_CODEC_LOG_REQUEST_DETAILS=false

COPY . .

EXPOSE 8081

# 直接Gradleコマンドを使用
ENTRYPOINT ["gradle", "bootRun"] 