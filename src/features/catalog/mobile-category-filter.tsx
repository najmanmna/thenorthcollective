"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Category } from "@/types/product";
import { CategorySidebar } from "./category-sidebar";

export function MobileCategoryFilter({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Filter by category">
          <Filter className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-surface">
        <SheetHeader>
          <SheetTitle className="font-display text-base">
            Shop by Category
          </SheetTitle>
        </SheetHeader>
        <div className="px-4" onClick={() => setOpen(false)}>
          <CategorySidebar categories={categories} activeCategory={activeCategory} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
