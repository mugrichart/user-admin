import React from 'react';
import "./Filter.css"

const Filter = ({ filters, setFilters}) => {
    const updateFilters = (key, value) => {
       setFilters(prev => {
            const { [key]: _, ...rest } = prev
            if (value) {
                return {...rest, [key]: value}
            }
            return rest
       })
    }
  return (
    <div className='filter'>
        <input type="text" value={filters.name} onChange={e =>  updateFilters("name", e.target.value) }
          placeholder="Search user by name"
        />
        <select name="" id="" value={filters.role} onChange={e => updateFilters("role", e.target.value)}>
            <option value="">Any role</option>
            <option value="x">x</option>
            <option value="y">y</option>
            <option value="z">z</option>
        </select>
    </div>
  )
}

export default Filter