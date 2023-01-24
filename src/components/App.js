import { Component } from 'react';
import Header from './Header';
import Filter from './Filter';
import Card from './Card';
import Loader from '../UI/Loader';

function transformCategoryName(value) {
  return value.replace(/ /g, '_');
}

export default class App extends Component {

  state = {
    categories: [],
    isLoading: true
  }

  async componentDidMount() {
    await this.getData();

    this.setState({
      isLoading: false
    })
  }

  getData = async () => {
    const apiBase = 'https://www.thecocktaildb.com/api/json/v1/1/',
          apiCategoryList = 'list.php?c=list',
          apiFilterCategory = 'filter.php?c=';

    const categoriesList = [];

    await fetch(`${apiBase}${apiCategoryList}`)
      .then(res => res.json())
      .then(data => {
        data.drinks.forEach(item => {
          categoriesList.push(item.strCategory);
        })
      });

    const categories = categoriesList.map((item, index) => (
      {
        id: index + 1,
        value: item,
        drinks: [],
        isChecked: true
      }
    ));

    const allURI = categoriesList.map(item => {
      const category = transformCategoryName(item);
      return `${apiBase}${apiFilterCategory}${category}`
    })

    // Get all drinks
    const drinks = [];
    const requests = allURI.map(url => fetch(url));

    await Promise.all(requests)
      .then(responses => responses)
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => data.forEach((obj) => {
        drinks.push(obj.drinks);
      }));

    categories.forEach((item, index) => {
      item.drinks = drinks[index];
    });

    this.setState({
      categories
    });
  }

  handleChangeFilterElement = (value) => {
    const categories = value;

    this.setState({
      categories
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        { 
          this.state.isLoading
          ? <Loader />
          : <main className="main">
              <Filter 
                categories={this.state.categories}
                handleChangeFilterElement={this.handleChangeFilterElement}
              />
              <div className="content">
                { this.state.categories.map(category => (
                    category.isChecked
                      ? <div key={category.id} className="category">
                          <h2 className="category__title">{ category.value }</h2>
                          <div className="category__inner">
                            { category.drinks.map(drink => (
                                <Card 
                                  key={drink.idDrink}
                                  imgPath={drink.strDrinkThumb}
                                  title={drink.strDrink}
                                />
                              )
                            )}
                          </div>
                        </div>
                      : null
                  ))}
              </div>
            </main>
        }
      </div>
    )
  }
}
