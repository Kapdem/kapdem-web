import React from "react";
import ResetPasswordView from "../../../views/ResetPasswordView";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function ResetPasswordPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <ResetPasswordView dict={dict} lang={lang} />
    </div>
  );
}
