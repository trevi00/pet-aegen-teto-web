# ========================================
# Stage 1: Build React App
# ========================================
FROM node:22-alpine AS builder

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .

# 환경 변수 설정 (빌드 시 API URL)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ========================================
# Stage 2: Serve with Nginx
# ========================================
FROM nginxinc/nginx-unprivileged:alpine

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
