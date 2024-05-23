<template>
  <q-btn-group push>
    <q-btn
      v-for="(button, index) in buttons"
      :key="index"
      :color="button.color"
      :glossy="button.glossy"
      :text-color="button.textColor"
      :push="button.push"
      :label="button.label"
      :icon="button.icon"
      @click="button.actionHandler"
    />
  </q-btn-group>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'GroupedButton'
  });

  interface GroupedButtonProps {
    color: string;
    glossy: boolean;
    textColor: string;
    push: boolean;
    label: string;
    icon: string;
    actionHandler: Function;
  }

  defineProps<{
    buttons: GroupedButtonProps[];
  }>();
</script>
