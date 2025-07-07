import { useEffect, type PropsWithChildren } from "react";
import { AuthStatus, useAuth, type Account } from "../hooks/useAuth.ts";
import { UnAuthenticatedError, apiFetch } from "@helpers/website";
import { useAccount, useOrganization } from "../store.tsx";
import { ConfirmDialog, Header, IconSymbols, ItemHeader } from "@ui/website";
import { Link, Outlet } from "react-router";

export function MainLayout({ children }: PropsWithChildren) {
  const account = useAccount();
  const organization = useOrganization();
  const { status } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.Guest) {
      throw new UnAuthenticatedError();
    }
  }, []);

  useEffect(() => {
    const info = apiFetch<Account>("/me");
  }, []);

  return (
    <div className="main">
      <Header user={{ name: account.fullName }}>
        <div className="flex items-center justify-center gap-3">
          <span
            className="w-2px h-15px rounded bg-black/20 block
           indent-3000 origin-center transform rotate-20deg"
          >
            arrow
          </span>
          {organization.name}
          <span
            className="w-2px h-15px rounded bg-black/20 block
           indent-3000 origin-center transform rotate-20deg"
          >
            arrow
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-5">
          <ItemHeader>
            <Link to="/courses">Courses</Link>
          </ItemHeader>
          <ItemHeader>
            <Link to="/access-levels">Access-Levels</Link>
          </ItemHeader>
          <ItemHeader>
            <Link to="/difficulties">Difficulties</Link>
          </ItemHeader>
          <ItemHeader>
            <Link to="/statuses">Statuses</Link>
          </ItemHeader>
        </div>
      </Header>
      <div className="container bg-slate-100 h-screen">
        {children ?? (
          <>
            <Outlet />
            <IconSymbols />
            <ConfirmDialog />
          </>
        )}
      </div>
    </div>
  );
}
