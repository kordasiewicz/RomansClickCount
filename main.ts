/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import { Scoreboard } from "./lib/state.ts";

await Scoreboard.init();
// 1. Read the PORT environment variable injected by Cloud Run (defaults to 8080).
//    We use 8000 as a safe fallback, but Cloud Run guarantees PORT will be set.
const port = parseInt(Deno.env.get("PORT") ?? "8000"); 

await start(manifest, { 
    plugins: [twindPlugin(twindConfig)],
    port: port // 2. Pass the port variable to the start function
});