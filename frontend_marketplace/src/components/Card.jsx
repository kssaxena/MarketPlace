function Card({ product }) {
  return (
    <div className="card">
      <img src={product.image} />
      <h3>{product.price}</h3>
      <p>{product.title}</p>
      <span>{product.location} • {product.time}</span>
    </div>
  );
}

export default Card;