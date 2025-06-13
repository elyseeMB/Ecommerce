import { UnAuthenticatedError } from "@helpers/website";
import { useEffect } from "react";
import { useAccount, useData } from "../store.tsx";
import { AuthStatus, useAuth } from "../hooks/useAuth.ts";

export default function OrganizationsPage() {
  const { status, authenticate } = useAuth();
  const account = useAccount();
  const { name } = useData();

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if (status === AuthStatus.Guest) {
      throw new UnAuthenticatedError();
    }
  }, []);

  return (
    <>
      {status === AuthStatus.Unknown ? (
        <div>loading...</div>
      ) : (
        <div>Organizations Page Bonjour : {account?.name}</div>
      )}
    </>
  );
}
