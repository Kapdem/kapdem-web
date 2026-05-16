import React from "react";
import VerifyEmailView from "../../../views/VerifyEmailView";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function VerifyEmailPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <VerifyEmailView dict={dict} lang={lang} />
    </div>
  );
}
