import { UnAuthenticatedError } from "@helpers/website";
import { useEffect } from "react";
import { Button, Field, FormComponent } from "@ui/website";
import { useUpdateOrganization } from "../../store.tsx";
import { AuthStatus, useAuth } from "../../hooks/useAuth.ts";
import { useNavigate } from "react-router";

export default function OrganizationsPage() {
  const { status, authenticate } = useAuth();
  const updateOrganization = useUpdateOrganization();
  const navigation = useNavigate();

  useEffect(() => {
    if (status === AuthStatus.Guest) {
      throw new UnAuthenticatedError();
    }
    authenticate();
  }, []);

  const handleSubmitOrganization: React.FormEventHandler = (e) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLFormElement;
    const form = new FormData(element);
    const doc = Object.fromEntries(form);
    fetch("http://localhost:3333/organizations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(updateOrganization);

    navigation("/courses");
  };

  return (
    <>
      {status === AuthStatus.Unknown ? (
        <div>loading...</div>
      ) : (
        <>
          <h1>Organization</h1>
          <FormComponent onSubmit={handleSubmitOrganization}>
            <Field type="text" label="Organization" name="name" />
            <Button type="submit" children="send" />
          </FormComponent>
        </>
      )}
    </>
  );
}
