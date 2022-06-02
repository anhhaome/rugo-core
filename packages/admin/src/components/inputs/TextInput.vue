<script setup>
import { inject } from "vue";
import { MInput, MRichEditor } from "../../../lib";

const props = defineProps(['label', 'modelValue', 'schema']);
defineEmits(['update:modelValue']);

const noti = inject('mnoti');

const prepareInsertion = quill => {
  if (!props.schema.upload)
    return noti.push('warn', 'Do not have upload config!');
}
</script>

<template>
  <MRichEditor
    v-if="schema.editor === 'rich'"
    :modelValue="modelValue"
    @update:modelValue="event => $emit('update:modelValue', event)"
    @insertImage="prepareInsertion"
  />
  
  <MInput
    v-else
    class="my-0"
    :modelValue="modelValue"
    @update:modelValue="event => $emit('update:modelValue', event)"
  />
</template>