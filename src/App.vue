<template>
  <div id="app">
    <GymLeaderboard />
  </div>
</template>

<script>
import GymLeaderboard from './components/GymLeaderboard.vue';

export default {
  name: 'App',
  components: {
    GymLeaderboard
  }
};
</script>

<style>
/* Global Styles for Dark Blue to Black Gradient */
/* Ensure the gradient background applies to the entire page */
html, body {
  height: 100%; /* Ensure the body and html take full height */
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  background-size: cover; /* Ensures the gradient covers the entire background */
  background-attachment: fixed; /* Fixes the background in place while scrolling */
  background-repeat: no-repeat;
  background-position: center;
  overflow-x: hidden; /* Prevents horizontal scroll */
}

.container {
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
}


body {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: white;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

/* App Container */
#app {
  text-align: center;
  padding-top: 60px;
}

/* Custom Card Styling for Dark Theme */
.card {
  background-color: #1e1e1e !important; /* Dark background for cards */
  border: none;
  color: #ffffff; /* Ensure text is white for readability */
}

.card-title {
  font-size: 1.5rem;
  color: #ffc107; /* Gold color for titles for better contrast */
}

.list-group-item {
  background-color: #2e2e2e !important; /* Dark background for list group items */
  color: #ffffff; /* White text for better readability */
  border-color: #444;
}

.list-group-item span {
  color: #ffffff; /* Ensure spans inside list items are white */
}

/* Additional Styling for Headers and Horizontal Rules */
h1, h5 {
  color: #ffc107; /* Gold color for headings for contrast */
  font-weight: bold;
}

hr {
  border-color: #444;
}
</style>
