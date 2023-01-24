import logo from '../assets/images/logo.svg';
import logoCocktail from '../assets/images/logo-cocktail.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={ logo } alt="Logo"/>
        <img className="logo-cocktail" src={ logoCocktail } alt="Logo Cocktail"/>
      </div>
    </header>
  )
}

export default Header;
