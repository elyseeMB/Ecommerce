import { apiFetch } from "@helpers/website";
import { useAccount, useOrganization } from "../../store.tsx";
import { useAsyncEffect } from "../../hooks/useAsyncEffect.tsx";
import type { FormEventHandler } from "react";

export default function AccessLevelsPage() {
  const account = useAccount();
  const organization = useOrganization();

  console.log(organization);

  useAsyncEffect(async () => {
    const data = await apiFetch("/access-levels");
    console.log(data);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const response = await apiFetch("/access-levels", { json: data });

    console.log(response);
  };

  return (
    <div>
      <div className="max-w-screen-lg m-auto">
        <div className="bg-background text-foreground p-6 rounded-lg">
          <h2 className="text-xl font-bold text-primary">Access Levels</h2>
          <p className="text-muted-foreground">Ce texte est en muted</p>
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md">
            Supprimer
          </button>
        </div>

        <h1 className="text-3xl text-foreground">Hello world!</h1>

        <div className="wrapper bg-card text-card-foreground rounded-xl p-4 shadow border border-border">
          hello {account.fullName}
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" />
            <input type="string" name="color" placeholder="color" />
            <button type="submit">envoyer</button>
          </form>
        </div>

        <div className="w-full max-w-screen-xl mx-auto bg-card text-card-foreground border border-border rounded-xl py-4 px-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-4 font-semibold text-foreground">
                  Name
                </th>
                <th className="py-2 px-4 font-semibold text-foreground">
                  Status
                </th>
                <th className="py-2 px-4 font-semibold text-foreground">
                  Difficulty
                </th>
                <th className="py-2 px-4 font-semibold text-foreground">
                  Access
                </th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-muted">
                <td className="py-2 px-4 text-primary hover:underline cursor-pointer">
                  JavaScript Basics
                </td>
                <td className="py-2 px-4 text-foreground">Published</td>
                <td className="py-2 px-4 text-foreground">Beginner</td>
                <td className="py-2 px-4 text-foreground">Public</td>
                <td className="py-2 px-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    ⋮
                  </button>
                </td>
              </tr>
              <tr className="border-b border-border hover:bg-muted">
                <td className="py-2 px-4 text-primary hover:underline cursor-pointer">
                  Advanced CSS Grid
                </td>
                <td className="py-2 px-4 text-foreground">Draft</td>
                <td className="py-2 px-4 text-foreground">Advanced</td>
                <td className="py-2 px-4 text-foreground">Private</td>
                <td className="py-2 px-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    ⋮
                  </button>
                </td>
              </tr>
              <tr className="border-b border-border hover:bg-muted">
                <td className="py-2 px-4 text-primary hover:underline cursor-pointer">
                  React for Designers
                </td>
                <td className="py-2 px-4 text-foreground">Scheduled</td>
                <td className="py-2 px-4 text-foreground">Intermediate</td>
                <td className="py-2 px-4 text-foreground">Restricted</td>
                <td className="py-2 px-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    ⋮
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-muted-foreground"
                >
                  Loading more courses...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
