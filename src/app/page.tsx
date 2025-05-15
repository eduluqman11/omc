"use client"

import ProductList from "@/components/product";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";


const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchCategory = async () => {
  const response = await fetch('https://dummyjson.com/products/category-list');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
export default function Home() {

  const { data, error, isLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts, });
  const { data: category, error: categoryError, isLoading: categoryLoading } = useQuery({ queryKey: ['category'], queryFn: fetchCategory, })
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data?.products) {
      setFilteredProducts(data.products)
    }
  }, [data])


  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  function selectCategoryValue(value: string) {
    const filtered = data.products.filter((item: any) => item.category === value);
    setFilteredProducts(filtered);
  }
  return (
    <div >
      <div className="flex justify-end px-36">
        <Select onValueChange={selectCategoryValue}>
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="h-40">
              {
                category && category.map((item: string, index: number) => {
                  return (
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                  )
                })
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ProductList products={filteredProducts.length ? filteredProducts : []} />
    </div>
  );
}
