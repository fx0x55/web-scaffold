'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    setTasks(
      tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-md">
        {/* Page Header */}
        <div className="animate-slide-up mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">
            My Tasks
          </h1>
          <p className="mt-2 text-sm text-[#6e6e73]">
            Built with React + Tailwind + shadcn/ui
          </p>
        </div>

        {/* Add Task */}
        <div className="animate-slide-up animation-delay-100 rounded-2xl bg-[#f5f5f7] p-4">
          <div className="flex gap-2">
            <Input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              onKeyDown={e => e.key === 'Enter' && addTask()}
              className="h-9 flex-1 rounded-full border-[#d2d2d7] bg-white text-sm focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/10"
            />
            <Button
              onClick={addTask}
              size="icon"
              className="h-9 w-9 shrink-0 rounded-full bg-[#0071e3] text-white transition-colors hover:bg-[#0077ed]">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Task List */}
        <div className="animate-slide-up animation-delay-200 mt-4 space-y-2">
          {tasks.length === 0 ? (
            <p className="py-12 text-center text-sm text-[#86868b]">
              No tasks yet. Add one above.
            </p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="group flex items-center gap-3 rounded-xl bg-[#f5f5f7] px-4 py-3 transition-all duration-200 hover:bg-[#e8e8ed]">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-[#d2d2d7] transition-colors duration-200 hover:text-[#0071e3]">
                  {task.completed ? (
                    <CheckCircle2 className="h-[18px] w-[18px] text-[#34c759]" />
                  ) : (
                    <Circle className="h-[18px] w-[18px]" />
                  )}
                </button>
                <span
                  className={`flex-1 text-sm transition-colors duration-200 ${
                    task.completed
                      ? 'text-[#d2d2d7] line-through'
                      : 'text-[#1d1d1f]'
                  }`}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-[#d2d2d7] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:text-[#ff3b30]">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {tasks.length > 0 && (
          <p className="mt-6 text-center text-xs text-[#86868b]">
            {tasks.length} total · {tasks.filter(t => t.completed).length}{' '}
            completed
          </p>
        )}
      </div>
    </div>
  )
}
