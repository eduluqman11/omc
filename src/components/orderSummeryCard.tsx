import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IOrderSummery{
  OriginalPrice:number;
  saving?:number;
  pickUpCharge?:number;
  tax?:number;
}
const OrderSummeryCard = ({OriginalPrice,saving,pickUpCharge,tax}:IOrderSummery)=>{
    const calculateTotal = (
        Number(OriginalPrice) +
        Number(saving || 0) +
        Number(pickUpCharge || 0) +
        Number(tax || 0)
      ).toFixed(2);
      
    return (
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-title text-gray-900 dark:text-white">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-title text-gray-500 dark:text-gray-400">Original price</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">${OriginalPrice}</dd>
              </dl>

             {
                saving && (
                 <dl className="flex items-center justify-between gap-4">
                 <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                 <dd className="text-base font-medium text-green-600">${saving}</dd>
               </dl>)
             }

              {
               pickUpCharge && (
                <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">${pickUpCharge}</dd>
              </dl>
              )
              }

              { tax && (
                <div>
                     <dl className="flex items-center justify-between gap-4">
                     <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                     <dd className="text-base font-medium text-gray-900 dark:text-white">${tax}</dd>
                   </dl>
                 </div>)
              }

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="font-title text-xl text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-title text-gray-900 dark:text-white">${calculateTotal || 0}</dd>
            </dl>
          </div>

        <div className="">
        <a href="#" className="flex w-full items-center justify-center  px-2 py-2.5"><Button size={"lg"}>Proceed to Checkout</Button></a>
        </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <Link href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <MoveRight />
            </Link>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
              <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
            </div>
            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
          </form>
        </div>
      </div>
      </div>
    )
}

export default OrderSummeryCard