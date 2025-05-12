<script setup lang="ts">
import { useClientStripe, useNuxtApp } from "#imports";
import OtherComponent from "~/components/dev/OtherComponent.vue";

const { loadStripe, stripe } = useClientStripe();
const nuxtApp = useNuxtApp();
stripe.value = await loadStripe(
  "pk_test_51REDXS7JY2P7nFBWO90u2rfWOor8r72cGWbyZhhddpduNQcmaWxvCduLcXEoATnETck5s8PScitdpsHF3ADPUzYn007wOjGslh",
);
</script>

<template>
  <main>
    <h1>Nuxt - Stripe module playground</h1>
    <section>
      <h2>Stripe client</h2>
      <code>
        {{ stripe ? "loaded" : "Loading..." }}
      </code>
    </section>
    <OtherComponent />
    <DevOtherOverride />
  </main>
</template>

<style scoped>
html {
  background-color: #222;
  color: #eee;
  font-family: sans-serif;
  font-size: 1rem;
  margin: 1rem;
}

h1,
h2 {
  margin: 0 0 1.5rem;
}

section {
  background-color: #2f2d2d;
  border-radius: 1rem;
  font-family: monospace;
  padding: 1.5rem;
  white-space: pre-wrap;
}
</style>
