"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OrderListItem = {
  productId: string;
  quantity: number;
};

type OrderListContextValue = {
  items: OrderListItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearItems: () => void;
  totalCount: number;
};

const OrderListContext = createContext<OrderListContextValue | null>(null);

const STORAGE_KEY = "north-collective-order-list";

export function OrderListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderListItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Ignore malformed or inaccessible storage; start from an empty list.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { productId, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
    );
  };

  const clearItems = () => {
    setItems([]);
  };

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearItems, totalCount }),
    [items, totalCount]
  );

  return (
    <OrderListContext.Provider value={value}>
      {children}
    </OrderListContext.Provider>
  );
}

export function useOrderList() {
  const context = useContext(OrderListContext);
  if (!context) {
    throw new Error("useOrderList must be used within an OrderListProvider");
  }
  return context;
}
