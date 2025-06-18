import React from "react";
import { Button, Field, FormComponent } from "@ui/website";
import { useAuth } from "../../hooks/useAuth.ts";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLFormElement;
    const form = new FormData(element);
    const doc = Object.fromEntries(form);

    login(doc);
    navigate("/organizations/create");
  };

  return (
    <>
      <FormComponent onSubmit={handleSubmit}>
        <Field type="email" label="Email" name="email" />
        <Field type="password" label="Password" name="password" />
        <Button type="submit" children="send" />
      </FormComponent>
    </>
  );
}
