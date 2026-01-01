import { useParams, Link } from "react-router-dom";
import { ArrowLeft, List, Share2, Flag, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { compareProducts } from "@/lib/api";
import { useEffect, useState } from "react";


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setFilters] = useState({
    search: "",
    vendors: [] as string[],
    categories: [] as string[],
    minPrice: "",
    maxPrice: "",
    sortPrice: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await compareProducts(id);
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "Product not found"}</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  // Use the first product as the main product for display
  const mainProduct = products[0];
  const prices = products.map(p => ({
    store: p.vendor,
    price: `€${p.price.toFixed(2)}`,
    unitPrice: "", // Unit price not available in API
    url: p.url
  }));

  const lowestPrice = Math.min(...products.map(p => p.price));
  const usualPrice = Math.max(...products.map(p => p.price));
  const pricePercentage = ((usualPrice - lowestPrice) / usualPrice) * 100;
  return (
    <div className="min-h-screen bg-background">
      <Header setFilters={setFilters} />
      <Sidebar />
      <main className="pt-16 pl-0 lg:pl-56 px-4 py-4 lg:px-8 lg:py-6">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 lg:mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to deals</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Left Column - Product Info */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              {/* Product Header */}
              <div className="bg-card rounded-xl lg:rounded-2xl border border-border p-4 lg:p-6">
                <p className="text-primary font-semibold text-xs lg:text-sm mb-1">{mainProduct.vendor}</p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 leading-tight">
                  {mainProduct.name}
                </h1>
                <span className="inline-block px-2 lg:px-3 py-0.5 lg:py-1 bg-foreground text-background rounded-full text-xs lg:text-sm font-medium">
                  {mainProduct.category}
                </span>

                <div className="mt-4 lg:mt-6 flex flex-col sm:flex-row gap-4 lg:gap-6">
                  {/* Product Image */}
                  <div className="w-full sm:w-60 lg:w-80 h-60 lg:h-full rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={mainProduct.image}
                      alt={mainProduct.name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop";
                      }}
                    />
                  </div>

                  {/* Action Buttons   */}
                  
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs lg:text-sm">
                      <List className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                      List
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs lg:text-sm">
                      <Share2 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs lg:text-sm">
                      <Flag className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile: Where to Buy (shown first on mobile) */}
              <div className="lg:hidden bg-card rounded-xl border border-border p-4">
                <h2 className="text-base font-semibold text-foreground mb-3">Where To Buy</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Prices shown are available online and may not reflect in store.
                </p>
                <div className="space-y-2">
                  {prices.map((price, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 bg-muted rounded-lg"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm">{price.store}</p>
                        <p className="text-xs text-muted-foreground truncate">{price.unitPrice}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <p className="font-bold text-base text-foreground">{price.price}</p>
                        <Button 
                          size="sm" 
                          className="gap-1 text-xs px-2 h-7"
                          onClick={() => window.open(price.url, '_blank')}
                        >
                          VISIT
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Price */}
              <div className="bg-card rounded-xl lg:rounded-2xl border border-border p-4 lg:p-6">
                <h2 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">Today's Price</h2>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="text-center flex-shrink-0">
                    <p className="text-xs text-muted-foreground">Lowest</p>
                    <p className="text-lg lg:text-xl font-bold text-[hsl(var(--trolley-green))]">€{lowestPrice}</p>
                  </div>
                  <div className="flex-1 h-2.5 lg:h-3 bg-muted rounded-full overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[hsl(var(--trolley-green))] to-[hsl(var(--trolley-orange))]"
                      style={{ width: `${100 - pricePercentage}%` }}
                    />
                  </div>
                  <div className="text-center flex-shrink-0">
                    <p className="text-xs text-muted-foreground">Usually</p>
                    <p className="text-lg lg:text-xl font-bold text-foreground">€{usualPrice}</p>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              {/*<div className="bg-card rounded-xl lg:rounded-2xl border border-border p-4 lg:p-6">
              {product.sizes.length > 0 && (
                <div className="bg-card rounded-xl lg:rounded-2xl border border-border p-4 lg:p-6">
                  <h2 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">Sizes</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-4">
                    {product.sizes.map((size, index) => (
                      <div
                        key={index}
                        className="relative bg-muted rounded-lg lg:rounded-x onClick={() => window.open(price.url, '_blank')}l p-3 lg:p-4 text-center hover:bg-muted/80 cursor-pointer transition-colors"
                      >
                        {size.badge && (
                          <span className="absolute top-1.5 right-1.5 lg:top-2 lg:right-2 px-1.5 lg:px-2 py-0.5 bg-[hsl(var(--trolley-green))] text-white text-[10px] lg:text-xs font-medium rounded-full">
                            {size.badge}
                          </span>
                        )}
                        <p className="font-bold text-foreground text-sm lg:text-base">{size.size}</p>
                        <p className="text-base lg:text-lg font-bold text-primary">{size.price}</p>
                        <p className="text-[10px] lg:text-xs text-muted-foreground">{size.unitPrice}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Good to Know */}
              {/* <div className="bg-card rounded-xl lg:rounded-2xl border border-border p-4 lg:p€{lowestPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex-1 h-2.5 lg:h-3 bg-muted rounded-full overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[hsl(var(--trolley-green))] to-[hsl(var(--trolley-orange))]"
                      style={{ width: `${100 - pricePercentage}%` }}
                    />
                  </div>
                  <div className="text-center flex-shrink-0">
                    <p className="text-xs text-muted-foreground">Highest</p>
                    <p className="text-lg lg:text-xl font-bold text-foreground">€{usualPrice.toFixed(2)

              {/* Reviews */}
              {/* <div className="bg-card rounded-xl lg:rounded-2xl border border-border p-4 lg:p-6">
                <h2 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">Reviews</h2>
                <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-3 lg:mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 lg:h-5 lg:w-5 ${i < Math.floor(product.reviews.rating) ? "fill-[hsl(var(--trolley-orange))] text-[hsl(var(--trolley-orange))]" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-semibold text-sm lg:text-base">{product.reviews.rating}</span>
                  <span className="text-muted-foreground text-xs lg:text-sm">({product.reviews.count} reviews)</span>
                </div> */}

                {/* Rating breakdown */}
                {/* <div className="space-y-1.5 lg:space-y-2 mb-4 lg:mb-6">
                  {product.reviews.breakdown.map((percentage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs lg:text-sm text-muted-foreground w-6 lg:w-8">{5 - index}★</span>
                      <div className="flex-1 h-1.5 lg:h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[hsl(var(--trolley-orange))]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs lg:text-sm text-muted-foreground w-8 lg:w-10 text-right">{percentage}%</span>
                    </div>
                  ))}
                </div>

                <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-3 lg:pl-4 text-sm">
                  "{product.reviews.quote}"
                </blockquote>

                <Button variant="outline" className="mt-3 lg:mt-4 text-sm">
                  Write a Review
                </Button>
              </div>*/}
            </div>

            {/* Right Column - Where to Buy (Desktop only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">Where To Buy</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  The prices shown are available online and may not reflect in store.
                </p>
                <div className="space-y-3">
                  {prices.map((price, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{price.store}</p>
                        <p className="text-xs text-muted-foreground">{price.unitPrice}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-lg text-foreground">{price.price}</p>
                        <Button 
                          size="sm" 
                          className="gap-1"
                          onClick={() => window.open(price.url, '_blank')}
                        >
                          <span>VISIT</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
         
          </div>
        
        </main>
      </div>
    
    );
};

export default ProductDetail;