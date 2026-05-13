import AnakadroView from "@/components/AnaKadro/AnakadroView";
import { getTeamMembers } from "@/lib/data";

import React from "react";
import { getDictionary } from "../dictionaries";

export default async function page({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const res = await getTeamMembers();

  // Hata durumunu kontrol et
  if (res?.error || res?.statusCode === 403) {
    console.error("Team members access error:", res);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {dict?.teamMembersList?.errorTitle ||
              "Ana Kadro Bilgileri Yüklenemedi"}
          </h1>
          <p className="text-gray-600">
            {dict?.teamMembersList?.errorMessage ||
              "Ana kadro bilgilerine şu anda erişilemiyor. Lütfen daha sonra tekrar deneyin."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AnakadroView res={res} dict={dict} lang={lang} />
    </div>
  );
}
