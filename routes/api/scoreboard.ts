import { Handlers } from "$fresh/server.ts";
import { Signal } from "@preact/signals";
import { ScoreboardState, State } from "../../lib/state.ts";
import { Observable, race } from "npm:rxjs@7.8.1";
import { firstValueFrom } from "npm:rxjs@7.8.1";
import { timer } from "npm:rxjs@7.8.1";
import { switchMap } from "npm:rxjs@7.8.1";
import { throwError } from "npm:rxjs@7.8.1";
import { skipWhile } from "npm:rxjs@7.8.1";

export const handler: Handlers<unknown, State> = {
  async GET(req, ctx) {
    let scoreboardState: ScoreboardState;
    // Check if we're long-polling
    const longPoll = new URL(req.url).searchParams.get("longPoll");
    if (!longPoll) {
      // Just return the value
      scoreboardState = ctx.state.scoreboard.scoreState.value;
    } else {
      const wantUpdated = Number(longPoll);
      if (isNaN(wantUpdated)) {
        return new Response(
          JSON.stringify({ error: "longPoll is not a number" }),
          { status: 400 },
        );
      }
      if (wantUpdated < ctx.state.scoreboard.scoreState.value.lastUpdated) {
        // Return the current version
        scoreboardState = ctx.state.scoreboard.scoreState.value;
      } else {
        try {
          scoreboardState = await firstValueFrom(
            race(
              timer(5000).pipe(
                switchMap(() => throwError(() => new TimeoutError())),
              ),
              signalToObservable(ctx.state.scoreboard.scoreState).pipe(
                skipWhile((v) => wantUpdated >= v.lastUpdated),
              ),
            ),
          );
        } catch (e) {
          if (e.name === "TimeoutError") {
            return new Response(null, { status: 304 });
          } else {
            console.error(`Unexpected error: ${e.name}`);
            return new Response(null, { status: 500 });
          }
        }
      }
    }
    return new Response(JSON.stringify(scoreboardState), {
      headers: { "Cache-Control": "no-cache" },
    });
  },
};

function signalToObservable<T>(sig: Signal<T>): Observable<T> {
  return new Observable((obs) => sig.subscribe((v) => obs.next(v)));
}

class TimeoutError extends Error {
  readonly name = "TimeoutError";
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
