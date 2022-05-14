<script setup>
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";

import { MInput, MButton } from '../../lib';

const api = inject('api');
const router = useRouter();
const form = reactive({
  email: '',
  password: '',
});

const signIn = async () => {
  console.log(`You are signing in with account: ${JSON.stringify(form)}`);
  console.log(await api.get('/json'));

  router.push("/dashboard");
};
</script>

<template>
  <h1 class="text-xl text-center font-medium tracking-wide">Sign In</h1>

  <MInput label="Email" type="email" v-model="form.email" />
  <MInput label="Password" type="password" v-model="form.password" />

  <div class="flex justify-between items-center">
    <MButton variant="primary" @click="signIn">Sign In</MButton>
  </div>
</template>
