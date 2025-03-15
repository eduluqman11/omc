import { IProductProps } from "@/types/product";
import Link from 'next/link'


const ProductCard = ({destination,src,productName,category,price}:IProductProps) =>{
    return (
        <div>
            <Link href={destination} className="group">
                <img src={src} alt={productName} className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]" />
                <div className="flex justify-between">
                    <div>
                        <h5 className="mt-4 text-sm text-gray-500">{category}</h5>
                        <h3 className=" text-sm text-gray-700">{productName}</h3>
                    </div>
                    <div>
                        <p className="mt-4 text-md font-medium text-gray-800">${price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

const ProductList = ({ products }) => {
    return (
        <div>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product, index:number) => (
                           <div key={index} onClick={()=>console.log(product.id)}>
                             <ProductCard
                               destination={`/product/${product.id}`}  // Navigate to the product page with the product id as a query parameter
                                src={product.images[0]}
                                category={product.category}
                                productName={product.title}
                                price={product.price}
                            />
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductList