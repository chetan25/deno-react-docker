---
title: Simple Todo App to practice Deno and React in Docker environment.
excerpt: Todo App to practice Deno as a backend service and NextJS as a frontend framework along with Docker compose to handle the interaction between container.
Tools:
  [
    "Deno",
    "Mongoose",
    "React",
    "NextJs",
    "typescript",
    "ReactDOM",
    "Docker",
    "Docker Compose",
    "nginx",
  ]
---

# React + Deno + Docker Compose

Simple app to practice some basic concepts for Deno and Docker Compose.

### Folder Structure

This is a mono repo with 3 folders

- `api` - Contains the Deno backend logic.
- `feapp` - Contains the Nextjs frontend.
- `nginx` - Contains the nginx config file

### Frontend App

Frontend is a simple app with `Nextjs` and `Typescript`. It uses `Uikit` to handle the UI display and some complex interaction like drag/drop or modal actions.
The app is a dockerize container so there is a `Dockerfile` in the root level. The file basically copies the content and defines what command to run.

\***\* To enable hot reloading in NextJs \*\***

Add the following to the `next.config.js` file

```js
// Basically, you have to poll for changes.
// https://github.com/vercel/next.js/issues/6417
webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
```

### Deno Api

We are using Deno to create a backend server with the help of `oak` and using `Mongoose` to save the data. We also use `validasaur` to validate the schema.
This is also a dockerize container that's why we have a dockerfile in the root of the folder.

\***\* At the time of this, we could not do live reload using the deno official image on docker for windows, so we have to rebuild the image on every change \*\***

### Nginx

We use nginx since we need to make the two endpoints(fe and be) from different origin as if they were on same origin. This will eliminate the cors and other issue.
We setup `nginx` as our new service in our docker compose file and pointed to the configuration file we created. The key thing is the proxy bit in the configuration where we are mapping nginx to the respective docker containers.

\***\* Note that we are using the Service name specified in the compose file \*\***

```js
  location / {
      proxy_pass http://frontend:3000;
  }

  location /api/ {
      proxy_pass http://api:3001;
  }
```

If we are using the `nginx` proxy than we don't need to expose the ports for the services in the docker compose file. This will eliminate the issue of our services being accessed from two different location, one form the nginx port and other from their exposed port.

```js
// Will map the container port 8000 to the host server port 8000.
// Only needed when not using nginx.
ports: -"3001:3001";
```

### Docker Compose

If you look at the `docker-compose.yml` file we have defined 4 services. The `frontend` and `api` each has its own docker file but for the `nginx` and `mongo-db` we are using the image from docker hub. Note that in the `volumes` part we need to mount the whole part of the application and node_modules folder for the `frontend` app because the volume is not mounted during the build.
We have used the docker compose to make the networking simple between the different services and not to keep juggling with the ports and all. By default Compose sets up a single network and each container for a service joins the default network and is both reachable by other containers on that network, and discoverable by them at a hostname identical to the container name.
For example in our case we are accessing the `db_mongo` container by name in the `api`
`MONGO_URL=mongodb://db_mongo:27017`

To enable the images automatically re-building for our code changes we need to add the following to the configuration of the container

```js
stdin_open: true;
tty: true;
```

For the `db_mongo` container we have mapped the local mongo_db data to the container so that we don't loose the data in every rebuild

```js
 volumes:
      - mongodb_api:/data/db

// `/data/db` - container where mongo keeps directory
// `mongodb_api` - where we keep our mongo files in our volumes

```

## Extra info

#### We have used Projection in MongoDd to Map Data

How to s
projection in mongodb compass

```js
/**
 * specifications: The fields to
 *   include or exclude.
 */
{
  "results":{
    $reduce:{
      input: "$data",
      initialValue: [],
      in:{
        collapsed: {
          $concatArrays:["$$value.collapsed", "$$this"]
        },
        firstValue: {
          $concatArrays:["$$value.firstValue", {
            $slice: ["$$this", 1]
          }]
        }
      }
    }
  }
}
```

// lookup to todo collection and get the data in order

```js
/**
 * from: The target collection.
 * localField: The local join field.
 * foreignField: The target join field.
 * as: The name for the results.
 * pipeline: The pipeline to run on the joined collection.
 * let: Optional variables to use in the pipeline field stages.
 */
{
  from: 'todo',
  localField: 'results.collapsed._id',
  foreignField: '_id',
  as: 'data'
}
```

// to exclude data from the results

```js
/**
 * specifications: The fields to
 *   include or exclude.
 */
{
  results: {
    collapsed: 0;
  }
}
```

```js
handy docker compose commands
// create and start containers
docker-compose up
// start services with detached mode
docker-compose -d up
// start specific service
docker-compose up <service-name>
// list images
docker-compose images
// list containers
docker-compose ps
// start service
docker-compose start
// stop services
docker-compose stop
// display running containers
docker-compose top
// kill services
docker-compose kill
// remove stopped containers
docker-compose rm
// stop all contaners and remove images, volumes
docker-compose down


// to run bash inside running container
docker exec -it api /bin/sh

// for checking the directory content in gitbash
// winpty docker-compose exec app ls -l

// https://twg.io/blog/things-i-wish-i-knew-about-docker-before-i-started-using-it/
```
