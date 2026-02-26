import productList from '@app/pages/products/product-lister/product-lister.json';
import { Product } from '@app/models/product-lister.model';

export function getProductIdByTitleAndImage(title: string, image: string): number | undefined {
  const products = productList as Product[];
  
  const normalizedTitle = title.trim().toLowerCase();
  
  const product = products.find(p => {
    const productTitle = p.title.trim().toLowerCase();
    const productImage = p.image;
    
    return productTitle === normalizedTitle && productImage === image;
  });
  
  return product?.id as number | undefined;
}

export function getProductById(id: number | string): Product | undefined {
  const products = productList as Product[];
  const idNum = typeof id === 'string' ? Number(id) : id;
  return products.find(p => p.id === idNum);
}
