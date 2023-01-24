import iconCheckbox from '../assets/images/icon-checkbox.svg';
import iconCheckboxChecked from '../assets/images/icon-checkbox-checked.svg';

const FilterItem = props => {
  const { text, isChecked, handleChangeFilterElement } = props;

  return (
    <label 
      className="filter-list__label"
      htmlFor={ text }
    >
      <img 
        className="filter-list__label-icon"
        src={
          isChecked
            ? iconCheckboxChecked
            : iconCheckbox
        }
        alt="icon"
      />
      <input 
        type="checkbox"
        id={ text }
        checked={ isChecked }
        onChange={ handleChangeFilterElement }
        value={ text }
        />
      { text }
    </label>
  )
}

export default FilterItem;
