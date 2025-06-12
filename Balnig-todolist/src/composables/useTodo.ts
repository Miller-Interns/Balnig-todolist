import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo-store'
import type { TodoCategory, TodoItem } from '@/types/todo-types'

export function useTodo() {
  const store = useTodoStore()
  const todoCategory = ref<TodoCategory[]>(store.todoCategory)
  const newCategory = ref('')
  const newTodoItem = reactive<Record<number, string>>({})

  onMounted(() => {
    store.loadFromStorage()
    todoCategory.value = store.todoCategory  
  })

  watch(
    () => store.todoCategory,
    () => {
      store.saveToStorage()
      todoCategory.value = store.todoCategory 
    },
    { deep: true }
  )

  let id = 0;
  const generateId = () => ++id;

  function addCategory () {
    if (!newCategory.value.trim()) return
    const newId = generateId()
    todoCategory.value.push({
      id: newId,
      title: newCategory.value.trim(),
      items: []
    })
    newCategory.value = ''
    store.todoCategory = todoCategory.value  
  }

  function deleteCategory(categoryId: number) {
    todoCategory.value = todoCategory.value.filter(cat => cat.id !== categoryId)
    delete newTodoItem[categoryId]
    store.todoCategory = todoCategory.value
  }

  function editCategory(categoryId: number, newTitle: string) {
    const cat = todoCategory.value.find(cat => cat.id === categoryId)
    if (cat) cat.title = newTitle.trim()
    store.todoCategory = todoCategory.value
  }

  function addTodoItem(categoryId: number) {
    const title = newTodoItem[categoryId]?.trim()
    if (!title) return
    const cat = todoCategory.value.find(cat => cat.id === categoryId)
    if (cat) {
      cat.items.push({
        id: generateId(),
        title,
        done: false
      })
    }
    newTodoItem[categoryId] = ''
    store.todoCategory = todoCategory.value
  }

  function delTodoItem(categoryId: number, itemId: number) {
    const cat = todoCategory.value.find(cat => cat.id === categoryId)
    if (cat) {
      cat.items = cat.items.filter(item => item.id !== itemId)
    }
    store.todoCategory = todoCategory.value
  }

  function editTodoItem(categoryId: number, itemId: number, newTitle: string) {
    const cat = todoCategory.value.find(cat => cat.id === categoryId)
    const item = cat?.items.find(item => item.id === itemId)
    if (item) item.title = newTitle.trim()
    store.todoCategory = todoCategory.value
  }

  function toggleTodoItem(categoryId: number, itemId: number) {
    const cat = todoCategory.value.find(cat => cat.id === categoryId)
    const item = cat?.items.find(item => item.id === itemId)
    if (item) item.done = !item.done
    store.todoCategory = todoCategory.value
  }

  const allTodoItems = computed(() => {
    return todoCategory.value.flatMap(cat =>
      cat.items.map(item => ({ ...item, categoryId: cat.id }))
    )
  })

  return {
    todoCategory,
    newCategory,
    newTodoItem,
    addCategory,
    deleteCategory,
    editCategory,
    addTodoItem,
    delTodoItem,
    editTodoItem,
    toggleTodoItem,
    allTodoItems
  }
}
