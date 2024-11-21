<template>
  <div>
    <nav>
      <Link to="/">Index</Link>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, Link } from '@router-example/vue';
</script>
