import { shopifyApi } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2022-10';
import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  BillingInterval,
  DeliveryMethod,
  LATEST_API_VERSION,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";

import prisma from "./db.server";

export const apiShopify = shopifyApi({
  apiKey: "f0067f0bff8184be8a9f1b7c59aae903",
  apiSecretKey: "ba72f01fdf360010b972de17565c2643" || "",
  apiVersion: LATEST_API_VERSION,
  scopes: ["read_script_tags", "write_script_tags"],
  hostName: "https://vipertesteblinder.myshopify.com",
  isEmbeddedApp: false,
  restResources
})

export const MONTHLY_PLAN = 'Monthly subscription';
export const ANNUAL_PLAN = 'Annual subscription';

const shopify = shopifyApp({
  billing: {
    [MONTHLY_PLAN]: {
      amount: 5,
      currencyCode: 'BRL',
      interval: BillingInterval.Every30Days,
    },
    [ANNUAL_PLAN]: {
      amount: 50,
      currencyCode: 'BRL',
      interval: BillingInterval.Annual,
    },
  },
  apiKey: "f0067f0bff8184be8a9f1b7c59aae903",
  apiSecretKey: "ba72f01fdf360010b972de17565c2643",
  apiVersion: LATEST_API_VERSION,
  scopes: ["read_script_tags", "write_script_tags"],
  appUrl: "https://vipertesteblinder.myshopify.com",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});




export default shopify;
export const apiVersion = LATEST_API_VERSION;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
