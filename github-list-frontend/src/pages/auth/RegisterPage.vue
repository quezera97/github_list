<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg shadow-16" style="width: 400px; max-width: 90vw; margin: 20px;">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleRegister">
          <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            :rules="[ val => !!val || 'Username is required' ]"
            autofocus
          />
          <q-input
            filled
            v-model="email"
            type="email"
            label="Email"
            lazy-rules
            :rules="[ val => !!val || 'Email is required' ]"
            class="q-mt-md"
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
          <q-input
            filled
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            lazy-rules
            :rules="[val => val === password || 'Passwords do not match']"
            class="q-mt-md"
          />
          <q-btn type="submit" label="Register" color="primary" class="q-mt-lg" />
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
    name: 'RegisterPage'
  });

  const $q = useQuasar();

  const username = ref<string | null>(null);
  const email = ref<string | null>(null);
  const password = ref<string | null>(null);
  const confirmPassword = ref<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await api.post('/users', {
        username: username.value,
        email: email.value,
        password: password.value,
      });

      $q.notify({
        type: 'positive',
        message: response.data.message
      });

      await api.post('/mails/send', {
        receiver: email.value ?? 'test@test.com',
        subject: 'test_subject',
        message: 'test_message'
      });

    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error creating user'
      });
    }
  };
</script>
