<script setup>
import { MInput, MRichEditor } from "../../../lib";

defineProps(['label', 'modelValue', 'schema']);
defineEmits(['update:modelValue']);
</script>

<template>
  <label class="block mb-2 mt-4 text-gray-600">{{label}}</label>

  <MRichEditor
    v-if="schema.editor === 'rich'"
    :modelValue="modelValue"
    @update:modelValue="event => $emit('update:modelValue', event)"
  />
  
  <MInput
    v-else
    class="my-0"
    :modelValue="modelValue"
    @update:modelValue="event => $emit('update:modelValue', event)"
  />
</template>