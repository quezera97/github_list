<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="height: 55px;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          <router-link to="/" class="text-h6" style="text-decoration: none; color: inherit;">
            Github List
            <q-badge outline align="middle" color="orange">
              by Quasar
            </q-badge>
          </router-link>
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <Banner
        :bannerClass="addClass"
        :bannerMessage="addMessage"
        :buttonLabel="addLabel"
        @banner-click="handleBannerButtonClick"
      />

      <FloatingButton :fabs="fabConfig" fab-color="blue" fab-direction="up" />

      <router-view />

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import EssentialLink from '../components/EssentialLink.vue';
  import Banner from '../components/BannerComponent.vue';
  import GroupedButton from '../components/GroupedButtonComponent.vue';
  import FloatingButton from '../components/FloatingButtonComponent.vue';

  const router = useRouter();

  defineOptions({
    name: 'MainLayout'
  });

  const leftDrawerOpen = ref(false);

  function toggleLeftDrawer () {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }

  const linksList = ref([
    {
      title: 'Components Docs',
      caption: 'Component By Quasar',
      icon: 'school',
      link: 'https://quasar.dev/components'
    },
  ]);

  //for banner
  const addClass = ref('text-white bg-red');
  const addMessage = ref('You have lost connection to the internet. This app is offline.');
  const addLabel = ref('Turn ON Wifi');

  const handleBannerButtonClick = () => {
    addClass.value = 'text-white bg-amber';
    addLabel.value = 'Retry';
    addMessage.value = 'Trying to reconnect...';
  }

  //for grouped button
  const authButtonConfig = ref([
    {
      color: 'yellow',
      glossy: true,
      textColor: 'black',
      push: true,
      label: 'Login',
      icon: 'person',
      actionHandler: () => {
        router.push('/auth/login');
      },
    },
    {
      color: 'amber',
      glossy: true,
      textColor: 'black',
      push: true,
      label: 'Register',
      icon: 'person_add',
      actionHandler: () => {
        router.push('/auth/register');
      },
    },
  ]);

  //for floating action button
  const fabConfig = ref([
    {
      color: 'green',
      glossy: true,
      textColor: 'white',
      icon: 'add',
      actionHandler: () => {
        router.push('/github/add');
      },
    },
    {
      color: 'indigo',
      glossy: true,
      textColor: 'white',
      icon: 'list',
      actionHandler: () => {
        router.push('/github/list');
      },
    },
  ]);
</script>
