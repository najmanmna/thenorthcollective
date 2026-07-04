import Link from "next/link";

const SHOP_LINKS = [
  { label: "All Products", href: "/shop" },
  { label: "Collections", href: "/collections" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <span className="text-[10px] font-bold tracking-[0.2em] text-bronze uppercase">
        {title}
      </span>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block text-sm font-medium text-ink/70 transition-all duration-300 hover:text-ink hover:translate-x-1"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-surface pt-2">
      {/* Editorial Double Border Top */}
      <div className="absolute top-0 left-0 w-full border-t border-ink/20" />
      <div className="absolute top-1 left-0 w-full border-t border-ink/5" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand Anchor Column */}
          <div className="flex flex-col gap-5 lg:col-span-2 pr-8">
            <div className="flex flex-col gap-4">
              {/* Compass Icon Integration */}
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="h-6 w-6 text-bronze"
              >
                <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
              </svg>
              <span className="font-display text-2xl text-ink tracking-wide">
                The North Collective
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/75">
              Curated global finds, sourced from Canada and carried home to
              Sri Lanka. Chosen with care, never mass-produced.
            </p>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        {/* Sub-Footer / Copyright */}
        <div className="mt-20 flex flex-col gap-4 border-t border-ink/15 pt-8 text-xs font-medium tracking-wide text-ink/60 sm:flex-row sm:items-center sm:justify-between uppercase">
          <span>
            &copy; {new Date().getFullYear()} The North Collective. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <span className="text-bronze/40">•</span>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] tracking-wide text-ink/50 sm:text-left">
          Designed and developed by{" "}
          <a
            href="https://ahamedwebstudio.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bronze transition-colors hover:text-ink"
          >
            AWS
          </a>
        </div>
      </div>
    </footer>
  );
}