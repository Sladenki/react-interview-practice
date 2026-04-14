/*
1. Counter с подвохом 👉 Сделай счётчик:
кнопка "+"
кнопка "-"
кнопка "increment async" (через setTimeout)

❗ Вопрос: почему иногда значение “ломается”?

В колбэке setTimeout используется count из замыкания на момент клика, а не актуальное значение через секунду. Поэтому:

Несколько быстрых нажатий «increment async» — таймеры все читают одно и то же старое count и после таймаута перезаписывают состояние так, будто инкрементов было меньше, чем кликов.
Если за секунду нажать + / -, отложенный колбэк всё равно делает старый count + 1, и может перетереть более новые обновления.

Пример с setTimeout: при клике вы запомнили count = 0. Через секунду в колбэке всё ещё 0, и вы делаете setCount(0 + 1), даже если за секунду пользователь уже нажал + пять раз и на экране «логически» должно быть другое число.
*/

'use client'

import { useState } from 'react'

const Counter = () => {

  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <button 
        className='bg-blue-500 text-white p-2 rounded-md' 
        onClick={() => setCount(count + 1)}>+</button>

      <button 
        className='bg-red-500 text-white p-2 rounded-md' 
        onClick={() => setCount(count - 1)}>-</button>

      <button 
        className='bg-green-500 text-white p-2 rounded-md' 
        onClick={() => setTimeout(() => setCount((prev) => prev + 1), 1000)}>increment async</button>

      <span>{count}</span>
    </div>
  )
}

export default Counter;
