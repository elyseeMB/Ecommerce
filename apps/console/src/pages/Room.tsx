import { useEffect } from "react";
import { AuthStatus, useAuth } from "../hooks/useAuth.ts";
import { UnAuthenticatedError } from "@helpers/website";
import { useAccount } from "../store.tsx";

export function Room() {
  const account = useAccount();
  const { status } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.Guest) {
      throw new UnAuthenticatedError();
    }
  }, []);

  return (
    <div>
      hello {account.user.fullName}
      <div className="bg-background text-foreground p-6 space-y-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">Titre principal</h2>
          <p className="text-secondary">Texte secondaire contextuel</p>
          <p className="text-primary-foreground bg-primary p-2 rounded">
            Texte inversé sur fond primary
          </p>
          <p className="text-secondary-foreground bg-secondary p-2 rounded">
            Texte inversé sur fond secondary
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-accent">Accentué</h3>
          <p className="bg-accent text-accent-foreground p-2 rounded">
            Texte accentué
          </p>
          <p className="text-muted-foreground">
            Texte désactivé ou en arrière-plan
          </p>
          <div className="bg-muted p-4 rounded border border-border">
            Contenu dans un bloc muted
          </div>
        </div>

        <div className="space-y-2">
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md">
            Supprimer
          </button>
          <input
            type="text"
            className="bg-input border border-border text-foreground p-2 rounded-md ring-2 ring-ring focus:outline-none"
            placeholder="Champ de saisie"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-popover text-popover-foreground p-4 rounded-xl shadow">
            Zone de popover
          </div>
          <div className="bg-card text-card-foreground p-4 rounded-xl shadow">
            Zone de carte
          </div>
        </div>
      </div>
    </div>
  );
}
