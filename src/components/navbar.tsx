import { useCart } from "@/context/cartContext";
import {  ShoppingCart, User } from "lucide-react"
import Link from "next/link";

const Navbar = ({ brandName }: { brandName:string }) => {

  const { cart } = useCart();

  console.log(cart)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="text-gray-600 body-font p-1">
      <div className="container mx-auto flex justify-between flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
          <span className="text-gray-900 title-font text-lg font-medium font-bold">{brandName}</span>
        </Link>
        <div className="flex gap-2">
          <User />
          <div className="relative">
            <Link href={"/cart"}><ShoppingCart size={25} /> </Link>
            {cartCount > 0 && (
              <span className="absolute -top-4 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold  leading-none text-white bg-black rounded-sm">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>

  );
  };
  
export default Navbar