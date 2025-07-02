import { useEffect, type PropsWithChildren } from "react";
import { AuthStatus, useAuth } from "../hooks/useAuth.ts";
import { UnAuthenticatedError } from "@helpers/website";
import { useAccount, useOrganization } from "../store.tsx";
import {
  ContainerMenu,
  Content,
  Header,
  Item,
  ListItem,
  NavigationMenu,
  Trigger,
} from "@ui/website";
import { Icon } from "@ui/website/src/stories/atoms/icon/Icon.tsx";
import { Outlet } from "react-router";

export function MainLayout({ children }: PropsWithChildren) {
  const account = useAccount();
  const organization = useOrganization();
  const { status } = useAuth();

  useEffect(() => {
    if (status === AuthStatus.Guest) {
      throw new UnAuthenticatedError();
    }
  }, []);

  return (
    <div className="main">
      <Header>
        {organization.name}
        <NavigationMenu>
          <ContainerMenu>
            {account.fullName}
            <Item>
              <Trigger
                title="Courses"
                icon={<Icon name="ArrowDropDownLine" aria-hidden />}
              />
              <Content>
                <ListItem href="https://stitches.dev/" title="Stitches">
                  CSS-in-JS with best-in-class developer experience.
                </ListItem>
                <ListItem href="/colors" title="Colors">
                  Beautiful, thought-out palettes with auto dark mode.
                </ListItem>
                <ListItem href="https://icons.radix-ui.com/" title="Icons">
                  A crisp set of 15x15 icons, balanced and consistent.
                </ListItem>
                <hr />
                <ListItem href="https://icons.radix-ui.com/" title="Icons">
                  A crisp set of 15x15 icons, balanced and consistent.
                </ListItem>
              </Content>
            </Item>

            <Item>
              <Trigger
                title="Difficulties"
                icon={<Icon name="HomeLine" aria-hidden />}
              />
              <Content>
                <ListItem href="https://stitches.dev/" title="Stitches">
                  CSS-in-JS with best-in-class developer experience.
                </ListItem>
                <ListItem href="/colors" title="Colors">
                  Beautiful, thought-out palettes with auto dark mode.
                </ListItem>
                <ListItem href="https://icons.radix-ui.com/" title="Icons">
                  A crisp set of 15x15 icons, balanced and consistent.
                </ListItem>
              </Content>
            </Item>

            <Item>
              <Trigger
                title="Statuses"
                icon={<Icon name="CommandLine" aria-hidden />}
              />
              <Content>
                <ListItem href="https://stitches.dev/" title="Stitches">
                  CSS-in-JS with best-in-class developer experience.
                </ListItem>
                <ListItem href="/colors" title="Colors">
                  Beautiful, thought-out palettes with auto dark mode.
                </ListItem>
                <ListItem href="https://icons.radix-ui.com/" title="Icons">
                  A crisp set of 15x15 icons, balanced and consistent.
                </ListItem>
              </Content>
            </Item>

            <Item>
              <Trigger
                title="Access levels"
                icon={<Icon name="ExpandUpDownLine" aria-hidden />}
              />
              <Content>
                <ListItem href="https://stitches.dev/" title="Stitches">
                  CSS-in-JS with best-in-class developer experience.
                </ListItem>
                <ListItem href="/colors" title="Colors">
                  Beautiful, thought-out palettes with auto dark mode.
                </ListItem>
                <ListItem href="https://icons.radix-ui.com/" title="Icons">
                  A crisp set of 15x15 icons, balanced and consistent.
                </ListItem>
              </Content>
            </Item>
          </ContainerMenu>
        </NavigationMenu>
      </Header>
      <div className="container bg-slate-100">{children ?? <Outlet />}</div>
    </div>
  );
}
