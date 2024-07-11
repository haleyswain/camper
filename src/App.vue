<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="sticky-nav">
        <RouterLink to="/" class="nav-button">Home</RouterLink>
        <RouterLink to="/explore-parks-by-state" class="nav-button">Explore Parks By State</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

/* Sticky navigation bar styling */
.sticky-nav {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: center; /* Centers the buttons horizontally */
  gap: 10px; /* Adds space between the buttons */
  z-index: 1000; /* Ensures the nav is above other elements */
}

.nav-button {
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

@media (min-width: 1024px) {
  header {
    display: flex;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
