import { Star, List, Share2 } from "lucide-react";

interface PriceInfo {
  vendor: string;
  price: number;
  url: string;
}

interface ProductCardProps {
  product_id: string;
  rank: number;
  // brand: string;
  name: string;
  // size: string;
  image: string;
  savings: string;
  savingsStore: string;
  percentCheaper: number;
  prices: PriceInfo[];
  moreStores?: number;
  // reviewCount: number;
  // shopCount: number;
  // reviewQuote: string;
}

const ProductCard = ({
  rank,
  // brand,
  name,
  // size,
  image,
  savings,
  savingsStore,
  percentCheaper,
  prices,
  moreStores,
  // reviewCount,
  // shopCount,
  // reviewQuote,
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 lg:p-6 animate-fade-in hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left: Image with badges */}
        <div className="relative flex-shrink-0">
          <div className="deal-badge">
            <div className="deal-badge-number">{rank}</div>
            <div className="deal-badge-save">Save {savings} in {savingsStore}</div>
            <div className="deal-badge-cheaper">{percentCheaper}% Cheaper</div>
          </div>
          <div className="w-full lg:w-60 h-80 rounded-xl flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain p-4"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop";
              }}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0">
          {/* Product Info */}
          <div className="mb-4">
            {/* <p className="text-primary font-semibold text-sm">{brand}</p> */}
            <h3 className="text-foreground font-semibold text-base lg:text-lg leading-tight mb-1">
              {name}
            </h3>
            {/* <p className="text-muted-foreground text-sm">{size}</p> */}
          </div>

          {/* Available at */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Available at</h4>
            <div className="flex flex-wrap gap-2">
              {prices.map((price, index) => (
                <div key={index} className="price-tag">
                  <span className="price-tag-store">{price.vendor}</span>
                  <span className="price-tag-price">€{price.price}</span>
                </div>
              ))}
              {moreStores && moreStores > 0 && (
                <div className="price-tag bg-primary/10">
                  <span className="text-xs font-medium text-primary">+{moreStores}</span>
                  <span className="text-xs font-bold text-primary">STORES</span>
                </div>
              )}
            </div>
          </div>

          
           {/* Reviews */}
          {/* 
          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">What people say</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-trolley-orange text-trolley-orange" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {reviewCount} reviews from {shopCount} shops
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic line-clamp-2">
              "{reviewQuote}"
            </p>
          </div> */}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm text-muted-foreground">
              <List className="h-4 w-4" />
              <span>List</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
