import { apiFetch } from "@helpers/website";
import { useAsyncEffect } from "../../hooks/useAsyncEffect.tsx";
import { useOrganization } from "../../store.tsx";

export default function View() {
  const organization = useOrganization();

  useAsyncEffect(async () => {
    const data = await apiFetch("/courses");
    console.log(data.organization);
  }, []);

  console.log(organization);

  return <div>hello world !</div>;
}
