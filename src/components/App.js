import React from 'react';
import Header from './Header';
import Filter from './Filter';
import Card from './Card';
import Loader from '../UI/Loader';

function transformCategoryName(value) {
  return value.replace(/ /g, '_');
}

export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      categories: [],
      isLoading: true,
      isScrolling: false
    }

    this.apiBase = 'https://www.thecocktaildb.com/api/json/v1/1/';
    this.apiCategoryList = 'list.php?c=list';
    this.apiFilterCategory = 'filter.php?c=';
  }

  async componentDidMount() {
    // console.log('did mount');
    await this.getData();
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      isLoading: false
    })
    // this.drawCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('did update');
    // if(prevState.drinks !== this.state.drinks) {
    //   this.updateData();
    //   console.log(prevState.drinks, this.state.drinks);
    //   console.log(this.state);
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if(window.scrollY >= 60) {
      this.setState({
        isScrolling: true
      })
    } else {
      this.setState({
        isScrolling: false
      })
    }
  }

  getData = async () => {

    const categoriesList = [];

    await fetch(`${this.apiBase}${this.apiCategoryList}`)
      .then(res => res.json())
      .then(data => {
        data.drinks.forEach(item => {
          categoriesList.push(item.strCategory);
        })
      });

    const categories = categoriesList.map((item, index) => {
      return (
        {
          id: index + 1,
          value: item,
          drinks: [],
          isChecked: true
        }
      )
    });

    const allURI = categoriesList.map(item => {
      const category = transformCategoryName(item);
      return `${this.apiBase}${this.apiFilterCategory}${category}`
    })

    // Get all drinks
    const drinks = [];
    const requests = allURI.map(url => fetch(url));

    await Promise.all(requests)
      .then(responses => responses)
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => data.forEach((obj) => {
        drinks.push(obj.drinks);
      }))

    categories.forEach((item, index) => {
      item.drinks = drinks[index];
    })

    this.setState({
      categories
    });

    console.log(categories);
  }


  updateData = async (updateCategories) => {
    console.log(updateCategories);
    
    // this.setState({
    //   selectedCategories: updateCategories
    // });
  }

  handleChangeFilterElement = (event) => {
    const categories = this.state.categories;
    categories.forEach(item => {
      if (item.value === event.target.value)
        item.isChecked = !item.isChecked
    })
    this.setState({
      categories
    })
    console.log(event.target.value);
  }

  render() {
    console.log(this.state);
    console.log('render');

    const wrapperStyles = ['wrapper'];

    if (this.state.isScrolling) {
      wrapperStyles.push('isScrolling');
    }

    return (
      <div className={wrapperStyles.join(' ')}>
        <Header />
        { 
          this.state.isLoading
          ? <Loader />
          : <main className="main">
              <Filter 
                categories={this.state.categories}
                updateData={this.updateData}
                handleChangeFilterElement={this.handleChangeFilterElement}
              />
              <div className="content">
                {this.state.categories.map(category => {
                  return (
                    category.isChecked
                      ? <div key={category.id} className="category">
                          <h2 className="category__title">{category.value}</h2>
                          <div className="category__inner">
                            {category.drinks.map(drink => {
                              return (
                                <Card 
                                  key={drink.idDrink}
                                  imgPath={drink.strDrinkThumb}
                                  title={drink.strDrink}
                                />
                              )
                            })}
                          </div>
                        </div>
                      : null
                  )
                })}
              </div>
            </main>
        }
      </div>
    )
  }
}
