export type Availability = "available" | "preorder";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  availability: Availability;
  image: string;
  category: string;
  featured?: boolean;
  isNew?: boolean;
  description?: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image?: string;
};
