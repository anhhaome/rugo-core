<script setup>
import { inject, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { formatName } from '../../utils';
import { MPanel, MAlert, MDialog } from '../../../lib';
import { useInfoStore } from '../../stores/info';
import DataTable from '../../components/DataTable.vue';
import DocumentForm from '../../components/DocumentForm.vue';

const route = useRoute();
const model = inject('model');
const noti = inject('mnoti');
const collectionName = ref(route.params.collectionName);
const infoStore = useInfoStore();

// load data
const table = reactive({
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

// handle document
const documentDialog = ref(null);
const isCreate = ref(true);

const handleSave = async doc => {
  let result;
  try {
    result = await model(collectionName.value).create(doc);
  } catch(err) {
    return noti.push('danger', err.message);
  }

  noti.push('success', 'Document is created!')
  documentDialog.value.hide();

  await loadData();
}

// start
loadData();
</script>

<template>
  <h1 class="text-3xl mt-4 font-semibold">{{ formatName(collectionName) }}</h1>

  <MPanel>
    <MDialog :label="false" ref="documentDialog">
      <DocumentForm
        :schema="table.schema"
        @save="handleSave"
        @cancel="documentDialog.hide()"
      />
    </MDialog>

    <DataTable
      :data="table.data"
      :schema="table.schema"
      @create="isCreate = true; documentDialog.show()"
    />

    <MAlert v-if="table.data.length === 0" variant="secondary" class="mb-0 rounded-none">
      The collection is empty.
    </MAlert>
  </MPanel>
</template>