<script setup>
import { computed, reactive, watch } from 'vue';
import { MList, MListItem, MTable, MDropdown, MCheckbox, MButton } from '../../lib';
import { formatValueWithSchema } from '../utils';

const props = defineProps(['data', 'schema']);
defineEmits(['create'])

// infomation
const fields = computed(() => {
  const result = [];
  for (let key in props.schema){
    if (key[0] === '_' && key[1] === '_')
      continue;

    result.push(key);
  }

  return result;
});

// selected documents
const selected = reactive(new Set());

const isAnySelectAndNotAll = computed(() => selected.size > 0 && selected.size < props.data.length);
const isSelectAll = computed(() => selected.size === props.data.length);

const isSelect = doc => selected.has(doc);

const deselectAll = () => {
  for (let v of selected)
    selected.delete(v);
}

const toggleSelect = (doc, checked) => {
  if (checked)
    selected.add(doc);
  else
    selected.delete(doc);
}

const toggleSelectAll = checked => {
  if (checked){
    for (let v of props.data)
      selected.add(v);
  } else {
    deselectAll();
  }
}

// system
const reload = () => {
  deselectAll();
}

watch([
  () => props.data,
  () => props.schema
], reload);

</script>

<template>
  <div class="collection-data-table">
    <div class="toolbar mb-4">
      <MButton
        variant="primary"
        class="justify-center w-9 h-9 px-0 py-0 mr-2"
        @click="$emit('create')"
      >
        <ion-icon class="text-lg" icon="create" />
      </MButton>

      <MButton
        v-if="selected.size"
        variant="danger"
        class="justify-center w-9 h-9 px-0 py-0 mr-2"
      >
        <ion-icon class="text-lg" icon="trash" />
      </MButton>
    </div>

    <MTable
      :data="props.data"
      :labels="fields"
    >
      <template #beforerow="{row}">
        <MCheckbox
          v-if="row"
          :modelValue="isSelect(row)"
          @update:modelValue="toggleSelect(row, $event)"
        />

        <MCheckbox
          v-else-if="props.data.length"
          :indeterminate="isAnySelectAndNotAll"
          :modelValue="isSelectAll"
          @update:modelValue="toggleSelectAll($event)"
        />
      </template>

      <template #afterrow="{row}">
        <MDropdown v-if="row" variant="none" position="right" :autohide="true">
          <MList>
            <MListItem>Remove</MListItem>
            <MListItem>Details</MListItem>
          </MList>
        </MDropdown>
      </template>

      <template #cell()="{value, label}">
        <span v-html="formatValueWithSchema(value, props.schema[label])"></span>
      </template>
    </MTable>
  </div>
</template>

<style lang="scss">
.collection-data-table {
  th:first-child,
  td:first-child {
    width: 3em;
    
    div {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
    }
  }

  th:last-child,
  td:last-child {
    width: 3em;
  }

  .toolbar {
    .m-button {

    }
  }
}
</style>