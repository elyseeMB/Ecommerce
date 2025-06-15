import { Button, FormComponent } from "@ui/website";
import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
