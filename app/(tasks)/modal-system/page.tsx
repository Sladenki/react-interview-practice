/*
9. Modal system
👉 Сделать:
открытие/закрытие
порталы
управление из любого места
*/

'use client'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({isOpen, isClose}: {isOpen: boolean, isClose: () => void}) => {
    if (!isOpen) return null
    return createPortal(
        <div>
            <h1>Modal</h1>
            <button onClick={isClose}>Close Modal</button>
        </div>
    , document.body)
}

const ModalSystem = () => {

    const [isOpen, setIsOpen] = useState(false)

  return (
    <>
        <div>page</div>

        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <Modal isOpen={isOpen} isClose={() => setIsOpen(false)} />
    </>

  )
}

export default ModalSystem
