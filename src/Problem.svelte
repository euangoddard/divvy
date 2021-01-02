<style>
  article {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }

  span {
    padding: 0.25rem;
  }

  input {
    width: 8ch;
    margin: 0;
  }
</style>

<script lang="ts">
  import { derived } from "svelte/store";
  import { COUNT, DIVISOR, MAX, NOMINATOR } from "./state";
  import { createEventDispatcher } from "svelte";

  let nominator: number;
  let divisor: number;
  let answer: number;

  let userAnswer: number;

  const dispatch = createEventDispatcher();

  const dispatchEvent = () => {
    dispatch("answer", {
      answer,
      userAnswer,
      isCorrect: answer === userAnswer,
    });
  };

  derived([DIVISOR, MAX, COUNT], ([divisor, max, count]) => {
    const randomAnswer = Math.floor((Math.random() * max) / divisor);
    return {
      nominator: randomAnswer * divisor,
      answer: randomAnswer,
      divisor,
    };
  }).subscribe((values) => {
    divisor = values.divisor;

    nominator = values.nominator;
    NOMINATOR.set(nominator);

    answer = values.answer;

    userAnswer = null;
    dispatchEvent();
  });

  const setUserAnswer = (e: Event) => {
    userAnswer = (e.target as HTMLInputElement).valueAsNumber;
    if (userAnswer !== Math.floor(userAnswer)) {
      userAnswer = null;
    }
    dispatchEvent();
  };
</script>

<article>
  <span>{nominator}</span>
  <span>÷</span>
  <span>{divisor}</span>
  <span>=</span>
  <span><input
      type="number"
      step="1"
      min="1"
      on:input="{setUserAnswer}"
      value="{userAnswer}"
    /></span>
</article>
