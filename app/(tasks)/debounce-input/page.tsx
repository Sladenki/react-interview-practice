/*

👉 Поле ввода:

пользователь печатает
запрос уходит через 500ms после остановки

❗ Нельзя использовать lodash

*/

'use client'
import { useEffect, useState } from 'react'

const DebounceInput = () => {

    const [value, setValue] = useState('')
    const [debounceValue, setDebounceValue] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value])

    useEffect(() => {
        if (!debounceValue) return

        // запрос на сервер поисковика
    }, [debounceValue])

    return (
        <>
            <input 
                className='border border-gray-300 rounded-md p-2'
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <span>{value}</span>
            <span className='text-gray-500'>{debounceValue}</span>
        </>
    )
}

export default DebounceInput;
