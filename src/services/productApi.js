const PRODUCTS_API_URL = "https://dummyjson.com/products?limit=30";

export async function fetchProducts(signal) {
  const response = await fetch(PRODUCTS_API_URL, { signal });
  if (!response.ok) {
    throw new Error(`Could not load products (HTTP ${response.status}).`);
  }

  const data = await response.json();
  if (!Array.isArray(data.products)) {
    throw new Error("The products API returned an unexpected response.");
  }

  return data.products.map((product) => ({
    id: product.id,
    name: product.title,
    category: product.category,
    price: product.price,
    stock: product.stock,
    image: product.thumbnail
  }));
}
