import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./HamburgerMenu";
import { fetchProducts } from "@/lib/api";
import { min } from "date-fns";

interface SearchResult {
  id: string;
  name: string;
  price?: number;
  image: string;
  href: string;
}

export interface PriceInfo {
  vendor: string;
  price: number;
  url: string;
}

export interface Product {
  product_id: string;
  name: string;
  vendor: string;
  image: string;
  prices: PriceInfo[];
  url: string;
  category: string;
  scraped_at: string;
  moreStores?: number;
}


const getCheapest = (prices: PriceInfo[]): number => {
  if (!prices || prices.length === 0) return 0;

  return Math.min(...prices.map((p) => p.price));
};


const mapProductToSearchResult = (
    product: any // or BackendProduct
  ): SearchResult => {
    return {
      id: product.product_id,
      name: product.name,
      price: getCheapest(product.prices),
      image: product.image || "/placeholder.png",
      href: `/product/${product.slug || product.product_id}`,
    };
  };

const Header = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cacheRef = useRef<Record<string, SearchResult[]>>({});
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        setOpen(false);
        return;
      }

      // 🔥 Cache hit
      if (cacheRef.current[value]) {
        setResults(cacheRef.current[value]);
        setOpen(true);
        return;
      }

      try {
        setLoading(true);

        const backendProducts = await fetchProducts({ q: value });

        const mappedResults = backendProducts.items
          .slice(0, 6)
          .map(mapProductToSearchResult);

        cacheRef.current[value] = mappedResults;

        setResults(mappedResults);
        setOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 200);
  };



  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">T</span>
          </div>
          <span className="hidden md:block text-lg font-semibold">
            trolley
          </span>
        </Link>

        {/* Search */}
        <div
          ref={containerRef}
          className="relative flex-1 max-w-xl mx-4 lg:mx-8"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a product or brand"
            value={search}
            onChange={handleSearchChange}
            onFocus={() => search && setOpen(true)}
            className="pl-10 pr-4 h-10 bg-muted border-0 rounded-full text-sm focus-visible:ring-1 focus-visible:ring-primary"
          />

          {/* 🔍 Search Popup */}
          {open && (
            <div className="absolute top-12 left-0 right-0 min-h-[60px] bg-background border rounded-lg shadow-lg overflow-hidden">
              {loading ? (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  Searching…
                </div>
              ) : results.length > 0 ? (
                <ul className="divide-y">
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-10 h-10 rounded-md object-cover border"
                      />

                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {item.name}
                        </span>
                        {item.price !== undefined && (
                          <span className="text-xs text-muted-foreground">
                            €{item.price}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
