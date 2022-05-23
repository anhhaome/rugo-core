<script setup>
import uniqid from "uniqid";
import { reactive, watch } from 'vue';
import { formatName } from '../utils';
import { MInput, MButton } from "../../lib";

const props = defineProps(['schema']);
defineEmits(['save', 'cancel']);

const fields = reactive([]);
const form = reactive({});

const reload = () => {
  while (fields.length)
    fields.pop();

  for (let key in props.schema){
    if (key[0] === '_' && key[1] === '_')
      continue;

    fields.push({
      key: uniqid(),
      name: key,
      schema: props.schema[key]
    });

    form[key] = '';
  }
}

watch(() => props.schema, reload);

reload();
</script>

<template>
  <h2 class="text-xl" v-if="props.schema.__name">Create a new {{ formatName(props.schema.__name).toLowerCase() }}</h2>

  <div v-for="field in fields" :key="field.key">
    <MInput :label="field.name" type="text" v-model="form[field.name]" />
  </div>

  <div class="flex justify-end space-x-2">
    <MButton variant="primary" @click="$emit('save', form)">Save</MButton>
    <MButton @click="$emit('cancel')">Cancel</MButton>
  </div>
</template>