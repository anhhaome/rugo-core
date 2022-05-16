<script setup>
import { inject, ref } from 'vue';
import { RouterView } from 'vue-router'
import { MNotification } from '../lib';

// notification
const notification = ref(null);
const noti = inject("mnoti");
noti.register(notification);

</script>

<template>
  <RouterView />

  <MNotification ref="notification"/>
</template>
