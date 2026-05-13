import RoportajlarView from "@/views/RoportajlarView";
import React from "react";
import { getDictionary } from "../dictionaries";

type Props = {
  params: {
    lang: string;
  };
};

export default async function page({ params }: Props) {
  const awaitParams = await params;
  const dict = await getDictionary(awaitParams.lang);
  return (
    <div>
      <RoportajlarView dict={dict} />
    </div>
  );
}
