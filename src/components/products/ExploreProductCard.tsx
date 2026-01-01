import { Link } from "react-router-dom";

interface ExploreProductCardProps {
  product_id: string;
//   brand: string;
  name: string;
//   size?: string;
  image: string;
  price: string;
//   unitPrice?: string;
//   reviewCount: number;
}

const ExploreProductCard = ({
  product_id,
//   brand,
  name,
//   size,
  image,
  price,
//   unitPrice,
//   reviewCount,
}: ExploreProductCardProps) => {
  return (
    <Link
      to={`/product/${product_id}`}
      className="group aspect-square flex flex-col bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all duration-200 min-w-[200px] w-[200px] lg:min-w-[220px] lg:w-[220px]"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square rounded-lg mb-3 overflow-hidden">
        {/* {size && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-card/90 backdrop-blur-sm rounded text-xs font-medium text-muted-foreground">
            {size}
          </span>
        )} */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop";
          }}
        />
      </div>

      {/* Brand */}
      {/* <p className="text-primary font-semibold text-xs mb-0.5">{brand}</p> */}

      {/* Product Name */}
      <h3 className="text-foreground font-medium text-sm leading-tight mb-2 min-h-[40px]" title={name}>
        {name}
      </h3>

      {/* Review Count */}
      {/* <p className="text-muted-foreground text-xs mb-2">{reviewCount.toLocaleString()}</p> */}

      {/* Price */}
      <div className="mt-auto">
        <p className="text-foreground font-bold text-base">€{price}</p>
        {/* {unitPrice && (
          <p className="text-muted-foreground text-xs">{unitPrice}</p>
        )} */}
      </div>
    </Link>
  );
};

export default ExploreProductCard;
