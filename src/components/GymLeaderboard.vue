<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Gym Leaderboard</h1>
    <button @click="fetchLeaderboardData" class="btn btn-primary mb-4">Fetch Leaderboard</button>
    <div v-if="loading" class="text-center mb-4">
      Loading...
    </div>
    <div v-else class="row g-4">
      <ExerciseCard
          v-for="(entry, index) in leaderboardData"
          :key="index"
          :title="entry[0]"
      :entries="entry.slice(1)"
      :hasBackground="index % 2 === 0"
      />
    </div>
  </div>
</template>

<script>
import ExerciseCard from './ExerciseCard.vue';
import { useGymLeaderboardStore } from '@/stores/useGymLeaderboardStore'; // Import the Pinia store

export default {
  name: 'GymLeaderboard',
  components: {
    ExerciseCard
  },
  setup() {
    const gymLeaderboardStore = useGymLeaderboardStore();
    return {
      fetchLeaderboardData: gymLeaderboardStore.fetchLeaderboardData,
      leaderboardData: gymLeaderboardStore.leaderboardData,
      loading: gymLeaderboardStore.loading
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
