/*
usePrevious (кастомный хук)
👉 Реализуй:
const prev = usePrevious(value);
*/

'use client'
import React, { useEffect, useRef, useState } from 'react'


const usePrevious = (value: number) => {
    console.log('usePrevious render', value)
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

const UsePrevious = () => {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    return (
        <div>
          <p>Current: {count}</p>
          <p>Previous: {prevCount}</p>
          <button onClick={() => setCount(c => c + 1)}>+</button>
        </div>
    );
}

export default UsePrevious
