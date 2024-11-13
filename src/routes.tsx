import App from "@/App";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import CacheManagerPage from "@/pages/dashboard/cacheManager";
import EventEditPage from "@/pages/dashboard/event/edit";
import EventPage from "@/pages/dashboard/event/page";
import OrganizationPage from "@/pages/dashboard/organization/page";
import ErrorPage from "@/pages/error";
import useAuthStore from "@/stores/auth";
import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "event",

        children: [
          {
            index: true,
            Component: EventPage,
          },
          {
            path: "create",
            Component: EventEditPage,
          },
          {
            path: ":eventId/edit",
            Component: EventEditPage,
          },
        ],
      },
      {
        path: "organization",
        Component: OrganizationPage,
      },
      {
        path: "cache-manager",
        Component: CacheManagerPage,
      },
    ],
  },
  {
    path: "login",
    loader: () => {
      const user = useAuthStore.getState().user;
      if (user) {
        return redirect("/");
      }
      return null;
    },
    Component: Auth,
  },
]);

export default router;