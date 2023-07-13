import { useSignal } from "@preact/signals";

export interface BombProps {
  fromUsername: string;
  toUsername: string;
  disabled?: boolean;
}

export default function Bomb(
  { fromUsername, toUsername, disabled }: BombProps,
) {
  const reqRunning = useSignal(false);

  async function sendBomb() {
    reqRunning.value = true;
    try {
      const response = await fetch("/api/bomb", {
        method: "POST",
        body: JSON.stringify({ fromUsername, toUsername }),
      });
      if (response.status !== 200) {
        console.error(`Unexpected status: ${response.status}`);
      }
    } finally {
      reqRunning.value = false;
    }
  }

  return (
    <button
      type="button"
      class="mr-3"
      disabled={disabled || reqRunning.value}
      onClick={sendBomb}
    >
      💣
    </button>
  );
}
