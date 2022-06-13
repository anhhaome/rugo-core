<script setup>
import { inject } from "vue";
import { MInput, MRichEditor, MDropdown, MList, MListItem } from "../../../lib";

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

  <MDropdown
    v-else-if="schema.choice"
    class="w-[100%!important] block"
    position="left"
    :autohide="true"
  >
    <template #open="{click}">
      <div class="relative">
        <MInput
          class="my-0"
          @click="click"
          :disabled="true"
          :modelValue="modelValue"
        />

        <button
          class="border-2 border-warn-500 text-warn-500 rounded-full w-6 h-6 opacity-50 inline-flex items-center justify-center absolute right-9 top-2.5
          hover:opacity-100"
          v-if="modelValue && !schema.required && !schema.default"
          @click="$emit('update:modelValue', null)"
        >
          <ion-icon class="text-lg" name="close" />
        </button>

        <ion-icon @click="click" class="text-lg absolute right-2.5 top-3.5 text-gray-500" name="chevron-down" />
      </div>
    </template>

    <MList class="w-[100%!important]">
      <MListItem
        v-for="item in schema.choice"
        :key="item"
        @click="$emit('update:modelValue', item)"
      >
        {{ item }}
      </MListItem>
    </MList>
  </MDropdown>
  
  <MInput
    v-else
    class="my-0"
    :modelValue="modelValue"
    @update:modelValue="event => $emit('update:modelValue', event)"
  />
</template>