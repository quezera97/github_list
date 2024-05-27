<template>
  <q-btn-group v-if="!localStorageValue" push>
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
  <q-btn-group v-else>
    <q-btn class="glossy" text-color="black"color="green" label="Logout" icon="logout" @click="handleLogout"/>
  </q-btn-group>
</template>

<script setup lang="ts">
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'

  defineOptions({
    name: 'GroupedButton'
  });

  const $q = useQuasar();
  const router = useRouter();

  const key = 'authToken';
  const localStorageValue = $q.localStorage.getItem(key) ?? null;

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

  const handleLogout = async () => {
    const key = 'authToken';

    $q.localStorage.remove(key);
    $q.sessionStorage.remove(key);

    await router.push('/auth/login');

    $q.notify({
      type: 'positive',
      message: 'Successfully logged out',
    });
  }
</script>
