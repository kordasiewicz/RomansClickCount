import { Signal, signal } from "@preact/signals";

export interface State {
  scoreboard: Scoreboard;
}

export interface ScoreboardState {
  scores: { [key: string]: number };
  lastUpdated: number;
}

export class Scoreboard {
  private static singleton: Scoreboard;

  readonly scoreState: Signal<ScoreboardState>;
  
  public constructor() {
    // TODO: Load/Deserialize from durable storage (sqlite? )
    this.scoreState = signal({scores: {}, lastUpdated: Date.now()});
  }

  public static init() {
    Scoreboard.singleton = new Scoreboard();
  }

  public static instance() {
    if (this.singleton) return this.singleton;
    else throw new Error("Scoreboard is not initialized");
  }

}
