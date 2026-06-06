import React from "react";
import OzelDosyalarPage from "../../../views/OzelDosyalar";
import { getAllSpecialFile } from "@/lib/data";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function page({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const res = await getAllSpecialFile(lang);
  return (
    <div className="mt-9">
      <OzelDosyalarPage res={res} dict={dict} lang={lang} />
    </div>
  );
}
