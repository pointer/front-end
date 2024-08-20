import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore, useAlertStore } from "@/store";
import accountRoutes from "./account.routes";
import usersRoutes from "./users.routes";
import HomeView from "../components/HomePage.vue";
import LoginView from "../views/account/LoginView.vue";
import Logout from "../components/Logout.vue";
import UserDataView from "../views/UserDataView.vue";
import UserTimesheetView from "../views/UserTimesheetView.vue";
// import AdminUserView from "../views/AdminUsers.vue";
// import AdminAgents from "../views/AdminAgents.vue";

import SupervisorView from "../views/SupervisorView.vue";
import AppView from "../App.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/account/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/user-data",
    name: "UserData",
    component: UserDataView,
    meta: { role: 0 },
  },
  {
    path: "/time-sheet",
    name: "TimeSheet",
    component: UserTimesheetView,
    // beforeEnter: AppView.guardMyroute,
    meta: { role: "Employee", title: "Time Sheet" },
  },
  {
    path: "/approbation",
    name: "Approbation",
    component: SupervisorView,
    // beforeEnter: AppView.guardMyroute,
    // meta: { role: 1, title: "Approbation" },
  },
  //   {
  //   path: '/admin/agents',
  //   name: 'AdminAgents',
  //   component: AdminAgents
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/NotFound.vue"),
  },
  { ...accountRoutes },
  { ...usersRoutes },
  // catch all redirect to home page
  { path: "/:pathMatch(.*)*", redirect: "/" },
  // Add other routes as needed
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (to.meta.role && (!user || user.role !== to.meta.role)) {
//     next("/login");
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/account/login", "/account/register", "/user-data"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/account/login";
  }
});

export default router;
