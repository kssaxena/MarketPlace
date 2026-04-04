function ProductCard({ product, onClick }) {
  const condition = product.condition || "Good";

  return (
    <div
      onClick={onClick}
      className="product-card group overflow-hidden rounded-[28px] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

        <div className="product-card__overlay absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 p-5 shadow-lg opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <p className="product-card__condition text-sm font-semibold tracking-[0.02em] text-gray-900">
            <span className="product-card__condition-label text-gray-500">Condition:</span> {condition}
          </p>
          <p className="product-card__description mt-1 text-[0.8rem] leading-6 text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="product-card__time mt-3 text-[0.75rem] font-medium tracking-[0.12em] uppercase text-gray-400">
            {product.time}
          </p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[1.4rem] font-bold tracking-[-0.03em] text-teal-600">
          {product.price}
        </p>
        <h3 className="mt-2 text-[1.02rem] font-semibold leading-7 tracking-[-0.02em] text-gray-900">
          {product.title}
        </h3>
        <p className="mt-2 text-[0.9rem] font-medium text-gray-500">
          {product.location}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
