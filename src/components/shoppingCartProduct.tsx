import { useCart } from "@/context/cartContext";
import { Minus, Plus, X } from "lucide-react"
import Link from "next/link";
import { useState } from "react";

interface IShoppingCart {
    id:number;
    image:string;
    price:number;
    description:string;
    quantity:number;
    onRemove: (id: number) => void;

}
const ShoppingCartCard = ({id,image,price,description,quantity,onRemove}:IShoppingCart) =>{
    const {addToCart,removeToCart} = useCart()
    const [increment,setIncrement] = useState(quantity)

    function incremntQunatity(id:number,quantity:number){
        const obj = {id,quantity}
        setIncrement(increment + 1)
        addToCart(obj)
    }

    function decrementQuantity(id:number,quantity:number){
        const obj = {id,quantity}
        setIncrement(Math.max(increment - 1,1))
        removeToCart(obj)
    }

    return (
        <>
            <div className="space-y-6  m-1">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                            <img className="h-20 w-20 dark:hidden" src={image} alt="imac image" />
                            <img className="hidden h-20 w-20 dark:block" src={image} alt="imac image" />
                        </a>

                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                            <Minus className="border rounded-sm cursor-pointer hover:bg-gray-200" onClick={()=>decrementQuantity(id,quantity)}/>
                                <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={quantity} required />
                            <Plus  className="border rounded-sm cursor-pointer hover:bg-gray-200" onClick={()=>incremntQunatity(id,quantity)}/>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">${(increment * price).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <Link href={`/product/${id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{description}</Link>

                            <div className="flex items-center gap-4">
                                <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                    </svg>
                                    Add to Favorites
                                </button>

                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={() => onRemove(id)}>
                                    <X />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCartCard