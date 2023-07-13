import { Handlers } from "$fresh/server.ts";
import { State } from "../../lib/state.ts";

export const handler: Handlers<unknown, State> = {
  async POST(req, ctx) {
    const username = (await req.json() as { username: string }).username;
    if (!username) {
      return new Response(JSON.stringify({ error: "username is missing" }), {
        status: 400,
      });
    }
    
    const newScoreState = {...ctx.state.scoreboard.scoreState.value};
    newScoreState.scores[username] = (newScoreState.scores[username] ?? 0) + 1;
    newScoreState.lastUpdated = Date.now();
    ctx.state.scoreboard.scoreState.value = newScoreState;

    // TODO validate click is valid

    return new Response("{}");
  },
};
