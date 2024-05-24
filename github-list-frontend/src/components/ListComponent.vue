<template>
    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-h6 text-weight-medium">{{ repository }}</span>
      </q-item-label>
      <q-item-label caption lines="1" class="q-mb-md text-weight-bold">
        {{ meta }}
      </q-item-label>
      <q-item-label caption lines="1" class="q-mb-md text-body2">
        {{ description }}
      </q-item-label>
      <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        <router-link :to="routeTo" style="text-decoration: none; color: inherit;">
            Details
          </router-link>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn @click="deleteHandler" class="gt-xs" color="red" size="12px" flat dense round icon="delete" />
        <!-- <q-btn class="gt-xs" color="green" size="12px" flat dense round icon="done" /> -->
        <q-btn :to="routeToEdit" size="12px" color="blue" flat dense round icon="edit" />
      </div>
    </q-item-section>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue';

  defineOptions({
    name: 'List'
  });

  interface ListProps {
    repository: string;
    description: string;
    meta: string;
    routeTo: string;
    routeToEdit: string;
  }

  defineProps<ListProps>();

  const emit = defineEmits(['delete']);

  const deleteHandler = () => {
    emit('delete');
  };
</script>
