import { Application, oakCors } from "../deps.ts";
import { initRouter } from "./routes/index.ts";
import { setContentTypeHeader, notFound } from "./middleware/middleware.ts";

/**
 * async-iterator-signal.ts
 */
// console.log("Press Ctrl-C to trigger a SIGINT signal");
// // deno-lint-ignore ban-ts-comment
// // @ts-ignore
// for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
//   console.log("interrupted!");
//   Deno.exit();
// }

// // deno-lint-ignore ban-ts-comment
// // @ts-ignore
// for await (const _ of Deno.signal(Deno.Signal.SIGTERM)) {
//   console.log("termination!");
//   Deno.exit();
// }

// // deno-lint-ignore ban-ts-comment
// // @ts-ignore
// for await (const _ of Deno.signal(Deno.Signal.SIGQUIT)) {
//   console.log("quit!");
//   Deno.exit();
// }

const PORT = Number(Deno.env.get("PORT")) || 3001;
const URL = Deno.env.get("URL") || "http://localhost";

const app = new Application();

// we can remove this cors logic if we are using the nginx,
// without nginx we would need this for our FE to talk to our BE
app.use(
  oakCors({
    origin: /^.+localhost:(1234|3000)$/,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
); // Enable CORS for All Routes

app.use(setContentTypeHeader);
initRouter(app);
// will run when above routes don't return anyhting
app.use(notFound);

app.addEventListener("listen", () => {
  console.log(`Api server running at ${URL}:${PORT}`);
});

await app.listen({ port: PORT });
