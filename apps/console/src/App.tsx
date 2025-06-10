import { Button, FieldForm, FormComponent } from "@ui/website";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLFormElement;
    const form = new FormData(element);
    const doc = Object.fromEntries(form);
    // console.log(doc);
    fetch("http://localhost:3333/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res), setToken(res.token);
      });
  };

  console.log(token);

  const handleSubmitOrganization: React.FormEventHandler = (e) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLFormElement;
    const form = new FormData(element);
    const doc = Object.fromEntries(form);
    fetch("http://localhost:3333/organizations/create", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(doc),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <>
      <FormComponent onSubmit={handleSubmit}>
        <FieldForm type="text" label="FullName" name="fullName" />
        <FieldForm type="email" label="Email" name="email" />
        <FieldForm type="password" label="Password" name="password" />
        <Button type="submit" children="send" />
      </FormComponent>

      <h1>Organization</h1>
      <FormComponent onSubmit={handleSubmitOrganization}>
        <FieldForm type="text" label="Organization" name="name" />
        <Button type="submit" children="send" />
      </FormComponent>
    </>
  );
}

export default App;
