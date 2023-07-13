import { Handlers } from "$fresh/server.ts";
import { State } from "../../lib/state.ts";

const BOMB_COST = 5;

export const handler: Handlers<unknown, State> = {
  async POST(req, ctx) {
    const { fromUsername, toUsername } = await req.json() as {
      fromUsername: string;
      toUsername: string;
    };
    if (!fromUsername) {
      return badRequest("fromUsername is missing");
    }
    if (!toUsername) {
      return badRequest("toUsername is missing");
    }

    if (fromUsername === toUsername) {
      return badRequest("cant bomb yourself");
    }

    const scoreState = ctx.state.scoreboard.scoreState;
    if ((scoreState.value.scores[fromUsername] ?? 0) < BOMB_COST) {
      return preconditionFailed("not enough clicks");
    }
    if (!scoreState.value.scores[toUsername]) {
      return preconditionFailed("toUsername doesn't exist");
    }

    const newScores = { ...scoreState.value.scores };
    if (newScores[fromUsername] === BOMB_COST) {
      delete newScores[fromUsername];
    } else {
      newScores[fromUsername] = newScores[fromUsername] - 5;
    }
    if (newScores[toUsername] === 1) {
      delete newScores[toUsername];
    } else {
      newScores[toUsername] = newScores[toUsername] - 1;
    }

    scoreState.value = {
      scores: newScores,
      lastUpdated: Date.now(),
    };

    return new Response("", { status: 200 });
  },
};

function badRequest(error: string) {
  return new Response(JSON.stringify({ error }), {
    status: 400,
  });
}

function preconditionFailed(error: string) {
  return new Response(JSON.stringify({ error }), { status: 412 });
}
