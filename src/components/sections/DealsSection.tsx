import { Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { fetchProducts } from "@/lib/api";
import { useEffect, useState } from "react";
import { calculateSavings, findBestDeal } from "@/lib/utils";

interface DealsSectionProps {
  products?: any[];
  itemsPerPage?: number;
}

const DealsSection = ({ products: externalProducts, itemsPerPage = 30 }: DealsSectionProps) => {
  const [internalProducts, setInternalProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!externalProducts) {
      fetchProducts().then((data) => {
        const transformedProducts = data.items.map((product) => ({
          product_id: product.product_id,
          rank: 0,
          name: product.name,
          image: product.image,
          prices: product.prices,
          moreStores: product.moreStores,
        }));
        setInternalProducts(transformedProducts);
      }).catch((error) => {
        console.error("Error fetching products:", error);
      });
    }
  }, [externalProducts]);

  const products = externalProducts || internalProducts;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const deals = paginatedProducts.map((product, index) => ({
    product_id: product.product_id,
    rank: startIndex + index + 1,
    name: product.name,
    image: product.image,
    savings: `€${calculateSavings(product.prices).savings.toFixed(2)}`,
    savingsStore: findBestDeal(product.prices)?.vendor || '',
    percentCheaper: Math.round(calculateSavings(product.prices).percentSavings),
    prices: product.prices,
    moreStores: product.moreStores,
  }));

  return (
    <div className="space-y-4">
      {deals.map((deal, index) => (
        <Link to={`/product/${deal.product_id}`} key={deal.product_id} style={{ animationDelay: `${index * 100}ms` }} className="block">
          <ProductCard {...deal} />
        </Link>
      ))}
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DealsSection;
