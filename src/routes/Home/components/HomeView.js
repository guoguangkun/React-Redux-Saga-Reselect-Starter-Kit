import React from 'react'
import './HomeView.scss'

export const HomeView = ({title, address, buttonText, handleClick}) => {
    return (
    <div>
        <h1>{title}</h1>
        <p>{`${address.country} ${address.province} ${address.city}`}</p>
        <button onClick={handleClick}>{buttonText}</button>
    </div>
)}
export default HomeView
