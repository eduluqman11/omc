"use client";

import { Button } from "@/components/ui/button";
import { ICart, useCart } from "@/context/cartContext";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Facebook, MessageCircle, Twitter } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Fetch function for a single product
const fetchSingleProduct = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

const SingleProduct = () => {

  const { addToCart } = useCart()
  const params = useParams();
  const { id } = params;

  // Use query with id as a dependency
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id], // Include id in queryKey
    queryFn: () => fetchSingleProduct(Number(id)), // Pass id to fetchSingleProduct
    enabled: !!id, // Prevent running the query if id is undefined or null
  });

  const [mainImage, setMainImage] = useState(data?.images[0]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const handleAddCart = (id: number) => {
    const cartObj: ICart = { id, quantity: 0 }
    addToCart(cartObj)
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <Link
            href="/"
            className="flex flex-row-reverse items-center underline underline-offset-1 gap-1 mx-4 sm:mx-8 md:mx-16 lg:mx-36 text-sm sm:text-base"
          >
            Back to Home <ArrowLeft size={16} />
          </Link>
          <div className="lg:w-4/5 mx-auto flex flex-wrap ">
            <img
              alt="ecommerce"
              src={mainImage || data.images[0]}
              className="lg:w-1/2 w-full object-contain lg:h-auto h-64 sm:h-80 md:h-96 object-center rounded bg-white"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{data.brand}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.title}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <Facebook size={20} />
                  </a>
                  <a className="text-gray-500">
                    <Twitter size={20} />
                  </a>
                  <a className="text-gray-500">
                    <MessageCircle size={20} />
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{data.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">${data.price}</span>
                <Button className="flex ml-auto text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded" onClick={() => handleAddCart(data.id)}>Add to cart</Button>
              </div>
              <div className="flex mt-4 space-x-2 overflow-x-auto">
                {data.images.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`product-thumbnail-${index}`}
                    className="w-20 h-20 object-cover rounded border hover:border-black cursor-pointer"
                    onClick={() => setMainImage(img)} // optional: to change the main image on click
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
