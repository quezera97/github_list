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

  defineOptions({
    name: 'LoginPage'
  });

  const email = ref<string | null>(null);
  const password = ref<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await api.get('/users', {
        email: email.value,
        password: password.value,
      });

      console.log('User created:', response.data);

      email.value = '';
      password.value = '';
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };
</script>
