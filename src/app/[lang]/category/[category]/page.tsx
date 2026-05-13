import CategoryView from "@/views/CategoryView";
import { getDictionary } from "../../dictionaries";

type Props = {
  params: Promise<{
    category: string;
    lang: string;
  }>;
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);
  return <CategoryView params={params} dict={dict} />;
}
