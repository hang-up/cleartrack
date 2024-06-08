import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const proxyUrl = import.meta.env.VITE_PROXY_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY;

let client: SupabaseClient<any, "public", any> | null = null;

/**
 * Client that is used to call Supabase.
 * Use this client when you need to perform simple operations on the frontend by hitting supabase directly.
 *
 */
const useSupabase = (userOptions = {}) => {
  const options = {
    ...userOptions,
  };
  client = client || createClient(supabaseUrl, supabaseAnonKey, options);
  return client;
};

/**
 * Client that is used to call Hono's backend (our proxy layer that calls Supabase).
 * Use this client when you need to perform additional complex processing that shouldn't happen on the frontend.
 *
 */
const useProxyClient = () => {
  const defaultHeaders = {
    //TODO: This will silently fail, we need to make more noise if the token is missing and/or invalid.
    Authorization:
      JSON.parse(
        window.localStorage.getItem(`sb-${projectKey}-auth-token`) || ""
      )?.access_token || "",
    "Content-Type": "application/json",
    Connection: "keep-alive",
    "X-Client-Info": "hono-proxy-client",
  };

  return {
    get: async (url: string, options?: any) => {
      const res = await fetch(`${proxyUrl}${url}`, {
        method: "GET",
        headers: defaultHeaders,
        ...options,
      }).catch((e) => {
        throw new Error(`Error fetching ${url}`, { cause: e });
      });

      return {
        data: await res.json(),
        raw: res,
        hasErrors: !res.ok,
      };
    },

    post: async (
      url: string,
      payload: any,
      options: { cache?: RequestCache } = {}
    ) => {
      const res = await fetch(`${proxyUrl}${url}`, {
        method: "POST",
        headers: {
          ...defaultHeaders,
          "Cache-Control": options?.cache || "no-cache",
        },
        body: JSON.stringify(payload),
        ...options,
      }).catch((e) => {
        throw new Error(`Error posting to ${url}`, { cause: e });
      });

      return {
        data: await res.json(),
        raw: res,
        hasErrors: !res.ok,
      };
    },
  };
};

export { useSupabase, useProxyClient };
