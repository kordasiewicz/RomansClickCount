import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { Scoreboard, State } from "../lib/state.ts";

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  ctx.state.scoreboard = Scoreboard.instance();
  const resp = await ctx.next();
  return resp;
}
