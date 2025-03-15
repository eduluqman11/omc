"use client"

import ProductList from "@/components/product";
import { useQuery } from "@tanstack/react-query";


const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
export default function Home() {

  const { data, error, isLoading } = useQuery({ queryKey: ['products'],  queryFn: fetchProducts,});

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  console.log('data:',data);
  return (
    <div >
     <ProductList products={data.products} />
    </div>
  );
}
