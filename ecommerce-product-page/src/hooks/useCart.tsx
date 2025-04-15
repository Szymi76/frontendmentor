import { createContext, useContext, useState } from "react";

export type Item = {
  id: number;
  amount: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  company: string;
  images: string[];
  thumbnails: string[];
};

type CartContextType = {
  items: Item[];
  addItemToCart: (item: Item) => void;
  removeItemFromCart: (itemId: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = { children: React.ReactNode };
export const CartProvider = (props: CartProviderProps) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItemToCart = (itemToAdd: Item) => {
    if (itemToAdd.amount <= 0) return;
    setItems((items) => {
      if (items.some((item) => item.id === itemToAdd.id)) return items;
      return [...items, itemToAdd];
    });
  };

  const removeItemFromCart = (itemId: number) => {
    setItems((items) => {
      return items.filter((item) => item.id !== itemId);
    });
  };

  const value: CartContextType = {
    items,
    addItemToCart,
    removeItemFromCart,
  };

  return <CartContext.Provider children={props.children} value={value} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context)
    throw new Error("Hook useCart was used outside of <CartProvider />.");

  return context;
};
