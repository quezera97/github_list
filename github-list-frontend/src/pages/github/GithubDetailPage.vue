<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="q-mx-xl">
    <q-card bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
      <q-card-section>
        <div class="text-h6">Github Details</div>
      </q-card-section>

      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Title</q-item-label>
            <q-item-label caption>
              Subhead
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section>
            lorem
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat>
            7:30PM
          </q-btn>
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>

</template>


<script setup lang="ts">
  import { ref } from 'vue';

  import Breadcrumb from '../../components/BreadcrumbComponent.vue';

  defineOptions({
    name: 'ToDoListPage'
  });

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Github List', to: '/github/list'},
    { label: 'Github Details'},
  ];
</script>
