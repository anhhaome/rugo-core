<script setup>
import { inject, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { formatName } from '../../../utils';
import { MPanel } from '../../../../lib';
import { useInfoStore } from '../../../stores/info';

const route = useRoute();
const model = inject('model');
const noti = inject('mnoti');
const collectionName = ref(route.params.collectionName);
const infoStore = useInfoStore();

// load data
const fs = reactive({
  data: [],
  schema: {}
});

const loadData = async () => {
  let result;
  try {
    result = await model(collectionName.value).list();
  } catch(err) {
    return noti.push('danger', err.message);
  }
  
  fs.data = result.data;
  
  for (let schema of infoStore.info)
    if (schema.__name === collectionName.value)
      fs.schema = schema;
}

watch(
  () => route.params.collectionName,
  async name => {
    if (route.name !== 'FsCollection')
      return;

    collectionName.value = name;
    await loadData();
  }
);

// start
loadData();
</script>

<template>
  <h1 class="text-3xl mt-4 font-semibold">{{ formatName(collectionName) }}</h1>

  <MPanel>
    Hello Fs
  </MPanel>
</template>