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
  hostName: "https://viperprotect.store/",
  isEmbeddedApp: false,
  restResources
})

// Definição dos novos planos
export const BASIC_PLAN = 'Basic Plan';
export const STANDARD_PLAN = 'Standard Plan';
export const PREMIUM_PLAN = 'Premium Plan';

const shopify = shopifyApp({
  billing: {
    [BASIC_PLAN]: {
      amount: 9.90, // Preço do plano básico
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
    },
    [STANDARD_PLAN]: {
      amount: 25.90, // Preço do plano padrão
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
    },
    [PREMIUM_PLAN]: {
      amount: 48.50, // Preço do plano premium
      currencyCode: 'USD',
      interval: BillingInterval.Every30Days,
    },
  },
  apiKey: "f0067f0bff8184be8a9f1b7c59aae903",
  apiSecretKey: "ba72f01fdf360010b972de17565c2643",
  apiVersion: LATEST_API_VERSION,
  scopes: ["read_script_tags", "write_script_tags"],
  appUrl: "https://viperprotect.store/",
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

// Função para verificar o status da assinatura do aplicativo
export async function checkUserPlanStatus(shop, accessToken) {
  const client = new shopifyApi.Clients.GraphQL(shop, accessToken);

  const QUERY = `
    {
      currentAppInstallation {
        activeSubscriptions {
          status
        }
      }
    }
  `;

  try {
    const response = await client.query({ data: QUERY });
    const subscriptions = response.body.data.currentAppInstallation.activeSubscriptions;

    // Verifica se há alguma assinatura ativa
    return subscriptions.some(subscription => subscription.status === 'ACTIVE');
  } catch (error) {
    console.error('Erro ao verificar o status da assinatura:', error);
    return false; // Retorna false em caso de erro
  }
}

export default shopify;
export const apiVersion = LATEST_API_VERSION;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
