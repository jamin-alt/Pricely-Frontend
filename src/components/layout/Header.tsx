import { Search, Heart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react"; // Added useRef for debouncing

interface HeaderProps {
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

const Header = ({ setFilters }: HeaderProps) => {
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Debounce the filter update to avoid excessive API calls
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 300); // 300ms delay, adjustable
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">T</span>
          </div>
          <span className="hidden md:block text-lg font-semibold text-foreground">
            trolley
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a product or brand"
              value={search}
              onChange={handleSearchChange}
              className="pl-10 pr-4 h-10 bg-muted border-0 rounded-full text-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Heart className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <User className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;