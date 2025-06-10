import { Button, FieldForm, FormComponent } from "@ui/website";

function App() {
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLFormElement;
    const form = new FormData(element);
    const doc = Object.fromEntries(form);
    // console.log(doc);
    fetch("http://localhost:3333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
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
    </>
  );
}

export default App;
