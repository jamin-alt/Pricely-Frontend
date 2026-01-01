import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ExploreCategorySection from "@/components/sections/ExploreCategorySection";
import { getExploreContents } from "@/lib/api";
import { LoadingDots, SkeletonLoader, GradientSpinner, LoadingText, LoadingSpinner}  from "@/components/ui/loading";

const Explore = () => {
  const [filters, setFilters] = useState({
    search: "",
    vendors: [] as string[],
    categories: [] as string[],
    minPrice: "",
    maxPrice: "",
    sortPrice: "",
  });

  const [categories, setCategories] = useState<any[]>([]); // array of category objects
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExploreContents()
      .then((data) => {
        setCategories(data.products || []);
      })
      .catch((err) => {
        console.error("Error fetching explore contents:", err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []); // run once on mount

  if (loading) return <LoadingText />;

  return (
    <div className="min-h-screen bg-background">
      <Header setFilters={setFilters} />
      <Sidebar />

      {/* Main Content */}
      <main className="pt-16 pl-20 lg:pl-56">
        <div className="p-4 lg:p-8 max-w-6xl">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Explore
            </h1>
            <p className="text-muted-foreground">
              Browse products by category and compare prices across stores
            </p>
          </div>

          {/* Category Sections */}
          {categories.map((category) => (
            <ExploreCategorySection
              key={category.slug}
              title={category.title}
              slug={category.slug}
              products={category.products}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Explore;
