// ----------------------------------------------------------------------

import { SignButton } from "@/app/component/SignInButton";
import { TabsLabel } from "@/app/component/TabLabel";

interface NavItem {
  title: string;
  handleClick: () => void;
  component?: React.ReactElement;
}

export const navContent: NavItem[] = [
  {
    title: "Home",
    handleClick: () => {},
    component: <TabsLabel path="/" label="Home" />,
  },
  {
    title: "About",
    handleClick: () => {},
    component: <TabsLabel path="/" label="  About" />,
  },
  {
    title: "Join now",
    handleClick: () => {},
    component: <SignButton title="Join now" path="/account/login" />,
  },
];