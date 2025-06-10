import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TodoCategory } from '@/types/todo-types'

export const useTodoStore = defineStore('todo', () => {
  const todoCategory = ref<TodoCategory[]>([])

  function loadFromStorage() {
    const saved = localStorage.getItem('todoCategory')
    if (saved) {
      try {
        todoCategory.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved TODOs:', e)
      }
    }
  }

  function saveToStorage() {
    localStorage.setItem('todoCategory', JSON.stringify(todoCategory.value))
  }

  return {
    todoCategory,
    loadFromStorage,
    saveToStorage,
  }
})
