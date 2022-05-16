<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const collectionName = ref(route.params.collectionName);

watch(
  () => route.params.collectionName,
  async name => {
    collectionName.value = name
  }
);
</script>

<template>
  This is a "{{ collectionName }}" collection.
</template>