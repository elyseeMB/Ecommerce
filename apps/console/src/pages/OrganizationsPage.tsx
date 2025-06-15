import { UnAuthenticatedError } from "@helpers/website";
import { useEffect } from "react";
import { useAccount, useData } from "../store.tsx";
import { AuthStatus, useAuth } from "../hooks/useAuth.ts";
import { Button, Field, FormComponent } from "@ui/website";

export default function OrganizationsPage() {
  const { status, authenticate } = useAuth();
  const account = useAccount();

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if (status === AuthStatus.Guest) {
      throw new UnAuthenticatedError();
    }
  }, []);

  const handleSubmitOrganization: React.FormEventHandler = (e) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLFormElement;
    const form = new FormData(element);
    const doc = Object.fromEntries(form);
    fetch("http://localhost:3333/organizations/create", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"d"}`,
      },
      // body: JSON.stringify(doc),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <>
      {status === AuthStatus.Unknown ? (
        <div>loading...</div>
      ) : (
        <div>Organizations Page Bonjour : {account.user?.fullName}</div>
      )}

      <h1>Organization</h1>
      <FormComponent onSubmit={handleSubmitOrganization}>
        <Field type="text" label="Organization" name="name" />
        <Button type="submit" children="send" />
      </FormComponent>
    </>
  );
}
