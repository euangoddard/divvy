<script lang="ts">
  import Controls from "./Controls.svelte";
  import Problem from "./Problem.svelte";
  import { DIVISOR, MAX } from "./state";
  import type { ProblemAnswer } from "./models";
  import CheckAnswer from "./CheckAnswer.svelte";

  const setDivisor = ({ detail }) => {
    DIVISOR.set(parseInt(detail, 10));
  };

  const setMax = ({ detail }) => {
    MAX.set(parseInt(detail, 10));
  };

  let max: number;
  MAX.subscribe((value) => (max = value));

  let divisor: number;
  DIVISOR.subscribe((value) => (divisor = value));

  let problemAnswer: ProblemAnswer = {
    userAnswer: NaN,
    answer: NaN,
    isCorrect: false,
  };

  const setProblemAnswer = ({ detail }): void => {
    problemAnswer = detail as ProblemAnswer;
  };
</script>

<main>
  <Controls
    max="{max}"
    divisor="{divisor}"
    on:divisor="{setDivisor}"
    on:max="{setMax}"
  />
  <Problem on:answer="{setProblemAnswer}" />
  <CheckAnswer
    answer="{problemAnswer.answer}"
    userAnswer="{problemAnswer.userAnswer}"
  />
</main>
