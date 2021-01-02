<style>
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: calc(100% - 1rem);
    padding: 0.5rem;
  }

  .buttons {
    display: flex;
    align-items: center;
  }

  button {
    flex: 1 0 48%;
  }
</style>

<script lang="ts">
  import { derived, get } from "svelte/store";
  import { COUNT, DIVISOR, NOMINATOR } from "./state";

  export let answer: number;
  export let userAnswer: number | null;
  let nominator: number;
  let divisor: number;

  derived([DIVISOR, NOMINATOR], (i) => i).subscribe(([d, n]) => {
    divisor = d;
    nominator = n;
  });

  const enum State {
    Ready,
    Incorrect,
    Correct,
    Reveal,
  }

  let state: State = State.Ready;

  const checkAnswer = () => {
    if (answer === userAnswer) {
      state = State.Correct;
    } else {
      state = State.Incorrect;
    }
  };

  const next = () => {
    COUNT.set(get(COUNT) + 1);
    state = State.Ready;
  };

  const tryAgain = () => {
    state = State.Ready;
  };

  const reveal = () => {
    state = State.Reveal;
  };
</script>

<footer>
  {#if state === State.Ready}
    <div class="buttons">
      <button
        type="button"
        on:click="{checkAnswer}"
        disabled="{isNaN(userAnswer) || userAnswer === null}"
      >Check</button>
    </div>
  {:else if state === State.Correct}
    <h2>Correct answer</h2>
    <p>{nominator} ÷ {divisor} = {answer}</p>
    <div class="buttons">
      <button type="button" on:click="{next}">Next</button>
    </div>
  {:else if state === State.Incorrect}
    <h2>Incorrect</h2>
    <div class="buttons">
      <button type="button" on:click="{tryAgain}">Try again</button>
      <button type="button" on:click="{reveal}">Show answer</button>
    </div>
  {:else}
    <h2>Incorrect</h2>
    <p>{nominator} ÷ {divisor} = {answer}</p>
    <div class="buttons">
      <button type="button" on:click="{next}">Next</button>
    </div>
  {/if}
</footer>
