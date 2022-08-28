import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear();
  return (

    <footer>
        <p>Created by M {year}</p>
    </footer>
    
  )
}