import { computed, type Signal, useComputed, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/hooks";
import { ScoreboardState } from "../lib/state.ts";
import { JSX } from "preact/jsx-runtime";
import Bomb from "../components/Bomb.tsx";

interface ScoreboardProps {
  initial: ScoreboardState;
  username: Signal<string>;
}

export default function Scoreboard(props: ScoreboardProps) {
  const state = useSignal(props.initial);

  useEffect(() => {
    let running = true;
    const controller = new AbortController();
    setTimeout(async () => {
      try {
        while (running) {
          const result = await fetch(
            `/api/scoreboard?longPoll=${state.value.lastUpdated}`,
            {
              signal: controller.signal,
            },
          );
          if (result.status === 304) {
            // no updates, immediately try again
            continue;
          }
          if (result.status === 0) {
            console.error("Error contacting host; giving up");
            running = false;
            break;
          }
          if (result.status !== 200) {
            console.error(`Unexpected status: ${result.status}`);
            continue;
          }
          const scoreState = await result.json() as ScoreboardState;
          state.value = scoreState;
        }
      } catch (e) {
        console.error(`Unknown error, giving up: ${e.name}`);
      }
    });

    return () => {
      running = false;
      controller.abort();
    };
  }, []);

  return (
    <table class="border border-black border-solid border-collapse">
      {Object.entries(state.value.scores).map(([name, score]) => (
        <tr class="border border-black border-solid border-collapse">
          <TableData>
            <Bomb fromUsername={props.username.value} toUsername={name} />
            {name}
          </TableData>
          <TableData align="right">
            {score}
          </TableData>
        </tr>
      ))}
    </table>
  );
}

function TableData(
  props: JSX.HTMLAttributes<HTMLTableCellElement> & {
    align?: "left" | "right";
  },
) {
  let alignClass = "";
  if (props.align === "left") {
    alignClass = "text-left";
  } else if (props.align === "right") {
    alignClass = "text-right";
  }
  return (
    <td
      {...props}
      class={"font-mono border border-black border-solid border-collapse p-4" +
        " " + alignClass}
    >
    </td>
  );
}
