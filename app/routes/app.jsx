import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import st from "./_index/style.css";

import { BASIC_PLAN, STANDARD_PLAN, PREMIUM_PLAN, authenticate } from "../shopify.server"; // Importe os três planos

export const links = () => [{ rel: "stylesheet", href: st }];

export async function loader({ request }) {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.require({
    plans: [BASIC_PLAN, STANDARD_PLAN, PREMIUM_PLAN], // Use os três planos
    isTest: true,
    onFailure: async () => {
      // Pode usar um dos três planos como fallback, por exemplo: plan: BASIC_PLAN
      return await billing.request({ plan: BASIC_PLAN });
    },
  });

  if (billingCheck.hasActivePayment) {
    redirect("/app");
  }

  return json({ apiKey: process.env.SHOPIFY_API_KEY });
}

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/config" rel="config">
          Configurações
        </Link>
      </ui-nav-menu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
