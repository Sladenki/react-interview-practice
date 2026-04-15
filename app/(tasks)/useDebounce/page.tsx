/*
7. Свой useDebounce хук
const debouncedValue = useDebounce(value, 500);
*/

'use client'
import React, { useEffect, useState } from 'react'

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debouncedValue
}

const UseDebounce = () => {
    const [value, setValue] = useState('')
    
    const debouncedValue = useDebounce(value, 500)

  return (
    <div>
        <input 
            type="text" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
        />

        <span>{debouncedValue}</span>
    </div>
  )
}

export default UseDebounce
