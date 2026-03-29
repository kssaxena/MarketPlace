import products from "../data/products";
import Card from "./Card";

function ProductGrid() {
  return (
    <div className="products">
      {products.map((item) => (
        <Card key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductGrid;