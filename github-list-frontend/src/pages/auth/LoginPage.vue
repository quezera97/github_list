<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg shadow-16" style="width: 400px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleLogin">
          <q-input
            filled
            v-model="email"
            type="email"
            label="Email"
            lazy-rules
            :rules="[ val => !!val || 'Email is required' ]"
            autofocus
          />
          <q-input
            filled
            v-model="password"
            type="password"
            label="Password"
            lazy-rules
            :rules="[ val => !!val || 'Password is required' ]"
            class="q-mt-md"
          />
          <q-btn type="submit" label="Login" color="primary" class="q-mt-lg" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { api } from 'boot/axios';
  import { useQuasar } from 'quasar'

  defineOptions({
    name: 'LoginPage'
  });

  const $q = useQuasar();

  const email = ref<string | null>(null);
  const password = ref<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await api.post('/login/user', {
        email: email.value,
        password: password.value,
      });

      let key = 'authToken';
      let value = 'this_is_auth_token';

      $q.localStorage.set(key, value)
      const localStorageValue = $q.localStorage.getItem(key);

      $q.sessionStorage.set(key, value)
      const sessionStorageValue = $q.sessionStorage.getItem(key);

      console.log('Local Storage:', localStorageValue);
      console.log('Session Storage:', sessionStorageValue);
      console.log('User logged in:', response.data);

      email.value = '';
      password.value = '';
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };
</script>
<!-- kubohe@mailinator.com -->
<!-- Pa$$w0rd! -->
