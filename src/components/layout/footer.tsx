import Image from "next/image";
import Link from "next/link";

import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/social-icons";
import { SOCIAL_LINKS } from "@/lib/constants/social";

const SOCIALS = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
];

const SHOP_LINKS = [{ label: "All Products", href: "/shop" }];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "Contact", href: "/contact" },
];

const AVAILABLE_ON = [
  {
    label: "Pay with Koko",
    href: "https://paykoko.com",
    image: "/koko.png",
    width: 74,
    height: 34,
  },
  {
    label: "Order on Uber Eats",
    // TODO: replace with The North Collective's actual Uber Eats store listing URL
    href: "https://www.ubereats.com",
    image: "/uber-eats.svg",
    width: 100,
    height: 16,
  },
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
      <span className="text-[10px] font-bold tracking-[0.3em] text-bronze uppercase">
        {title}
      </span>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-ink/70 transition-colors duration-200 hover:text-bronze"
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
    <footer className="border-t border-ink/10 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Now Available On */}
        <div className="flex flex-col items-center gap-6 pb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-bronze uppercase">
            Now Available On
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {AVAILABLE_ON.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="opacity-70 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  width={item.width}
                  height={item.height}
                  className="h-8 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-16 border-t border-ink/10 pt-16 lg:grid-cols-12 lg:gap-8">
          {/* Brand Anchor Column */}
          <div className="flex flex-col gap-6 lg:col-span-5 lg:pr-12">
            <div className="flex flex-col gap-4">
              <Image
                src="/North Collective Logo copy.png"
                alt="The North Collective"
                width={80}
                height={80}
                className="h-16 w-16 object-contain"
              />
              <span className="font-display text-2xl tracking-tight text-ink uppercase">
                The North Collective
              </span>
            </div>
            <p className="max-w-md text-xs leading-loose tracking-wide text-stone">
              Curated global finds, sourced from Canada and carried home to
              Sri Lanka. Chosen with care, never mass-produced.
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-[0.3em] text-bronze uppercase">
                Connect With Us
              </span>
              <div className="flex items-center gap-4">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-ink/60 transition-colors duration-200 hover:text-bronze"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-12 sm:gap-16 lg:col-span-7 lg:pl-16">
            <FooterColumn title="Shop" links={SHOP_LINKS} />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
          </div>
        </div>

        {/* Sub-Footer / Copyright */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-ink/10 pt-8 text-[10px] font-bold tracking-[0.2em] text-ink/50 uppercase sm:flex-row">
          <p>&copy; {new Date().getFullYear()} The North Collective.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </div>

          <p>
            Site by{" "}
            <a
              href="https://ahamedwebstudio.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bronze transition-colors hover:text-ink"
            >
              Ahamed Web Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
