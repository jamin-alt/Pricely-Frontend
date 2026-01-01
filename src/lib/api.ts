const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

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

export interface ExploreCategory {
  name: string;
  slug: string;
  products: Product[];
}



export interface ProductsResponse {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
  items: Product[];
  available_categories: string[];
  available_vendors: string[];
}

export interface CompareResponse {
  products: Product[];
}

export interface ExploreResponse {
  products: ExploreCategory[];
}

// Fetch products with filters
export async function fetchProducts(params: {
  q?: string;
  vendor?: string;
  min_price?: number;
  max_price?: number;
  category?: string;
  sort_price?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
} = {}): Promise<ProductsResponse> {
  const url = new URL(`${API_BASE_URL}/products`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// Compare products for a given product ID
export async function compareProducts(productId: string): Promise<CompareResponse> {
  const response = await fetch(`${API_BASE_URL}/compare/${productId}`);
  if (!response.ok) {
    throw new Error(`Failed to compare products: ${response.statusText}`);
  }
  return response.json();
}

// Compare products for a given product ID
export async function getExploreContents(
  params: {category?: string} = {}): Promise<ExploreResponse> {
  const url = new URL(`${API_BASE_URL}/explore`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to compare products: ${response.statusText}`);
  }
  return response.json();
}


// Health check
export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }
  return response.json();
}