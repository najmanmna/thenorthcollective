"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES } from "@/content/categories";
import { useOrderList } from "@/features/orders/order-list-context";

const NAV_LINKS = [
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalCount } = useOrderList();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* 1. LEFT: Logo + wordmark */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/North Collective Logo copy.png"
              alt="The North Collective"
              width={44}
              height={44}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="font-display text-lg tracking-wide text-ink hidden sm:block">
              The North Collective
            </span>
          </Link>
        </div>

        {/* 2. CENTER: Nav links (Desktop only) */}
        <nav className="hidden shrink-0 items-center justify-center gap-8 text-sm font-medium text-ink/80 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 outline-none transition-colors hover:text-ink">
              Shop
              <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link href={`/shop/${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/shop" className="font-semibold text-bronze">
                  View All Products
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 3. RIGHT: Search, Cart, and Mobile Menu */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          
          {/* Search (Desktop) */}
          <form
            action="/shop"
            method="GET"
            className="hidden max-w-[200px] xl:max-w-xs flex-1 items-center border border-ink/20 bg-surface transition-colors focus-within:border-ink/50 lg:flex"
          >
            <Search className="ml-3 h-4 w-4 shrink-0 text-bronze" />
            <input
              type="text"
              name="q"
              placeholder="Search..."
              aria-label="Search products or brands"
              className="w-full bg-transparent px-3 py-2 text-sm text-ink placeholder:text-stone focus:outline-none"
            />
          </form>

          {/* Search Icon (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            asChild
            className="lg:hidden"
          >
            <Link href="/shop">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {/* Cart Icon */}
          <Button variant="ghost" size="icon" aria-label="View order list" asChild>
            <Link href="/order-list" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-bronze px-1 text-[10px] font-bold text-ivory">
                  {totalCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5 font-display text-base">
                  <Image
                    src="/North Collective Logo copy.png"
                    alt="The North Collective"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  The North Collective
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                <form
                  action="/shop"
                  method="GET"
                  className="mx-4 flex items-center border border-ink/20 bg-surface focus-within:border-ink/50"
                >
                  <Search className="ml-3 h-4 w-4 shrink-0 text-bronze" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search products..."
                    aria-label="Search products or brands"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-stone focus:outline-none"
                  />
                </form>

                <nav className="flex flex-col gap-1 px-4">
                  <span className="px-2 pb-1 pt-3 text-xs font-medium uppercase tracking-wide text-bronze">
                    Shop by Category
                  </span>
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/shop/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-2 py-3 text-base text-ink transition-colors hover:bg-muted hover:text-bronze"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-3 text-base font-medium text-bronze transition-colors hover:bg-muted"
                  >
                    View All Products
                  </Link>

                  <div className="my-2 border-t border-ink/10" />

                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-2 py-3 text-base text-ink transition-colors hover:bg-muted hover:text-bronze"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}