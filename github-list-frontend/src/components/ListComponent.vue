<template>
    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{ repository }}</span>
        <span class="text-grey-8"> - {{ description }}</span>
      </q-item-label>
      <q-item-label caption lines="1" class="q-mb-md">
        {{ meta }}
      </q-item-label>
      <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
        <router-link :to="routeTo" style="text-decoration: none; color: inherit;">
            Details
          </router-link>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" color="red" size="12px" flat dense round icon="delete" />
        <q-btn class="gt-xs" color="green" size="12px" flat dense round icon="done" />
        <q-btn size="12px" color="blue" flat dense round icon="more_vert" />
      </div>
    </q-item-section>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'List'
  });

  interface ListProps {
    repository: string;
    description: string;
    meta: string;
    routeTo: string;
  }

  defineProps<ListProps>();
</script>
