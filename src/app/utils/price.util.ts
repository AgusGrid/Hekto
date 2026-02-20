export function parsePrice(priceString: string): number {
  return parseFloat(priceString.replace('$', '')) || 0;
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
}
