import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ExploreProductCard from "@/components/products/ExploreProductCard";

interface Product {
  product_id: string;
//   brand: string;
  name: string;
//   size?: string;
  image: string;
  price: string;
//   unitPrice?: string;
//   reviewCount: number;
}

interface ExploreCategorySectionProps {
  title: string;
  slug: string;
  products: Product[];
}

const ExploreCategorySection = ({ title, slug, products }: ExploreCategorySectionProps) => {
  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl lg:text-2xl font-bold text-foreground">{title}</h2>
        <Link
          to={`/explore/${slug}`}
          className="flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
        >
          SEE ALL
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Products Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product) => (
          <ExploreProductCard key={product.product_id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ExploreCategorySection;
