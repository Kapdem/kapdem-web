import Image from "next/image";
import Link from "next/link";

type MemberShipBannerProps = {
  dict: any;
};

export default function MemberShipBanner({ dict }: MemberShipBannerProps) {
  const membershipBanner = dict.membershipBanner;
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#1a237e]/80 px-6 py-14 md:px-12 shadow-2xl">
      {/* Dekoratif blur objeler */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#e3f2fd] blur-3xl opacity-20 -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#90caf9] blur-3xl opacity-20 translate-y-1/3 -translate-x-1/3"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center mx-auto max-w-7xl justify-between gap-12">
        {/* Sol: Üyelik logoları */}
        <div className="flex flex-col md:flex-row md:gap-8 gap-5 w-full md:w-auto items-center">
          {[
            {
              src: "/images/user-icons/premium-icon.png",
              alt: "premium",
              label: membershipBanner.tiers.premium.label,
            },
            {
              src: "/images/user-icons/paid-icon.png",
              alt: "paid",
              label: membershipBanner.tiers.paid.label,
            },
            {
              src: "/images/user-icons/free-icon.png",
              alt: "free",
              label: membershipBanner.tiers.free.label,
            },
          ].map((icon, idx) => (
            <div
              key={idx}
              className="relative p-5 md:p-7 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full md:w-40 flex flex-col items-center"
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={100}
                height={100}
                className="mb-3 w-20 h-20 md:w-24 md:h-24 object-contain"
              />
              <div className="text-center">
                <span className="text-white font-semibold text-lg tracking-wide">
                  {icon.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sağ: Üyelik sistemi açıklaması */}
        <div className="flex-1 text-left max-w-2xl">
          <div className="inline-block px-4 py-1 bg-white/20 rounded-full mb-4">
            <span className="text-white/90 text-sm font-medium tracking-wide">
              {membershipBanner.badge}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-snug">
            {membershipBanner.title}
          </h2>

          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            {membershipBanner.description}
          </p>

          <div className="space-y-4">
            {[
              {
                title: membershipBanner.tiers.free.title,
                desc: membershipBanner.tiers.free.description,
                dot: "bg-[#90caf9]",
              },
              {
                title: membershipBanner.tiers.paid.title,
                desc: membershipBanner.tiers.paid.description,
                dot: "bg-[#ffe082]",
              },
              {
                title: membershipBanner.tiers.premium.title,
                desc: membershipBanner.tiers.premium.description,
                dot: "bg-[#ce93d8]",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full ${item.dot} mt-1`}></div>
                <div>
                  <span className="text-white font-semibold">
                    {item.title}:
                  </span>
                  <span className="text-white/80 ml-2">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-[#112a3894] to-[#112a3894] text-white font-semibold hover:opacity-90 transition-all duration-300 rounded-full shadow-lg"
            href="/membership"
          >
            {membershipBanner.detailButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
