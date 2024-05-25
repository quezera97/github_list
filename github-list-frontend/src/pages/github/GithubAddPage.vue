<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="q-mx-xl">
    <q-card bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
      <q-card-section>
        <div class="text-h6">Add Github</div>
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
  import { ref } from 'vue';
  import { api } from 'boot/axios';
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router';

  import Breadcrumb from '../../components/BreadcrumbComponent.vue';

  defineOptions({
    name: 'ToDoAddPage'
  });

  const $q = useQuasar();
  const router = useRouter();

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Add Github Repository'},
  ];

  const repository = ref<string | null>(null);
  const description = ref<string | null>(null);
  const meta = ref<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/github-repos/create', {
        repository: repository.value,
        description: description.value,
        meta: meta.value,
      });

      console.log('Repo added:', response.data);

      await router.push('/github/list');

      $q.notify({
        type: 'positive',
        message: 'Github Repository successfully added',
      })

    } catch (error) {
      console.error('Error getting repo:', error);
    }

    handleReset();

  };

  const handleReset = () => {
    repository.value = null;
    description.value = null;
    meta.value = null;
  };
</script>
