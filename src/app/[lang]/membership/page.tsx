import React from "react";
import MemberShipView from "../../../views/MemberShipView";
import { getDictionary } from "../dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function page({ params }: Props) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);

  return (
    <div>
      <MemberShipView dict={dict} lang={awaitedParams.lang} />
    </div>
  );
}
