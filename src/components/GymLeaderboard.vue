<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Gym Leaderboard</h1>
    <button @click="fetchAllLeaderboards" class="btn btn-primary mb-4">Fetch All Leaderboards</button>
    <div v-if="loading" class="text-center mb-4">
      Loading...
    </div>
    <div v-else class="row g-4">
      <ExerciseCard
          v-for="(exercise, index) in exercises"
          :key="index"
          :title="exercise.name"
          :entries="formatEntries(exercise.name)"
          :hasBackground="index % 1 === 0"
      />
    </div>
  </div>
</template>

<script>
import ExerciseCard from './ExerciseCard.vue';
import { useGymLeaderboardStore } from '@/stores/useGymLeaderboardStore'; // Import the Pinia store
import { computed } from 'vue';

export default {
  name: 'GymLeaderboard',
  components: {
    ExerciseCard
  },
  setup() {
    const gymLeaderboardStore = useGymLeaderboardStore();

    // Array of exercise names representing different Google Sheet tabs
    const exercises = [
      { name: 'TOP Rinnalt surumine MAX (Mehed)' },
      { name: 'TOP Rinnalt surumine MAX (Naised)' },
      { name: 'Cooperi-test (Mehed)' },
      { name: 'Cooperi-test (Naised)' },
      { name: 'TOP Rinnalt surumine 50kg (Mehed)' },
      { name: 'TOP Rinnalt surumine 50kg (Naised)' },
      { name: 'TOP Kükk (Mehed)' },
      { name: 'TOP Kükk (Naised)'},
    ];

    // Computed property for loading state
    const loading = computed(() => gymLeaderboardStore.loading);

    // Function to get formatted entries for each exercise
    const formatEntries = (sheetName) => {
      if (gymLeaderboardStore.leaderboardData[sheetName]) {
        return gymLeaderboardStore.leaderboardData[sheetName].map((row) => {
          return {
            name: row[10] || 'Unknown', // Extracting participant's name from the first index
            score: row[3] || 'N/A', // Extracting score from the fourth index (or change the index based on your data structure)
            result_date: row[4] || 'N/A' // Extracting score from the fourth index (or change the index based on your data structure)
          };
        });
      }
      return [];
    };

    // Method to fetch data for all exercises
    const fetchAllLeaderboards = async () => {
      for (const exercise of exercises) {
        // Set the sheet name for each exercise
        gymLeaderboardStore.setSheet(exercise.name);
        // Fetch the leaderboard data for this sheet
        await gymLeaderboardStore.fetchLeaderboardData();
      }
    };

    return {
      fetchAllLeaderboards,
      loading,
      exercises,
      formatEntries
    };
  }
};
</script>

<style scoped>
h1 {
  font-family: 'DIN', Roboto, sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  color: white !important;
  letter-spacing: 2px;
}
</style>
