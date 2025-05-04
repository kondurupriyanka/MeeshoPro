import { Link } from "wouter";
import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <a className="bg-gray-50 rounded-lg p-4 flex flex-col items-center transition duration-200 hover:shadow-md cursor-pointer">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-neutral-dark font-medium text-sm md:text-base text-center">
          {category.name}
        </h3>
      </a>
    </Link>
  );
};

export default CategoryCard;
