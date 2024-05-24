<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="q-mx-xl">
    <q-card bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
      <q-card-section>
        <div class="text-h6">Github Details</div>
      </q-card-section>

      <q-card-section v-if="repository">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ repository.repository }}</q-item-label>
            <q-item-label caption>
              {{ repository.meta ?? 'No Meta Available' }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class="col-4">
            {{ repository.description ?? 'No Description Available' }}
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-item-label>
            {{ formattedDate(repository.created_at) }}
          </q-item-label>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>

</template>


<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { api } from 'boot/axios';
  import { format } from 'date-fns';

  import Breadcrumb from '../../components/BreadcrumbComponent.vue';

  defineOptions({
    name: 'ToDoListPage'
  });

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Github Repository List', to: '/github/list'},
    { label: 'Github Repository Details'},
  ];

  const route = useRoute();
  const repository = ref(null);

  const formattedDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy - hh:mm a");
  };

  onMounted(async () => {
    const id = route.params.id;

    try {
      const response = await api.get(`/github-repos/${id}`);
      repository.value = response.data;
    } catch (error) {
      console.error('Failed to fetch repository details:', error);
    }
  });
</script>
