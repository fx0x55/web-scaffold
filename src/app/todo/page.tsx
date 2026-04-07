'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Learn Next.js App Router', completed: false },
    { id: 2, text: 'Master Tailwind CSS', completed: true },
    { id: 3, text: 'Use shadcn/ui components', completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 dark:bg-slate-950">
      <div className="mx-auto max-w-xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            My Tasks
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Built with React + Tailwind + shadcn/ui
          </p>
        </div>

        {/* Add Task */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Label htmlFor="new-task">Add New Task</Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="new-task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task content..."
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Task List */}
        <div className="mt-6 space-y-2">
          {tasks.length === 0 ? (
            <p className="py-12 text-center text-slate-400">No tasks yet, add one!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <span
                  className={`flex-1 ${
                    task.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 text-slate-400 transition-all group-hover:opacity-100 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {tasks.length > 0 && (
          <p className="mt-6 text-center text-sm text-slate-500">
            {tasks.length} total, {tasks.filter(t => t.completed).length} completed
          </p>
        )}
      </div>
    </div>
  )
}
