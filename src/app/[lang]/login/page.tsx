import LoginView from "../../../views/LoginView";
import { getDictionary } from "../dictionaries";

type Props = {
  params: { lang: string };
};

export default async function page(props: Props) {
  let params = props.params;
  if (typeof (params as any).then === "function") {
    params = await params;
  }
  const { lang } = params as { lang: string };
  const dict = await getDictionary(lang);
  return (
    <div>
      <LoginView dict={dict} lang={lang} />
    </div>
  );
}
