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
            v-model="repository"
            label="Repository"
            hint="Github Repository"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Repository is required']"
            autofocus
          />
          <q-input
            filled
            v-model="description"
            label="Description"
            hint="Repository Description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Description is required']"
          />
          <q-input
            filled
            v-model="meta"
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

  const repository = ref<string | null>(null);
  const description = ref<string | null>(null);
  const meta = ref<string | null>(null);

  const id = route.params.id;

  onMounted(async () => {
    try {
      const response = await api.get(`/github-repos/${id}`);

      const {
        repository: repo,
        description: desc,
        meta: metaData
      } = response.data;

      repository.value = repo;
      description.value = desc;
      meta.value = metaData;

    } catch (error) {
      console.error('Failed to fetch repository details:', error);
    }
  });

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/github-repos/${id}`, {
        repository: repository.value,
        description: description.value,
        meta: meta.value
      });

      console.log('Repo edited:', response.data);

    } catch (error) {
      console.error('Error getting repo:', error);
    }
  };

  const handleReset = () => {
    repository.value = null;
    description.value = null;
    meta.value = null;
  };
</script>
