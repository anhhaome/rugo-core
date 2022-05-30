<script setup>
import { computed, inject, reactive, ref, watch } from 'vue';
import { DIRECTORY_MIME } from '../constants';
import { base64url } from '../utils';
import { MButton, MTable, MCheckbox, MDropdown, MList, MListItem, MBreadcrumb } from '../../lib';

const props = defineProps(['data', 'parent']);
const emit = defineEmits(['create', 'update:parent']);

const dialog = inject('mdialog');
const uploadInput = ref(null);

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

watch(() => props.parent, () => {
  deselectAll();
});

// info
const addresses = computed(() => {
  const splits = base64url.decode(props.parent).split('/').filter(i => i);

  const result = [ { _id: 'Lw' }];
  for (let item of splits){
    let lastId = result[result.length - 1]._id || base64url.encode('/');

    result.push({
      text: item,
      _id: base64url.encode(base64url.decode(lastId) + '/' + item)
    });
  }

  result[result.length - 1].active = true;

  return result;
});

// handle
const createDirectory = async () => {
  const name = await dialog.show('input');
  
  if (!name || name === '')
    return;

  emit('create', {
    name,
    mime: DIRECTORY_MIME,
    parent: props.parent
  });
};

const remove = async (doc) => {
  if (await dialog.show("confirm")) {
    emit('remove', doc);
  };
}

const open = doc => {
  if (doc.mime === DIRECTORY_MIME){
    return emit('update:parent', doc._id);
  }
}

const upload = () => {
  const docs = [];

  for (let file of uploadInput.value.files){
    let formData = new FormData();
    formData.append('name', file.name);
    formData.append('parent', props.parent);
    formData.append('data', file);

    docs.push(formData);
  }

  emit('upload', docs);
}

</script>

<template>
  <div class="file-explorer">
    <div class="toolbar mb-4">
      <MButton
        variant="primary"
        class="justify-center w-8 h-8 px-0 py-0 mr-2"
        @click="uploadInput.click()"
      >
        <ion-icon class="text-lg" icon="cloud-upload" />
      </MButton>

      <MButton
        variant="primary"
        class="justify-center w-8 h-8 px-0 py-0 mr-2"
      >
        <ion-icon class="text-lg" icon="document" />
      </MButton>

      <MButton
        variant="primary"
        class="justify-center w-8 h-8 px-0 py-0 mr-2"
        @click="createDirectory"
      >
        <ion-icon class="text-lg" icon="folder" />
      </MButton>

      <MButton
        variant="danger"
        class="justify-center w-8 h-8 px-0 py-0 mr-2"
      >
        <ion-icon class="text-lg" icon="trash" />
      </MButton>
    </div>

    <div
      class="hidden w-full h-24 mb-4 relative border-2 rounded-lg border-dashed bg-gray-100 mactive:bg-transparent"
      active
    >
      <input
        class="w-full h-full opacity-0"
        ref="uploadInput"
        type="file"
        multiple
        @change="upload"
      />
      <label class="pointer-events-none absolute w-full h-full p-4 top-0 left-0 flex flex-wrap items-center justify-center text-gray-400 text-base tracking-wider">
        <ion-icon class="block w-full text-xl" name="document-text" /><br>
        <div>
          Drop files here or click to upload 
        </div>
      </label>
    </div>

    <MBreadcrumb
      class="h-4 mb-4"
      :items="addresses"
      @navigate="item => item.active || $emit('update:parent', item._id)"
    />

    <MTable
      :data="data"
      :labels="['name', 'size', 'updatedAt']"
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
            <MListItem>View</MListItem>
            <MListItem>Edit</MListItem>
            <MListItem class="text-red-500" @click="remove(row)">Delete</MListItem>
          </MList>
        </MDropdown>
      </template>

      <template #cell(name)="{value, row}">
        <a class="cursor-pointer hover:underline" @click="open(row)">
          <ion-icon class="align-text-top" name="folder" v-if="row.mime === DIRECTORY_MIME" />
          <ion-icon class="align-text-top" name="image" v-else-if="row.mime.indexOf('image') === 0" />
          <ion-icon class="align-text-top" name="videocam" v-else-if="row.mime.indexOf('video') === 0" />
          <ion-icon class="align-text-top" name="document" v-else />
          <span class="ml-2">{{ value }}</span>
        </a>
      </template>

      <template #cell(updatedAt)="{value}">
        {{ (new Date(value)).toLocaleString('vi-VN') }}
      </template>
    </MTable>

    <div v-if="data.length === 0" class="text-center bg-gray-50 italic py-2 px-4 text-gray-400">
      This directory is empty.
    </div>
  </div>
</template>

<style lang="scss">
.file-explorer {
  table {
    th, td {
      min-width: 10em;
      min-height: 2em;
    }

    th:first-child,
    td:first-child {
      width: 3em;
      min-width: 3em;
      
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
      min-width: 3em;
    }

    tr:hover {
      @apply bg-gray-50; 
    }

    th:nth-child(2),
    td:nth-child(2) {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    th:nth-child(3),
    td:nth-child(3) {
      width: 8em;
    }

    th:nth-child(4),
    td:nth-child(4) {
      width: 13em;
    }
  }
}
</style>