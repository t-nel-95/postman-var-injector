FROM node:22
COPY . .
CMD [ "node", "./variable_injector.js" ]
