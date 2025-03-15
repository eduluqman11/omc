import { createContext, useContext, useEffect, useState } from "react";


export interface ICart {
  id: number;
  quantity: number;
}

export interface ICartContext {
  cart: ICart[]; 
  addToCart: (item: ICart) => void; 
  removeFromCart: (id: number) => void; 
  clearCart: () => void; 
}

const CartContext = createContext<ICartContext>({
    cart: [], 
    addToCart: () => {}, 
    removeFromCart: () => {}, 
    clearCart: () => {}, 
  });

export const CartProvider:React.FC<{ children: React.ReactNode }> =({ children }) => {
  const [cart, setCart] = useState<ICart[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product:ICart) => {
    const existingProduct = cart.find((item:ICart) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId:number) => {
    setCart(cart.filter((item:ICart) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
