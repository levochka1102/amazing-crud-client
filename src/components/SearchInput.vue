<script setup>
defineEmits(["onSubmit", "update:modelValue"]);
defineProps({
    modelValue: String
})
</script>

<template>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search By
        Name</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        </div>
        <input required type="text" name="search" placeholder="Search By Name" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="peer mt-3 block w-full border-b-2 border-gray-300 text-4xl px-2 py-4 placeholder-transparent focus:border-accent-turquoise-common focus:outline-none" />
        <label for="search"
            class="pointer-events-none absolute left-2 -top-3 block text-2xl font-medium text-gray-600 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:left-2 peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-2xl peer-focus:text-gray-600">Search
            By Name</label>
        <button @click="$emit('onSubmit')" type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</template>