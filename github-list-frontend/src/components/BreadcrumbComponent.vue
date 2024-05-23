<template>
  <div class="q-pa-md q-gutter-sm q-mb-lg">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.label"
        :label="breadcrumb.label"
        :to="breadcrumb.to"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Breadcrumb'
  });

  interface BreadcrumbProps {
    label: string;
    to?: string;
  };

  defineProps<{
    breadcrumbs: BreadcrumbProps[];
  }>();
</script>
