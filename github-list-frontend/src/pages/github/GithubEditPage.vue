<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="q-mx-xl">
    <q-card bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
      <q-card-section>
        <div class="text-h6">Edit Github</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleSubmit" @reset="handleReset" class="q-gutter-md">
          <q-input
            filled
            v-model="editedRepository"
            label="Repository"
            hint="Github Repository"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Repository is required']"
            autofocus
          />
          <q-input
            filled
            v-model="editedDescription"
            label="Description"
            hint="Repository Description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Description is required']"
          />
          <q-input
            filled
            v-model="editedMeta"
            label="Meta"
            hint="Repository Meta"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Meta is required']"
          />

          <div class="q-mt-xl">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { api } from 'boot/axios';

  import Breadcrumb from '../../components/BreadcrumbComponent.vue';

  defineOptions({
    name: 'ToDoAddPage'
  });

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Github Repository List', to: '/github/list'},
    { label: 'Edit Github Repository'},
  ];

  const route = useRoute();

  const editedRepository = ref('');
  const editedDescription = ref('');
  const editedMeta = ref('');

  const id = route.params.id;

  onMounted(async () => {
    try {
      const response = await api.get(`/github-repos/${id}`);

      const { repository, description, meta } = response.data;
      editedRepository.value = repository;
      editedDescription.value = description;
      editedMeta.value = meta;
    } catch (error) {
      console.error('Failed to fetch repository details:', error);
    }
  });

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/github-repos/${id}`, {
        repository: editedRepository.value,
        description: editedDescription.value,
        meta: editedMeta.value
      });

      console.log('Repo edited:', response.data);

    } catch (error) {
      console.error('Error getting repo:', error.message);
    }
  };

  const handleReset = () => {
    editedRepository.value = null;
    editedDescription.value = null;
    editedMeta.value = null;
  };
</script>
