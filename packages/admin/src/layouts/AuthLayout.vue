<script setup>
import { MAuthLayout } from '../../lib';
import AppLogo from "../components/AppLogo.vue";
</script>

<template>
  <MAuthLayout>
    <template #logo>
      <AppLogo size="lg"/>
    </template>
  </MAuthLayout>
</template>
