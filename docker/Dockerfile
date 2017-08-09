FROM node:alpine as build
ADD / /app
WORKDIR  /app
RUN pwd && ls -la
RUN npm install
RUN npm run compile
RUN npm prune --production

FROM node:alpine
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/out /app/out
COPY --from=build /app/resources /app/resources
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/LICENSE.md /app/LICENSE.md
ENV NODE_ENV=production
WORKDIR  /app
CMD node /app/out/index.js