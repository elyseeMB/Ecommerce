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

  return <div>hello {account.user.fullName}</div>;
}
