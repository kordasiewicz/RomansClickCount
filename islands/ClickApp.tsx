import { useSignal } from "@preact/signals";
import { ScoreboardState } from "../lib/state.ts";
import ClickButton from "../components/ClickButton.tsx";
import Scoreboard from "../components/Scoreboard.tsx";

interface ClickAppProps {
  initialScoreState: ScoreboardState;
}

export default function ClickApp({ initialScoreState }: ClickAppProps) {
  const username = useSignal("");
  return (
    <>
      <div class="my-6">
        Username:{" "}
        <input
          type="text"
          value={username.value || ""}
          onInput={(event) => {
            username.value = event.currentTarget.value;
          }}
        >
        </input>
      </div>
      <ClickButton username={username} />
      <div class="my-6">
        <Scoreboard initial={initialScoreState} username={username} />
      </div>
    </>
  );
}
