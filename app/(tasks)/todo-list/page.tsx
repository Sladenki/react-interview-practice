/*
👉 Сделай:
добавление
удаление
фильтр (all / active / completed)

❗ Важно:
правильные key
не ломать state

Лучше - id: Date.now()
if (!newTodo.trim())

*/

'use client'
import { useState } from 'react'

const TodoList = () => {

    const mockTodoes = [
        {
            id: 1,
            name: 'task 1',
            active: false
        },
        {
            id: 2,
            name: 'task 2',
            active: true
        }
    ]

    const [todos, setTodos] = useState<{id: number, name: string, active: boolean}[]>(mockTodoes)

    const [newTodo, setNewTodo] = useState('')
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    const addNewTodo = () => {
        if (newTodo.length === 0) {
            alert('Please enter a task')
            return
        }
        setTodos([...todos, {id: todos.length +1, name: newTodo, active: false}])
        setNewTodo('')
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(item => item.id !== id))
    }

    const toggleTodo = (id: number) => {
        setTodos(todos.map(item => item.id === id ? {...item, active: !item.active} : item))
    }

    const filterdTodos = todos.filter(item => {
        if (filter === 'all') return true
        if (filter === 'active') return !item.active
        if (filter === 'completed') return item.active
        return false
    })

  return (
    <>
        <input 
            className='border border-gray-300 rounded-md p-2'
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
        />

        <button className='bg-blue-500 text-white p-2 rounded-
        md' onClick={addNewTodo}>+</button>

        <div>
            <span>Фильтрмы</span>
            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => setFilter('all')}>All</button>
            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => setFilter('active')}>Active</button>
            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => setFilter('completed')}>Completed</button>
        </div>

        <div>
            {filterdTodos.map((item) => (
                <div className='flex items-center gap-2' key={item.id}>
                    {item.name}
                    <input 
                        type="checkbox" 
                        checked={item.active}
                        onChange={() => toggleTodo(item.id)}
                    />
                    <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => deleteTodo(item.id)}>Delete</button>
                </div>
            ))}
        </div>
    </>

  )
}

export default TodoList;
