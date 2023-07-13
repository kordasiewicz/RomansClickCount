import { Button } from "../components/Button.tsx";
import { Signal, useSignal } from "@preact/signals";

export interface ClickButtonProps {
  username: Signal<string>;
}

export default function ClickButton({ username }: ClickButtonProps) {
  const requestRunning = useSignal(false);

  async function sendAClick() {
    requestRunning.value = true;

    try {
      const result = await fetch("/api/click", {
        method: "POST",
        body: JSON.stringify({ username: username.value }),
      });
      // TODO check if result is good?
    } finally {
      requestRunning.value = false;
    }
  }

  return (
    <Button
      type="button"
      disabled={!username.value || requestRunning.value}
      onClick={sendAClick}
    >
      Click me
    </Button>
  );
}
