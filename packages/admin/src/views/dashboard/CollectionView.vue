<script setup>
import { inject, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { formatName } from '../../utils';
import { MPanel, MAlert, MDialog, MPagination } from '../../../lib';
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
  total: 0,
  skip: 0,
  limit: 10,
  schema: {}
});

const loadData = async () => {
  let result;
  try {
    result = await model(collectionName.value).list({ $sort: { createdAt: -1 }, $skip: table.skip });
  } catch(err) {
    return noti.push('danger', err.message);
  }
  
  table.data = result.data;
  table.total = result.total;
  table.skip = result.skip;
  table.limit = result.limit;
  
  for (let schema of infoStore.info)
    if (schema.__name === collectionName.value)
      table.schema = schema;
}

const updateSkip = skip => {
  table.skip = skip;
  loadData();
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

const handleRemove = async doc => {
  let result;
  try {
    result = await model(collectionName.value).remove(doc._id);
  } catch(err) {
    return noti.push('danger', err.message);
  }

  noti.push('success', 'Document is removed!')

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
      @remove="handleRemove"
    />

    <MPagination
      v-if="table.data.length"
      class="mt-4 justify-end"
      :total="table.total"
      :limit="table.limit"
      :modelValue="table.skip"
      @update:modelValue="updateSkip"
    />

    <MAlert v-if="table.data.length === 0" variant="secondary" class="mb-0 rounded-none">
      The collection is empty.
    </MAlert>
  </MPanel>
</template>