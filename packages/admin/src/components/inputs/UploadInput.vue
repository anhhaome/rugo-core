<script setup>
import { inject, onMounted, reactive, ref } from "vue";
import { MInput, MButton } from "../../../lib";
import { base64url } from "../../utils";
import FileExplorer from "../FileExplorer.vue";

const props = defineProps(['modelValue', 'schema']);
const emit = defineEmits(['update:modelValue']);

const noti = inject('mnoti');
const model = inject('model');

// toggle expand
const isExpand = ref(false);

const toggleExpand = () => {
  isExpand.value = !isExpand.value;
}

// load data
const fs = reactive({
  data: [],
  parent: 'Lw'
});

const loadData = async () => {
  let result;
  try {
    result = await model(props.schema.ref).list({ parent: fs.parent });
  } catch(err) {
    return noti.push('danger', err.message);
  }
  
  fs.data = result.data;
}

const updateParent = newParent => {
  if (props.schema.root && base64url.decode(newParent).indexOf(props.schema.root) !== 0)
    return noti.push('warn', `Upload outside "${props.schema.root}" is prohibition!`);

  fs.parent = newParent;
  loadData();
}

const select = id => {
  if (!id){
    emit('update:modelValue', id);
    return isExpand.value = false;
  }

  let filePath = base64url.decode(id);

  if (props.schema.root && filePath.indexOf(props.schema.root) !== 0)
    return noti.push('warn', `Upload outside "${props.schema.root}" is prohibition!`);

  if (props.schema.root)
    filePath = filePath.replace(props.schema.root, '');

  emit('update:modelValue', filePath);
  isExpand.value = false;
}

const upload = async docs => {
  let result;

  try {
    result = await model(props.schema.ref).create(docs[0]);
  } catch(err) {
    return noti.push('danger', err.message);
  }

  noti.push('success', `Uploaded!`);
  await loadData();

  select(result._id);
}

onMounted(() => {
  if (props.schema.root){
    fs.parent = base64url.encode(props.schema.root + '/uploads/' + (new Date()).toISOString().split('T')[0].replace(/-/gm, '/'));
  }

  loadData();
});
</script>

<template>
  <div class="upload-input">
    <MInput
      class="upload-input-value my-0 cursor-pointer mx-[-1px] my-[-1px]"
      :disabled="true"
      :modelValue="modelValue"
      @click="toggleExpand"
    />

    <FileExplorer
      v-if="isExpand"
      mode="select"
      accept="image/*"
      :home="schema.ref"
      :data="fs.data"
      :parent="fs.parent"
      @update:parent="updateParent"
      @upload="upload"
      @select="doc => select(doc._id)"
    />

    <MButton v-if="isExpand" class="mx-3 mb-3" variant="danger" @click="select('')">Clear</MButton>
  </div>
</template>

<style lang="scss">
.upload-input {
  @apply relative border rounded-lg;

  .upload-input-value:after {
    content: 'Browse';
    
    @apply border rounded-r-lg h-full top-0 right-0 absolute px-3 inline-flex items-center text-gray-600;
  }

  .file-explorer {
    @apply p-3;
  }
}
</style>