import { useCallback } from "react";
import { useAccount, useUpdateAccount } from "../store.tsx";
import { UnAuthenticatedError, apiFetch } from "@helpers/website";

export type Account = { name: string; email: string };

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export function useAuth() {
  const updateAccount = useUpdateAccount();
  const account = useAccount();

  let status = AuthStatus.Unknown;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(() => {
    apiFetch<Account>("/me", {})
      .then(updateAccount)
      .catch(() => {
        updateAccount(null);
        throw new UnAuthenticatedError();
      });
  }, []);

  const login = useCallback(
    (fullName: string, email: string, password: string) => {
      apiFetch<Account>("/login", { json: { fullName, email, password } }).then(
        updateAccount,
      );
    },
    [],
  );

  const logout = useCallback(() => {
    apiFetch<Account>("/logout", { method: "DELETE" }).then(updateAccount);
  }, []);

  return {
    account,
    status,
    authenticate,
    login,
    logout,
  };
}
