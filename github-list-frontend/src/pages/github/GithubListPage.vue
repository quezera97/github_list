<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="q-mx-xl">
    <q-card bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
      <q-card-section>
        <div class="text-h6">Github List</div>
      </q-card-section>
      <q-list bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
        <q-item class="q-mb-lg" v-for="(item, index) in items" :key="item.id">
          <List
            :key="item.id"
            :repository="item.repository"
            :description="item.description"
            :meta="item.meta"
            :routeTo="`/github/detail/${item.id}`"
          />
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import Breadcrumb from '../../components/BreadcrumbComponent.vue';
  import List from '../../components/ListComponent.vue';

  defineOptions({
    name: 'ToDoListPage'
  });

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Github List'},
  ];

  const items = ref([
    {
      id: '1',
      repository: 'Repo 1',
      description: 'Description 1',
      meta: 'Meta 1',
    },
    {
      id: '2',
      repository: 'Repo 2',
      description: 'Description 2',
      meta: 'Meta 2',
    },
  ]);
</script>
