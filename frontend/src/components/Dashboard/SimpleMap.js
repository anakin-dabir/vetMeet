import React from 'react'
import WorldMap from 'react-world-map'
import { useState } from 'react'
import './dashboard.css'


export default function SimpleMap() {
  const [ selected, onSelect ]=useState( null );
  return (
    <div>

      <WorldMap selected={selected} onSelect={onSelect} />
    </div>
  )
}
