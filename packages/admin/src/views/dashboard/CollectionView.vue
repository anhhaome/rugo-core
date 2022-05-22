<script setup>
import { inject, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { formatName } from '../../utils';
import { MPanel, MAlert } from '../../../lib';
import DataTable from '../../components/DataTable.vue';
import { useInfoStore } from '../../stores/info';

const route = useRoute();
const model = inject('model');
const collectionName = ref(route.params.collectionName);

const infoStore = useInfoStore();

const table = reactive({
  data: [],
  schema: {}
});

const loadData = async () => {
  const result = await model(collectionName.value).list();
  
  table.data = result.data;
  
  for (let schema of infoStore.info)
    if (schema.__name === collectionName.value)
      table.schema = schema;
}

watch(
  () => route.params.collectionName,
  async name => {
    collectionName.value = name;
    await loadData();
  }
);

loadData();
</script>

<template>
  <h1 class="text-3xl mt-4 font-semibold">{{ formatName(collectionName) }}</h1>

  <MPanel>
    <DataTable
      :data="table.data"
      :schema="table.schema"
    />

    <MAlert v-if="table.data.length === 0" variant="secondary" class="mb-0 rounded-none">
      The collection is empty.
    </MAlert>
  </MPanel>
</template>