<script setup>
import HeaderButton from "./HeaderButton.vue";
</script>
<template>
  <header
    class="tail flex justify-center rounded-3xl bg-white p-2 drop-shadow-xl"
  >
    <div
      class="container flex flex-col justify-around gap-2 p-2 text-4xl md:flex-row"
    >
      <router-link to="/developers">
        <header-button> Developers </header-button>
      </router-link>

      <router-link to="/genres">
        <header-button> Genres </header-button>
      </router-link>

      <router-link to="/games">
        <header-button> Games </header-button>
      </router-link>
    </div>
  </header>
</template>
