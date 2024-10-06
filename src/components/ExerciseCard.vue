<template>
  <div class="col-lg-4 col-md-6">
    <div :class="['leaderboard-card', { 'with-background': hasBackground }]">
      <!-- Title transition -->
      <transition name="fade-title">
        <h5 v-if="showTitle" class="card-title text-center">{{ title }}</h5>
      </transition>

      <!-- Transition for each leaderboard entry -->
      <transition-group name="fade-stagger" tag="div">
        <div
            class="leaderboard-entry"
            v-for="(entry, index) in visibleEntries"
            :key="index"
        >
          <div class="rank-container">
            <div v-if="index === 0" class="medal gold">🥇</div>
            <div v-else-if="index === 1" class="medal silver">🥈</div>
            <div v-else-if="index === 2" class="medal bronze">🥉</div>
            <div v-else class="rank">{{ index + 1 }}</div>
          </div>
          <div class="player-details">
            <div :class="['player-name', nameSizeClass(index)]">{{ entry.name }}</div>
          </div>
          <div class="player-score">{{ entry.score }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    title: String,
    entries: {
      type: Array,
      required: true,
      default: () => []  // Ensure default is an empty array if entries is not provided
    },
    hasBackground: Boolean
  },
  data() {
    return {
      showTitle: false,
      visibleEntriesCount: 0
    };
  },
  computed: {
    limitedEntries() {
      return Array.isArray(this.entries) ? this.entries.slice(0, 10) : []; // Ensure entries is an array before slicing
    },
    visibleEntries() {
      return this.limitedEntries.slice(0, this.visibleEntriesCount);
    }
  },
  mounted() {
    // Start the staggered fade-in animation for the title and entries
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      // First, show the title
      setTimeout(() => {
        this.showTitle = true;

        // Then show each entry with a delay between them
        for (let i = 0; i < this.limitedEntries.length; i++) {
          setTimeout(() => {
            this.visibleEntriesCount++;
          }, (i + 1) * 100); // Delay each entry by 100ms
        }
      }, 200); // Delay the title fade-in slightly for effect
    },
    nameSizeClass(index) {
      if (index === 0) return "first-place";
      if (index === 1) return "second-place";
      if (index === 2) return "third-place";
      return "regular-place";
    }
  }
};
</script>

<style scoped>
/* Transition for title fade-in */
.fade-title-enter-active,
.fade-title-leave-active {
  transition: opacity 0.8s ease;
}

.fade-title-enter,
.fade-title-leave-to {
  opacity: 0;
}

/* Staggered fade-in for entries */
.fade-stagger-enter-active,
.fade-stagger-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-stagger-enter,
.fade-stagger-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Slide in from below */
}

/* Additional styles unchanged */
</style>
