import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('useErrorStore', () => {
  const errors = ref({});

  function isErrorExists() {
    return Object.keys(errors.value).length !== 0 && errors.value.constructor === Object
  }

  function emptyError() {
    errors.value = {};
  }

  function getMessage() {
    return errors.value.message;
  }

  return { errors, isErrorExists, emptyError, getMessage }
})
