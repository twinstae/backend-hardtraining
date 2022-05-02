import React from 'react';
import useTodoListStore from './useTodoListStore';

const FilterNav = () => {
  // 현재 선택된 친구는 selected라는 classname이 있어야 함
  // 클릭하면 selectFilter가 동작해야 함
  const selectedFilter = useTodoListStore(state => state.selectedFilter); 
  const selectFilter =  useTodoListStore(state => state.selectFilter);

  return (
    <ul className="filters">
      {['all', 'active', 'completed'].map(filter => (
        <li onClick={() => selectFilter(filter)}>
          <a href="#/" className={filter === selectedFilter ? 'selected' : ''}>
            {filter}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default FilterNav;