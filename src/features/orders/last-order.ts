export type SubmittedOrderItem = {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
};

export type SubmittedOrder = {
  orderNumber: string;
  items: SubmittedOrderItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  submittedAt: string;
};

const LAST_ORDER_KEY = "north-collective-last-order";

export function saveLastOrder(order: SubmittedOrder) {
  window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}

export function readLastOrder(): SubmittedOrder | null {
  try {
    const raw = window.localStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as SubmittedOrder) : null;
  } catch {
    return null;
  }
}
