<script setup>
import HeaderButton from "../components/HeaderButton.vue";
</script>

<template>
  <main class="min-h-screen min-w-min space-y-10 bg-slate-100 p-1 md:p-8">
    <header
      class="tail flex justify-center rounded-3xl bg-white p-2 drop-shadow-xl"
    >
      <div
        class="container flex flex-col justify-around gap-2 p-2 text-4xl md:flex-row"
      >
        <header-button> Developers </header-button>
        <header-button> Genres </header-button>
        <header-button> Games </header-button>
      </div>
    </header>

    <section
      class="tail flex justify-center rounded-3xl bg-white p-2 drop-shadow-xl"
    >
      <p class="text-4xl">Hello</p>
    </section>
  </main>
</template>
