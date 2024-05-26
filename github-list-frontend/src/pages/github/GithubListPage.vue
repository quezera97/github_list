<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="q-mx-xl">
    <q-card bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
      <q-card-section>
        <div class="text-h6">Github List</div>
      </q-card-section>
      <q-list bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
        <q-item class="q-mb-lg" v-if="items.length > 0" v-for="(item, index) in items" :key="item.id">
          <List
            :key="item.id"
            :repository="item.repository"
            :description="item.description || 'No Description Available'"
            :meta="item.meta || 'No Meta Available'"
            :routeTo="`/github/detail/${item.id}`"
            :routeToEdit="`/github/edit/${item.id}`"
            @delete="handleDelete(item.id)"
            @option="handleMoreOption(item.id)"
          />
        </q-item>
        <q-item v-else>
          <q-item-section>
            <q-item-label>No repositories available</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { api } from 'boot/axios';
  import { useQuasar } from 'quasar'

  import Breadcrumb from '../../components/BreadcrumbComponent.vue';
  import List from '../../components/ListComponent.vue';

  defineOptions({
    name: 'ToDoListPage'
  });

  const $q = useQuasar();

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Github Repository List'},
  ];

  interface RepositoryProps {
    id: number;
    repository: string;
    description: string;
    meta: string;
  }

  //initialize items array
  const items = ref<RepositoryProps[]>([]);

  onMounted(async () => {
    $q.loadingBar.start();

    try {
      const response = await api.get('/github-repos/all');
      items.value = response.data;
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      $q.loadingBar.stop();
    }
  });

  const handleMoreOption = (id: number) => {
    let grid = true;

    $q.bottomSheet({
      message: 'More Options',
      grid,
      actions: [
        {
          label: 'Drive',
          img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
          id: 'drive'
        },
        {
          label: 'Keep',
          img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
          id: 'keep'
        },
        {
          label: 'Google Hangouts',
          img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
          id: 'calendar'
        },
        {
          label: 'Calendar',
          img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
          id: 'calendar'
        },
        {},
        {
          label: 'Share',
          icon: 'share',
          id: 'share'
        },
        {
          label: 'Upload',
          icon: 'cloud_upload',
          color: 'primary',
          id: 'upload'
        },
        {},
        {
          label: 'John',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          id: 'john'
        }
      ]
    }).onOk(action => {
      console.log('Action chosen:', action.id)
    }).onCancel(() => {
      console.log('Dismissed')
    }).onDismiss(() => {
      console.log('I am triggered on both OK and Cancel')
    })
  }

  const handleDelete = (id: number) => {
    $q.dialog({
      title: 'Confirm',
      message: 'Would you like to delete the selected Github?',
      ok: {
        push: true
      },
      cancel: {
        push: true,
        color: 'negative'
      },
      persistent: true
    }).onOk( async () => {
      try {
        await api.delete(`/github-repos/${id}`);
        // Remove the item from the list
        items.value = items.value.filter(item => item.id !== id);
      } catch (error) {
        console.error('Failed to delete repository:', error);
      }
    }).onCancel(() => {
      console.log('Cancel')
    }).onDismiss(() => {
      console.log('I am triggered on both OK and Cancel')
    });
  };
</script>
