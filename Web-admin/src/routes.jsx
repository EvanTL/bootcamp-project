import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, Products } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Users } from "./pages/dashboard/users";
import { ProductEditScreen } from "./pages/dashboard/ProductEditScreen";
import { ProductCreateScreen } from "./pages/dashboard/ProductCreateScreen";
import { UserEditScreen } from "./pages/dashboard/UserEditScreen";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "products",
        path: "/products",
        element: <Products />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Edit Product",
        path: "/editproduct/*",
        element: <ProductEditScreen/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Create Product",
        path: "/createproduct/",
        element: <ProductCreateScreen/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Edit User",
        path: "/edituser/*",
        element: <UserEditScreen/>,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
