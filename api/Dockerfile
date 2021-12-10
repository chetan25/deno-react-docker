FROM denoland/deno:1.16.3
 
EXPOSE 3001 

# Makes the working directory /app in our container. 
WORKDIR /app

COPY deps.ts .
RUN deno cache deps.ts
 
ADD . .

# ENTRYPOINT ["/usr/local/bin/denon"]

# # Compiles server.ts so that it doesn’t need to be compiled for each startup.
RUN deno cache src/main.ts

CMD ["run", "--watch=./**/*.ts,./**/*.tsx ", "--allow-run", "--allow-net", "--allow-read", "--allow-env","--allow-write", "--unstable", "src/main.ts"]
