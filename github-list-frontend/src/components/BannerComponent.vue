
<template>
  <q-banner :class="bannerClass" inline-actions>
    {{ bannerMessage }}
    <template v-slot:action>
      <q-btn flat color="white" :label="buttonLabel" @click="actionHandler" />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue';

  const emit = defineEmits(['banner-click']);

  defineOptions({
    name: 'Banner'
  });

  interface BannerProps {
    bannerClass: string;
    bannerMessage: string;
    buttonLabel: string;
  }

  const props = defineProps<BannerProps>();

  const actionHandler = () => {
    emit('banner-click');
  };
</script>

