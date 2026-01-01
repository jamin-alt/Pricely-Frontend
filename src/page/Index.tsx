import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import HeroBanner from "@/components/sections/HeroBanner";
import StoreCarousel from "@/components/sections/StoreCarousel";
import DealsSection from "@/components/sections/DealsSection";
import { fetchProducts } from "@/lib/api";

const PER_PAGE = 30;

const Index = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableVendors, setAvailableVendors] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    vendors: [] as string[],
    categories: [] as string[],
    minPrice: "",
    maxPrice: "",
    sortPrice: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const buildQueryParams = () => {
    const params: Record<string, any> = {};
    if (filters.search) params.q = filters.search;
    if (filters.vendors.length > 0) params.vendor = filters.vendors.join(",");
    if (filters.categories.length > 0) params.category = filters.categories.join(",");
    if (filters.minPrice) params.min_price = filters.minPrice;
    if (filters.maxPrice) params.max_price = filters.maxPrice;
    if (filters.sortPrice) params.sort_price = filters.sortPrice;
    params.page = page;
    params.limit = PER_PAGE;
    return params;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(buildQueryParams());
      setAvailableVendors(data.available_vendors || []);
      setAvailableCategories(data.available_categories || []);
      setProducts(data.items || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchData(), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-background">
      <Header setFilters={setFilters} />
      <Sidebar />
      
      <main className="pt-16 pl-20 lg:pl-56">
        <div className="p-4 lg:p-8 max-w-5xl">
          <HeroBanner />
          <StoreCarousel stores={availableVendors.map(vendor => ({ name: vendor }))} setFilters={setFilters} />
            {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            ) : (
            <>
              <DealsSection products={products} />
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
            )}
        </div>
      </main>
    </div>
  );
};

export default Index;
