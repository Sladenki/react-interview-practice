/*
👉 Есть список 1000 элементов:

при клике меняется 1 элемент
сейчас всё лагает

❗ Нужно:

оптимизировать ререндер

(подсказка: React.memo, useCallback)

*/

'use client';
import React, { useCallback, useState } from 'react'

// Оборачиваем компонент в React.memo чтобы не ререндерить его при изменении props
// React.memo делает поверхностное сравнение (shallow compare)
// Он сравнивает ссылку
const Item = React.memo(({item, handleClick}: 
    {item: {id: number, name: string, clicked: boolean}, 
    handleClick: (id: number) => void}) => {

    console.log('Item', item.id)
    return (
        <div onClick={() => handleClick(item.id)}>
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.clicked ? 'clicked' : 'not clicked'}</span>
        </div>
    )
});

const OptimiseList = () => {
    console.count('OptimiseList render')

    const [items, setItems] = useState(() => 
    Array.from({ length: 10}, (_, index) => ({
        id: index, name: `Задача ${index}`, clicked: false
    })))

    // useCallback нужен чтобы не создавать новый callback при каждом ререндере
    const handleClick = useCallback((id: number) => {
      setItems(prevItems =>
        prevItems.map(item => item.id === id ? {...item, clicked: !item.clicked} : item)
      )
    }, [])
    
  return (
    <div>
        {items.map((item) => (
            <Item key={item.id} item={item} handleClick={handleClick} />
        ))}
    </div>
  )
}

export default OptimiseList;
