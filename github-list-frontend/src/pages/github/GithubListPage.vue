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
            :description="item.description || 'No Description Available'"
            :meta="item.meta || 'No Meta Available'"
            :routeTo="`/github/detail/${item.id}`"
            :routeToEdit="`/github/edit/${item.id}`"
            @delete="handleDelete(item.id)"
          />
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { api } from 'boot/axios';

  import Breadcrumb from '../../components/BreadcrumbComponent.vue';
  import List from '../../components/ListComponent.vue';

  defineOptions({
    name: 'ToDoListPage'
  });

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Github Repository List'},
  ];

  //initialize items
  const items = ref([]);

  onMounted(async () => {
    try {
      const response = await api.get('/github-repos/all');
      items.value = response.data;
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  });

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/github-repos/${id}`);
      // Remove the item from the list
      items.value = items.value.filter(item => item.id !== id);
    } catch (error) {
      console.error('Failed to delete repository:', error);
    }
  };
</script>
