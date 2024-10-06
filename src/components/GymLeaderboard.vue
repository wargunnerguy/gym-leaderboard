<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Gym Leaderboard</h1>
    <!-- Use one transition-group to animate the rows together -->
    <transition name="fade-slide" mode="out-in">
      <div class="row g-4" v-if="!isFadingOut">
        <ExerciseCard
            v-for="(leaderboard, index) in displayedLeaderboards"
            :key="leaderboard.exercise"
            :title="leaderboard.exercise"
            :entries="leaderboard.entries"
            :hasBackground="index % 2 === 0"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import ExerciseCard from './ExerciseCard.vue';

export default {
  name: 'GymLeaderboard',
  components: {
    ExerciseCard
  },
  data() {
    return {
      leaderboards: [
        {
          exercise: 'Bench Press',
          entries: [
            { name: 'John Doe', score: 150 },
            { name: 'Reimo Smith', score: 140 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Paul Smith', score: 141 }
          ]
        },
        {
          exercise: 'Squat 80kg reps',
          entries: [
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Anna Bell', score: 180 },
            { name: 'Chris Evans', score: 175 },
            { name: 'Sara Connor', score: 170 }
          ]
        },
        {
          exercise: 'Deadlift',
          entries: [
            { name: 'Chris Evans', score: 200 },
            { name: 'Sara Connor', score: 180 },
            { name: 'Anna Bell', score: 160 }
          ]
        },
        {
          exercise: 'Squat MAX',
          entries: [
            { name: 'Tanel Smith', score: 190 },
            { name: 'Jaanus Smith', score: 180 },
            { name: 'Tere Smith', score: 170 }
          ]
        },
        {
          exercise: 'Bench Press 50kg reps',
          entries: [
            { name: 'Paul Smith', score: 155 },
            { name: 'Ene Smith', score: 145 },
            { name: 'Tanel Smith', score: 135 }
          ]
        }
      ],
      currentIndex: 0,
      groupSize: 3, // Show only 3 exercise cards at a time
      isFadingOut: false // Controls when the content is fading out
    };
  },
  computed: {
    filteredLeaderboards() {
      return this.leaderboards.filter(leaderboard => leaderboard.entries && leaderboard.entries.length > 0);
    },
    displayedLeaderboards() {
      return this.filteredLeaderboards.slice(this.currentIndex, this.currentIndex + this.groupSize);
    }
  },
  mounted() {
    this.startCycle();
  },
  methods: {
    startCycle() {
      setInterval(() => {
        this.initiateTransition();
      }, 8000); // Cycle every 8 seconds
    },
    initiateTransition() {
      // Start fade out
      this.isFadingOut = true;

      // Wait for fade out to complete (match CSS transition duration)
      setTimeout(() => {
        this.cycleLeaderboard();
      }, 1000); // Match fade-out duration
    },
    cycleLeaderboard() {
      // Update index for next set
      this.currentIndex += this.groupSize;
      if (this.currentIndex >= this.filteredLeaderboards.length) {
        this.currentIndex = 0; // Loop back to the start
      }

      // Delay the fade-in until the old row is completely gone
      setTimeout(() => {
        this.isFadingOut = false; // Trigger fade-in for the new content
      }, 500); // Delay before fading in the new row (adjust as needed)
    }
  }
};
</script>

<style scoped>
/* Transition for smooth fade and slide */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fade-slide-enter {
  opacity: 0;
  transform: translateY(20px); /* Incoming row slides up from 20px below */
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0); /* Row ends at its normal position */
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(0); /* Outgoing row stays in place while fading out */
}

h1 {
  font-family: 'DIN', Roboto, sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  color: white !important;
  letter-spacing: 2px;
}
</style>
