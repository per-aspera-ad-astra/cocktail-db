import React from 'react';
import FilterItem from './FilterItem';

export default class Filter extends React.Component  {

  state = {
    isOpen: false,
    loading: true
    // selectedCategories: this.props.categories
  }

  // componentDidMount() {
  //   console.log(this.state.selectedCategories);
  // }

  // submitFilters = () => {
  //   console.log("Selected Categories", this.state.selectedCategories);

  //   this.props.updateData(this.state.selectedCategories);
  // }

  toggleFilter = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onChange = (value) => {
    // const selectedValue = value.replace(/ /g, '_');
    // const selectedCategories = this.props.selectedCategories;

    // if(selectedCategories.indexOf(selectedValue) !== -1) {
    //   selectedCategories.splice(selectedCategories.indexOf(selectedValue), 1);
    // } else {
    //   selectedCategories.push(selectedValue);
    // }
    // console.log('changed', this.props.selectedCategories);

    // this.setState({
    //   selectedCategories
    // })
  }

  

  render() {
    const {categories, handleChangeFilterElement} = this.props;

    const filterClasses = ['filter'];

    if(this.state.isOpen) {
      filterClasses.push('open');
    }

    return (
      <div className={filterClasses.join(' ')}>
        <div className="filter-inner">
          <button 
            type="button"
            onClick={this.toggleFilter}
            className="filter-toggle"
          >
            {this.state.isOpen ? 'Hide filters': 'Show filters'}
          </button>
          <div className="filter-list-wrapper">
            <ul className="filter-list">
            {categories.map((item) => {
              return (
                <li
                  key={item.id}
                  className="filter-list__item"
                >
                  <FilterItem 
                    text={item.value}
                    isChecked={item.isChecked}
                    handleChangeFilterElement={handleChangeFilterElement}
                  />
                </li>
              )
            })}
            </ul>
            <button
              type="button"
              className="btn"
              onClick={this.submitFilters}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  }
}