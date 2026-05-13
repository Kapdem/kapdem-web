import React from "react";
import ContactPage from "../../../views/ContactPage";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function page({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <ContactPage dict={dict} />
    </div>
  );
}
