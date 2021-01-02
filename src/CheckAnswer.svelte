<style>
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: calc(100% - 1rem);
    padding: 0.5rem;
    z-index: 2;
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
  import { derived } from "svelte/store";
  import { create as createConfetti } from "canvas-confetti";
  import { COUNT, DIVISOR, NOMINATOR } from "./state";
  import { onMount } from "svelte";

  export let answer: number;
  export let userAnswer: number | null;
  let nominator: number;
  let divisor: number;

  let confetti: Function;
  onMount(() => {
    confetti = createConfetti(null, { resize: true, useWorker: true } as any);
  });

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
      fireConfetti();
    } else {
      state = State.Incorrect;
    }
  };

  const fireConfetti = () => {
    const element = document.getElementById("footer");
    const { top, left, width, height } = element.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    confetti({
      particleCount: 100,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  };

  const next = () => {
    COUNT.update((v) => v + 1);
    state = State.Ready;
  };

  const tryAgain = () => {
    state = State.Ready;
  };

  const reveal = () => {
    state = State.Reveal;
  };
</script>

<footer id="footer">
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
