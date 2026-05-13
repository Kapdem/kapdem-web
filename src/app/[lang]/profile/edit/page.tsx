import EditProfile from "@/components/EditProfile";
import { getProfile } from "@/lib/data";

import { redirect } from "next/navigation";
import React from "react";
import { getDictionary } from "../../dictionaries";

type Props = {
  params: { lang: string };
};

export default async function page({ params }: Props) {
  const response = await getProfile();
  const awaitedParams = await params;
  const dict = await getDictionary(params.lang);

  // Eğer kullanıcı verisi yoksa veya authentication başarısız olursa login sayfasına yönlendir
  if (!response || response.success === false || response.statusCode === 401) {
    redirect(`/${params.lang}/login`);
  }

  const user = response;

  return (
    <div>
      <EditProfile dict={dict} lang={awaitedParams.lang} />
    </div>
  );
}
