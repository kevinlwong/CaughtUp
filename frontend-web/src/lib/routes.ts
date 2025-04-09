// frontend-web/lib/routes.ts

export const ROUTES = {
    login: "/login",
    home: "/home",
    quiz: "/quiz",
    results: "/results",
    onboarding: {
      welcome: "/onboarding/welcome",
      name: "/onboarding/name",
      generation: "/onboarding/generation",
      interests: "/onboarding/interests",
      premium: "/onboarding/premium",
    },
  };
  

//   usage
// import { ROUTES } from "../lib/routes";
// router.push(ROUTES.onboarding.name);