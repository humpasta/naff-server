FROM node:20 as builder

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20 as runner

# Create a non-root user and group
RUN groupadd -r naff && useradd -r -g naff naff

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY --chown=naff:naff package*.json ./

RUN npm install

COPY --chown=naff:naff --from=builder /usr/src/app/dist/src/ ./

# Set permissions
RUN chown -R naff:naff /usr/src/app

# Switch to non-root user
USER naff

# Expose the port on which the app runs
EXPOSE 3000

# Define the command to run the app
CMD ["node", "server.js"]