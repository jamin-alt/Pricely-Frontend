import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type definitions
export type Product = { vendor: string; price: number; url: string };
export type SavingsResult = {
  minPrice: number;
  maxPrice: number;
  savings: number;
  percentSavings: number;
};

// Calculation utilities for price comparison
export function calculateSavings(products: Product[]): SavingsResult {
  if (products.length === 0) {
    return { minPrice: 0, maxPrice: 0, savings: 0, percentSavings: 0 };
  }

  const prices = products.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const savings = maxPrice - minPrice;
  const percentSavings = maxPrice > 0 ? (savings / maxPrice) * 100 : 0;

  return { minPrice, maxPrice, savings, percentSavings };
}

export function findBestDeal(products: Product[]): {
  vendor: string;
  price: number;
  savings: number;
} | null {
  if (products.length === 0) return null;

  const sorted = products.sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  return {
    vendor: cheapest.vendor,
    price: cheapest.price,
    savings: mostExpensive.price - cheapest.price,
  };
}

export function calculateUnitPrice(price: number, quantity: number, unit: string = '100ml'): string {
  if (quantity <= 0) return 'N/A';
  const unitPrice = (price / quantity) * 100; // assuming unit is per 100
  return `€${unitPrice.toFixed(2)} per ${unit}`;
}
