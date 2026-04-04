import { useParams } from "react-router-dom";

function CategoryPage() {
  const { categoryName, subCategory } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        {categoryName} Ads
      </h1>

      <p className="mt-6 text-gray-600">
        Showing ads for: {categoryName}
        {subCategory && ` > ${subCategory}`}
      </p>
    </div>
  );
}

export default CategoryPage;