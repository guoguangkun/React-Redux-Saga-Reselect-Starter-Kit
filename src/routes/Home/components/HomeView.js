import React from 'react'
import './HomeView.scss'

export const HomeView = ({title, host, address, handleChange, handleClick}) => {
    return (
    <div>
        <h1>{title}</h1>
        <p>{address.area}</p>
        <p>{address.location}</p>
        <input type="text" value={host} onChange={handleChange} />
        <button onClick={handleClick}>查询</button>
    </div>
)}
export default HomeView
