FROM node:22
WORKDIR /app
COPY . .
RUN npm i -g openapi-to-postmanv2
RUN node ./inject_before_import.js
RUN openapi2postmanv2 -s ./output/pre_inject.json -o ./output/export.json -p
CMD [ "node", "./inject_after_import.js" ]
