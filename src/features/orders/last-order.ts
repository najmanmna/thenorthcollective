export type SubmittedOrderItem = {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image?: string;
};

export type SubmittedOrder = {
  orderNumber: string;
  items: SubmittedOrderItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    notes?: string;
  };
  submittedAt: string;
};

const LAST_ORDER_KEY = "north-collective-last-order";

export function saveLastOrder(order: SubmittedOrder) {
  window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}

let cachedRaw: string | null = null;
let cachedOrder: SubmittedOrder | null = null;

// Cached so repeated calls from useSyncExternalStore's getSnapshot return a
// stable reference instead of re-parsing (and re-triggering renders) every time.
export function getLastOrderSnapshot(): SubmittedOrder | null {
  const raw = window.localStorage.getItem(LAST_ORDER_KEY);
  if (raw === cachedRaw) return cachedOrder;
  cachedRaw = raw;
  try {
    cachedOrder = raw ? (JSON.parse(raw) as SubmittedOrder) : null;
  } catch {
    cachedOrder = null;
  }
  return cachedOrder;
}

export function getLastOrderServerSnapshot(): SubmittedOrder | null {
  return null;
}

export function subscribeToLastOrder() {
  return () => {};
}
