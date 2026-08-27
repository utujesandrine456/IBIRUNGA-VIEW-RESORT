const PRODUCTION_API = "https://ibirunga-view-resort.onrender.com/api";
const LOCAL_API = "http://localhost:8000/api";

function isLocalHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  );
}

function runningLocally() {
  if (typeof window !== "undefined") {
    return isLocalHost(window.location.hostname);
  }
  return process.env.NODE_ENV === "development";
}

/** Local dev → localhost backend; hosted site → Render backend. */
export function getApiBaseUrl(): string {
  if (runningLocally()) {
    return LOCAL_API;
  }

  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.API_URL?.trim();

  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  return PRODUCTION_API;
}
