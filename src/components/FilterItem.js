import React from 'react';
import iconCheckbox from '../assets/images/icon-checkbox.svg';
import iconCheckboxChecked from '../assets/images/icon-checkbox-checked.svg';

const FilterItem = props => {
  return(
    <label 
      className="filter-list__label"
      htmlFor={props.text}
    >
      <img 
        className="filter-list__label-icon"
        src={
          props.isChecked
            ? iconCheckboxChecked
            : iconCheckbox
        }
        alt="icon"
      />
      <input 
        type="checkbox"
        id={props.text}
        checked={props.isChecked}
        onChange={props.handleChangeFilterElement}
        value={props.text}
        />
      {props.text}
    </label>
  )
}

export default FilterItem;