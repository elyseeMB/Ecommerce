import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ContainerMenu,
  Content,
  Item,
  ListItem,
  NavigationMenu,
  Trigger,
} from "./NavigationMenu.tsx";
import { Icon, IconSymbols } from "../../atoms/icon/Icon.tsx";

const meta = {
  title: "Organisms/NavigationMenu",
  component: NavigationMenu,
  decorators: [
    (Story) => (
      <>
        <IconSymbols />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <NavigationMenu>
        <ContainerMenu>
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
    </>
  ),
};
