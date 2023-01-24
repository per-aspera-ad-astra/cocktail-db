const Content = props => {
  const { imgPath, title } = props;

  return (
    <div className="card">
      <div className="card__img">
        <img src={ imgPath } alt={ title }/>
      </div>
      <h3 className="card__title" title={ title }>{ title }</h3>
    </div>
  )
}

export default Content;