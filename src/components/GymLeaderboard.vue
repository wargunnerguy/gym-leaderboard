<template>
  <div class="container py-5 text-center">
    <!-- Logo with alternating background -->
    <div :class="['logo-wrapper', { 'with-background': logoHasBackground }]" class="mb-4">
      <img src="@/assets/ttk_logo.svg" alt="Gym Logo" class="logo mb-3" />
      <h1 class="text-center mb-2 title">Jõusaali edetabel</h1>
    </div>

    <div v-if="loading" class="text-center mb-4 text-white">Laeb, oota natsa, musi..</div>
    <div v-else class="row g-4">
      <ExerciseCard
          v-for="(exercise) in visibleExercises"
          :key="exercise.name"
          :title="exercise.name"
          :entries="formatEntries(exercise.name)"
          :hasBackground="false"
      />
    </div>
  </div>
</template>

<script>
import ExerciseCard from './ExerciseCard.vue';
import { useGymLeaderboardStore } from '@/stores/useGymLeaderboardStore';
import { computed, onMounted, ref } from 'vue';

export default {
  name: 'GymLeaderboard',
  components: { ExerciseCard },
  setup() {
    const gymLeaderboardStore = useGymLeaderboardStore();

    // Access the exercises directly from the store
    const exercises = computed(() => gymLeaderboardStore.exercises);
    const loading = computed(() => gymLeaderboardStore.loading);

    // Current index to track which pair of exercises is visible
    const currentIndex = ref(0);
    const visibleExercises = ref([]);
    const logoHasBackground = computed(() => currentIndex.value % 2 === 0);

    // Function to update the visible exercises (two at a time)
    const updateVisibleExercises = () => {
      visibleExercises.value = exercises.value.slice(currentIndex.value, currentIndex.value + 2);
      currentIndex.value = (currentIndex.value + 2) % exercises.value.length; // Loop back to the start
    };

    const formatEntries = (sheetName) => {
      if (gymLeaderboardStore.leaderboardData[sheetName]) {
        return gymLeaderboardStore.leaderboardData[sheetName].map((row) => ({
          name: row[10] || 'Unknown',
          score: row[3] || 'N/A',
          result_date: row[4] || 'N/A',
        }));
      }
      return [];
    };

    onMounted(() => {
      gymLeaderboardStore.startAutoRefetch(300000); // Start auto refetch every 120 seconds

      // Show the first two exercises initially
      updateVisibleExercises();

      // Change the visible exercises every 10 seconds
      setInterval(updateVisibleExercises, 13000);
    });

    return { loading, visibleExercises, formatEntries, logoHasBackground };
  },
};
</script>

<style scoped>
.title {
  color: white; /* Set the title text color to white */
}

/* Logo styling */
.logo {
  max-width: 250px; /* Adjust size of the logo */
  height: auto;
  display: block;
  margin: 0 auto; /* Center the logo */
}

/* Wrapper for the logo to alternate background */
.logo-wrapper {
  padding: 20px;
  border-radius: 3px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Same background style as exercise card */
.with-background {
  background-color: rgba(255, 255, 255, 0.1); /* 10% transparent white background */
}
</style>
