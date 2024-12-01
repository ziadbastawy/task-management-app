import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '../types/Task'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tasks.value.push(newTask)
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const taskIndex = tasks.value.findIndex(task => task.id === id)
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        ...updates,
        updatedAt: new Date()
      }
    }
  }

  const deleteTask = (id: string) => {
    const taskIndex = tasks.value.findIndex(task => task.id === id)
    if (taskIndex !== -1) {
      tasks.value.splice(taskIndex, 1)
    }
  }

  const getTaskById = (id: string) => {
    return tasks.value.find(task => task.id === id)
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  }
})
