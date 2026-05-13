import React from "react";
import { getDictionary } from "../dictionaries";
import SendPaperPage from "../../../components/SendPaperPage";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function page({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <SendPaperPage dict={dict} />;
}
