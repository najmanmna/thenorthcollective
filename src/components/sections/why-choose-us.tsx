import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Authentic Products",
  },
  {
    icon: MapPin,
    title: "Direct from Canada",
  },
  {
    icon: MessageCircle,
    title: "Easy Ordering",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Structural Grid Container */}
        <div className="border-y border-ink/10">
          <div className="grid grid-cols-1 divide-y divide-ink/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            
            {REASONS.map((reason) => (
              <div
                key={reason.title}
                className="group flex flex-col items-center p-10 text-center transition-colors duration-300 hover:bg-ink/[0.02]"
              >
                {/* Framed Icon */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center border border-ink/10 bg-transparent text-bronze transition-colors duration-300 group-hover:border-bronze">
                  <reason.icon
                    className="h-11 w-11"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </div>

                {/* Typography */}
                <h3 className="font-display text-xl text-ink">
                  {reason.title}
                </h3>
              </div>
            ))}
            
          </div>
        </div>

      </div>
    </section>
  );
}