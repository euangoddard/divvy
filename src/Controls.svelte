<style>
  form {
    position: fixed;
    z-index: 2;
      width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block-end: 2rem;
  }

  select {
    margin-block-end: 0;
  }

  label {
    font-weight: 500;
    margin-inline-end: 0.5rem;
  }

  label.space-start {
    margin-inline-start: 1rem;
  }
</style>

<script lang="ts">
  import { range } from "./utils";
  import { createEventDispatcher } from "svelte";

  const divisors = range(2, 6);
  const maxes = [100, 1_000, 10_000];

  export let divisor: number;
  export let max: number;

  const dispatch = createEventDispatcher();

  function handleDivisorChange(e: Event) {
    dispatch("divisor", (e.target as HTMLSelectElement).value);
  }

  function handleMaxChange(e: Event) {
    dispatch("max", (e.target as HTMLSelectElement).value);
  }
</script>

<form>
  <label for="divisor">Divisor</label>
  <select id="divisor" on:change="{handleDivisorChange}" bind:value="{divisor}">
    {#each divisors as value}
      <option value="{value}">{value}</option>
    {/each}
  </select>

  <label for="max" class="space-start">Max</label>
  <select id="max" on:change="{handleMaxChange}" bind:value="{max}">
    {#each maxes as value}
      <option value="{value}">{value}</option>
    {/each}
  </select>
</form>
