/*
6. Race condition (очень любят)
👉 Есть поиск:
ввод → fetch
быстрый ввод → старые ответы приходят позже

❗️ Нужно:исправить баг
*/

'use client'
import React, { useEffect, useRef, useState } from 'react'

function mockFetch(query: string): Promise<string[]> {
    return new Promise((resolve) => {
      const delay = Math.random() * 1500 + 300; // имитация сети
  
      setTimeout(() => {
        resolve([
          `${query} result 1`,
          `${query} result 2`,
          `${query} result 3`,
        ]);
      }, delay);
    });
}

const RaceCondition = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    // нам нужно хранить значение между рендерами, но НЕ вызывать ререндер
    const requestId = useRef(0);

    const fetchData = async (query: string) => {
        const data = await mockFetch(query);
        setResults(data);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
          const currentId = ++requestId.current;
      
          mockFetch(query).then((data) => {
            if (currentId === requestId.current) {
              setResults(data);
            }
          });
        }, 500);
      
        return () => clearTimeout(timer);
      }, [query]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         fetchData(query);
    //     }, 500)
        
    //     return () => {
    //         clearTimeout(timer);
    //     }
    // }, [query]);

  return (
    <div>
        <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
        />

        {
            results.map((result) => (
                <div key={result}>{result}</div>
            ))
        }
    </div>
  )
}

export default RaceCondition
