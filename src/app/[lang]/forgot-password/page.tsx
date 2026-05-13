import React from "react";
import ForgotPasswordView from "../../../views/ForgotPasswordView";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function ForgotPasswordPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <ForgotPasswordView dict={dict} lang={lang} />
    </div>
  );
}
