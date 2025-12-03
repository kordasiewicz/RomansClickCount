import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ScoreboardState, State } from "../lib/state.ts";
import ClickApp from "../islands/ClickApp.tsx";

interface HomeProps {
  initialScoreState: ScoreboardState;
}

export const handler: Handlers<HomeProps, State> = {
  GET(_req, ctx) {
    return ctx.render({
      initialScoreState: ctx.state.scoreboard.scoreState.value,
    });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  return (
    <>
      <Head>
        <title>Click count</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="my-2">
          Click count - Deploy TEST
        </h1>
        <img
          src="mouse-cursor.svg"
          width="400px"
          alt="Lordalpha1, CC BY 2.5 <https://creativecommons.org/licenses/by/2.5>, via Wikimedia Commons"
        >
        </img>
        <ClickApp initialScoreState={props.data.initialScoreState}></ClickApp>
      </div>
    </>
  );
}
