<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="height: 55px;">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-h6" style="text-decoration: none; color: inherit;">
            Github List
            <q-badge outline align="middle" color="orange">
              by Quasar
            </q-badge>
          </router-link>
        </q-toolbar-title>

        <GroupedButton :buttons="authButtonConfig"/>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <Banner
        :bannerClass="addClass"
        :bannerMessage="addMessage"
        :showButton="addShowButton"
        :buttonLabel="addLabel"
        @banner-click="updateStatus"
      />

      <router-view />

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Banner from 'components/BannerComponent.vue';
  import GroupedButton from 'components/GroupedButtonComponent.vue';

  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  defineOptions({
    name: 'AuthLayout'
  });

  //for banner
  const addClass = ref('text-white bg-red');
  const addMessage = ref('You have lost connection to the internet. This app is offline.');
  const addShowButton = ref(true);
  const addLabel = ref('Retry');

  onMounted(() => {
    updateStatus();
  });

  const updateStatus = () => {
    if (navigator.onLine) {
      showOnline();
    } else {
      showOffline();
    }
  };

  const showOffline = () => {
    addClass.value = 'text-white bg-red';
    addLabel.value = 'Retry';
    addShowButton.value = true;
    addMessage.value = 'You have lost connection to the internet. This app is offline.';
  }

  const showOnline = () => {
    addClass.value = 'text-white bg-green';
    addLabel.value = 'Retry';
    addShowButton.value = true;
    addMessage.value = 'You have connected to the internet. This app is online.';
  }

  //for grouped button
  const authButtonConfig = [
    {
      color: 'yellow',
      glossy: true,
      textColor: 'black',
      push: true,
      label: 'Login',
      icon: 'person',
      actionHandler: handleLogin,
    },
    {
      color: 'amber',
      glossy: true,
      textColor: 'black',
      push: true,
      label: 'Register',
      icon: 'person_add',
      actionHandler: handleRegister,
    },
  ];
</script>
