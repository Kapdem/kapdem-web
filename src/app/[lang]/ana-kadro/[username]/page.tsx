import { getTeamMemberByUsername } from "@/lib/data";
import TeamMemberDetail from "@/components/TeamMemberDetail/TeamMemberDetail";
import React from "react";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";

type Props = {
  params: Promise<{ lang: string; username: string }>;
};

export default async function page({ params }: Props) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);

  const res = await getTeamMemberByUsername(awaitedParams.username);

  // Hata durumunu kontrol et
  if (!res || res?.error || res?.statusCode === 404) {
    return (
      <div className="min-h-screen flex items-center  justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {dict?.teamMemberDetail?.notFound?.title || "Üye Bulunamadı"}
          </h1>
          <p className="text-gray-600 mb-8">
            {dict?.teamMemberDetail?.notFound?.description ||
              "Aradığınız üye bulunamadı veya erişilemiyor."}
          </p>
          <Link
            href={`/${awaitedParams.lang}/ana-kadro`}
            className="inline-flex items-center gap-2 bg-[#002C54] text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            ←{" "}
            {dict?.teamMemberDetail?.notFound?.backButton || "Ana Kadroya Dön"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-12">
      <TeamMemberDetail member={res} dict={dict} lang={awaitedParams.lang} />
    </div>
  );
}
