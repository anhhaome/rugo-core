<script setup>
import { inject, ref } from 'vue';
import { RouterView } from 'vue-router'
import { MNotification, MLoader } from '../lib';
import { useInfoStore } from './stores/info';

const infoStore = useInfoStore();

// notification
const notification = ref(null);
const noti = inject("mnoti");
noti.register(notification);

// loader
const loader = inject('loader');
loader.onChange(v => infoStore.setIsLoading(v));

</script>

<template>
  <RouterView />

  <MNotification ref="notification" />
  <MLoader class="fixed bottom-6 left-6 z-30" v-if="infoStore.isLoading" />
</template>
