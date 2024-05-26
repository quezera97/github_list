<template>
  <Breadcrumb :breadcrumbs="breadcrumbs" />

  <div class="q-mx-xl">
    <q-card bordered class="rounded-borders q-pa-md" style="min-width: 100%;">
      <q-card-section>
        <div class="text-h6">Features</div>
      </q-card-section>

      <q-card-section>
        <q-item>
          <q-btn class="glossy" rounded color="deep-orange" label="Search by Github Username" @click="handleGithubUsernamePrompt"/>
        </q-item>

        <!-- Username prompt dialog -->
        <q-dialog v-model="promptStatus" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">{{ promptTitle }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="github_username" autofocus @keyup.enter="searchGithubUsername(github_username)" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Search" @click="searchGithubUsername(github_username)" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Search result dialog -->
        <q-dialog v-model="searchedGithubPromptStatus">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ github_username }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh; overflow-y: auto;" class="scroll">
              <q-list bordered class="rounded-borders">
                <q-item v-for="(item, index) in items" :key="item.github_id" class="q-mb-sm">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ item.repository }}</q-item-label>
                    <q-item-label caption lines="1" class="q-mb-md text-weight-bold">
                      <a :href="item.meta" target="_blank">{{ item.meta }}</a>
                    </q-item-label>
                    <q-item-label caption lines="1" class="q-mb-md text-body2">
                      {{ item.description ?? 'No Description Available'  }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn class="glossy" round color="deep-orange" icon="add" size="sm"
                      @click="() => addGithub(item.repository, item.description, item.meta)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat label="Close" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { api } from 'boot/axios';
  import { useQuasar } from 'quasar';
  import Breadcrumb from '../components/BreadcrumbComponent.vue';

  defineOptions({
    name: 'WelcomePage'
  });

  const $q = useQuasar();

  const promptStatus = ref(false);
  const github_username = ref('');
  const promptTitle = ref('Github Username');

  const searchedGithubPromptStatus = ref(false);

  const breadcrumbs = [
    { label: 'Home', to: '/' },
  ];

  const handleGithubUsernamePrompt = () => {
    promptStatus.value = true;
    github_username.value = 'quezera97';
    promptTitle.value = 'Github Username';
  };

  interface RepositoryProps {
    github_id: number;
    repository: string;
    description: string;
    meta: string;
  }

  const items = ref<RepositoryProps[]>([]);

  const searchGithubUsername = async (username: string) => {
    console.log('Searched username: ' + username);

    promptStatus.value = false;

    const dialog = $q.dialog({
      message: 'Fetching data... 0%',
      progress: true,
      persistent: true,
      ok: false
    });

    try {

      const response = await fetch(`https://api.github.com/users/${username}/repos`);

      if (!response.ok) {
        throw new Error('Failed to fetch user repositories');
      }

      const data = await response.json();

      let percentage = 0;
      const interval = setInterval(() => {
        percentage = Math.min(100, percentage + Math.floor(Math.random() * 22));
        dialog.update({
          message: `Fetching data... ${percentage}%`
        });

        if (percentage === 100) {
          clearInterval(interval);
          setTimeout(() => {
            dialog.hide();

            searchedGithubPromptStatus.value = true;
            items.value = transformData(data);
          }, 350);
        }
      }, 500);

    } catch (error) {
      console.error('Error fetching user repositories:', error);

      $q.notify({
        type: 'negative',
        message: 'Failed to fetch user repositories'
      });

      dialog.hide();
    }
  };

  const transformData = (data: any[]): RepositoryProps[] => {
    return data.map((item) => ({
      github_id: item.id,
      repository: item.name,
      description: item.description,
      meta: item.html_url,
    }));
  };

  const addGithub = async (repository: string, description: string, meta: string) => {
    try {
      const response = await api.post('/github-repos/create', {
        repository: repository,
        description: description,
        meta: meta,
      });

      console.log('Repo added:', response.data);

      $q.notify({
        type: 'positive',
        message: 'Github Repository successfully added',
      })

    } catch (error) {
      console.error('Error getting repo:', error);
    }
  };
</script>
