<template>
    <q-fab :color="fabColor" icon="keyboard_arrow_up" :direction="fabDirection" class="fab" glossy>
      <q-fab-action
        v-for="(fab, index) in fabs"
        :key="index"
        :color="fab.color"
        :glossy="fab.glossy"
        :text-color="fab.textColor"
        :icon="fab.icon"
        @click="fab.actionHandler"
      />
    </q-fab>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'FloatingButton'
  });

  interface Button {
    color: string;
    icon: string;
    textColor: string;
    glossy: boolean;
    actionHandler: Function;
  }

  interface FloatingButtonProps {
    fabColor: string;
    fabDirection: 'up' | 'right' | 'down' | 'left';
    fabs: Button[];
  }

  withDefaults(defineProps<FloatingButtonProps>(), {
    fabColor: 'red',
    fabDirection: 'up',
  });
</script>

<style scoped>
  .fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
</style>
