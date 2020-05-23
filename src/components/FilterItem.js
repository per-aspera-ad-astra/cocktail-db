import React from 'react';

const FilterItem = props => {
  const labelClasses = ['filter-list__label'];

  if (props.isChecked) {
    labelClasses.push('checked');
  }

  return(
    <label 
      className={labelClasses.join(' ')}
      htmlFor={props.text}
    >
      <input 
        type="checkbox"
        id={props.text}
        defaultChecked={props.isChecked}
        onChange={props.handleChangeFilterElement}
        value={props.text}
        />
      {props.text}
    </label>
  )
}

export default FilterItem;