FROM node:24-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev --ignore-scripts --no-audit --no-fund
COPY . .
RUN npm run build
USER node
EXPOSE 4321
# Preview statique uniquement : ne simule pas les Functions Netlify.
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
