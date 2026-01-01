import { useState, useRef } from "react";

interface Store {
  name: string;
  logo?: string;
}

interface StoreCarouselProps {
  stores: Store[];
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      vendors: string[];
      categories: string[];
      minPrice: string;
      maxPrice: string;
      sortPrice: string;
    }>
  >;
}

const StoreCarousel: React.FC<StoreCarouselProps> = ({ stores, setFilters }) => {
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (store: string) => {
    const isSelected = selectedStores.includes(store);
    const updatedStores = isSelected
      ? selectedStores.filter((s) => s !== store)
      : [...selectedStores, store];
    
    setSelectedStores(updatedStores);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, vendors: updatedStores }));
    }, 300);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Today's Top Deals</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {stores.map((store) => (
          <button
            key={store.name}
            className={`store-card flex-shrink-0 animate-fade-in ${
              selectedStores.includes(store.name) ? "bg-muted" : ""
            }`}
            onClick={() => handleSearchChange(store.name)}
          >
            <img
              src={store.logo || `https://via.placeholder.com/80?text=${store.name}`}
              alt={store.name}
              className="h-6 object-contain max-w-[80px]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML = `<span class="text-sm font-medium text-foreground">${store.name}</span>`;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreCarousel;
