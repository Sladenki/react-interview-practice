/*
8. Infinite scroll

👉 Подгрузка при скролле
*/

'use client';
import React, { useEffect, useRef, useState } from 'react'

const InfinityScroll = () => {

    const ref = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);

    const [data, setData] = useState(() => 
        Array.from({ length: 10}, (_, index) => ({
            id: index, name: `Инфо ${index}`, color: 'red'
        }))
    )

    const loadMore = () => {
        setData(prev =>
          [
            ...prev,
            ...Array.from({ length: 10 }, (_, index) => ({
              id: prev.length + index,
              name: `Инфо ${prev.length + index}`,
              color: 'blue'
            }))
          ]
        );
      };
    
    useEffect(() => {
        // entries — массив событий
        const observer = new IntersectionObserver((entries) => {
          const target = entries[0];

          /*
                target:{
                    isIntersecting: true/false,
                    intersectionRatio: 0..1,
                    target: DOMElement
                }
          */
      
          if (target.isIntersecting && !loadingRef.current) {
            loadingRef.current = true;
            loadMore();
            loadingRef.current = false;
          }
        });
      
        // Начни следить за этим DOM элементом
        if (ref.current) {
          observer.observe(ref.current);
        }
      
        return () => {
          observer.disconnect();
        };
    }, [])

  return (
    <div>
        {
            data.map((item) => (
                <div key={item.id} style={{ height: '300px', backgroundColor: `${item.color}` }}>
                    {item.name}
                </div>
            ))
        }

        <div ref={ref} style={{ height: '100px', backgroundColor: 'green' }}></div>
    </div>
  )
}

export default InfinityScroll
