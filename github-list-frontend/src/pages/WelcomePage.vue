<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />
  <q-page class="row items-center justify-evenly">
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Breadcrumb from '../components/BreadcrumbComponent.vue';

  defineOptions({
    name: 'WelcomePage'
  });

  const breadcrumbs = [
    { label: 'Home', to: '/' },
  ];
</script>
