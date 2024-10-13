<template>
  <div class="col-6">
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
            :key="`entry-${index}`"
        >
          <!-- Rank Container -->
          <div class="rank-container">
            <div v-if="index === 0" class="medal gold">🥇</div>
            <div v-else-if="index === 1" class="medal silver">🥈</div>
            <div v-else-if="index === 2" class="medal bronze">🥉</div>
            <div v-else class="rank">{{ index + 1 }}</div>
          </div>

          <!-- Player Details -->
          <div class="player-details">
            <div :class="['player-name', nameSizeClass(index)]">{{ entry.name }}</div>
          </div>

          <!-- Player Score -->
          <div class="player-score">{{ entry.score }}</div>

          <!-- Result Date (New Column) -->
          <div class="result-date">{{ entry.result_date }}</div>
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
      default: () => []
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
      return this.entries.slice(0, 10);
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
        this.limitedEntries.forEach((_, index) => {
          setTimeout(() => {
            this.visibleEntriesCount = index + 1;
          }, (index + 1) * 100); // Delay each entry by 100ms
        });
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

.leaderboard-card {
  padding: 20px;
  border-radius: 3px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.with-background {
  background-color: rgba(255, 255, 255, 0.1); /* 10% transparent white background */
}

.card-title {
  text-align: center;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 20px;
}

.leaderboard-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid white;
}

.leaderboard-entry:last-child {
  border-bottom: none;
}

.rank-container {
  flex-shrink: 0;
  text-align: center;
  width: 40px;
}

.rank {
  font-size: 1.2rem;
  color: white;
}

.medal {
  font-size: 1.5rem;
}

.gold {
  color: gold;
}

.silver {
  color: silver;
}

.bronze {
  color: #cd7f32;
}

.player-details {
  flex-grow: 1;
  margin-left: 15px;
  text-align: left;
}

.player-name {
  font-weight: bold;
  color: white;
}

.player-name.first-place {
  font-size: 1.6rem;
  color: gold;
}

.player-name.second-place {
  font-size: 1.5rem;
  color: silver;
}

.player-name.third-place {
  font-size: 1.4rem;
  color: #cd7f32;
}

.player-name.regular-place {
  font-size: 1.2rem;
}

.player-score {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-align: right;
  margin-right: 15px; /* Add space between score and result date */
}

.result-date {
  font-size: 0.9rem;
  color: #ccc; /* A softer color to differentiate the date */
  text-align: right;
  margin-left: 15px;
}
</style>
