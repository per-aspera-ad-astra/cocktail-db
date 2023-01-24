import { Component } from 'react';
import FilterItem from './FilterItem';

export default class Filter extends Component  {

  state = {
    isOpen: false,
    categories: []
  }

  componentDidMount() {
    this.setState({
      categories: this.props.categories
    })
  }

  submitFilters = () => {
    this.props.handleChangeFilterElement(this.state.categories);
  }

  toggleFilter = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleChangeFilterElement = (e) => {
    const categories = this.state.categories;

    categories.forEach(item => {
      if (item.value === e.target.value)
        item.isChecked = !item.isChecked
    });

    this.setState({
      categories
    })
    
    return categories;  
  }

  render() {
    const filterClasses = ['filter'];

    if(this.state.isOpen) {
      filterClasses.push('open');
    }

    return (
      <div className={ filterClasses.join(' ') }>
        <div className="filter-inner">
          <button 
            type="button"
            onClick={ this.toggleFilter }
            className="filter-toggle"
          >
            { this.state.isOpen ? 'Hide filters': 'Show filters' }
          </button>
          <div className="filter-list-wrapper">
            <ul className="filter-list">
            { 
              this.state.categories.map((item) => (
                <li
                  key={ item.id }
                  className="filter-list__item"
                >
                  <FilterItem 
                    text={ item.value }
                    isChecked={ item.isChecked }
                    handleChangeFilterElement={ this.handleChangeFilterElement }
                  />
                </li>
              ))
            }
            </ul>
            <button
              type="button"
              className="btn"
              onClick={ this.submitFilters }
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  }
}
