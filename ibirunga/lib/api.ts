const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://ibirunga-view-resort.onrender.com/api';

const TOKEN_KEY = 'ibirunga_admin_token';
const ADMIN_KEY = 'ibirunga_admin_user';

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role?: 'admin';
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function getStoredAdmin(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function setStoredAdmin(admin: AdminUser) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

function redirectToLogin() {
  if (typeof window === 'undefined') return;
  clearToken();
  if (!window.location.pathname.startsWith('/admin/login')) {
    window.location.assign('/admin/login');
  }
}

type RequestOpts = RequestInit & {
  /** When true, 401 does not force a hard redirect (caller handles it). */
  softAuth?: boolean;
};

async function request<T>(
  path: string,
  options: RequestOpts = {},
  auth = false,
): Promise<T> {
  const { softAuth = false, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (!token) {
      if (!softAuth) redirectToLogin();
      throw new ApiError('Authentication required. Please sign in again.', 401);
    }
    headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError(
        `Request timed out contacting ${API_URL}.`,
        408,
      );
    }
    throw new ApiError(
      `Cannot reach the CMS API at ${API_URL}.`,
      0,
    );
  } finally {
    clearTimeout(timeout);
  }

  if (res.status === 401) {
    const err = await res.json().catch(() => ({ message: 'Authentication required' }));
    const message = Array.isArray(err.message)
      ? err.message.join(', ')
      : err.message || 'Authentication required. Please sign in again.';
    if (!softAuth) redirectToLogin();
    throw new ApiError(message, 401);
  }

  if (res.status === 429) {
    throw new ApiError('Too many requests. Please wait a moment and try again.', 429);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    const message = Array.isArray(err.message)
      ? err.message.join(', ')
      : err.message ?? res.statusText;
    throw new ApiError(message || 'Request failed', res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  login: (email: string, password: string) =>
    request<{
      accessToken: string;
      admin: AdminUser;
      tokenType?: string;
      expiresIn?: string;
    }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  me: () => request<AdminUser>('/auth/me', { softAuth: true }, true),

  getContent: () => request<import('./cms-types').CmsContent>('/content'),

  admin: {
    dashboard: () =>
      request<{
        counts: Record<string, number>;
        recentActivities: Array<{
          id: string;
          type: string;
          title: string;
          description: string;
          status: string;
          date: string;
        }>;
      }>('/admin/dashboard', { softAuth: true }, true),
    getSite: () => request<import('./cms-types').SiteSettings>('/admin/site', {}, true),
    updateSite: (data: import('./cms-types').SiteSettings) =>
      request('/admin/site', { method: 'PUT', body: JSON.stringify(data) }, true),
    getSection: (id: string) =>
      request<Record<string, unknown>>(`/admin/sections/${id}`, {}, true),
    updateSection: (id: string, data: Record<string, unknown>) =>
      request(`/admin/sections/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
    list: <T>(resource: string) => request<T[]>(`/admin/${resource}`, {}, true),
    create: <T>(resource: string, data: unknown) =>
      request<T>(`/admin/${resource}`, { method: 'POST', body: JSON.stringify(data) }, true),
    update: <T>(resource: string, id: string, data: unknown) =>
      request<T>(`/admin/${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(data) }, true),
    remove: (resource: string, id: string) =>
      request(`/admin/${resource}/${id}`, { method: 'DELETE' }, true),
    bookings: {
      list: (status?: string) =>
        request<import('./cms-types').Booking[]>(
          `/admin/bookings${status ? `?status=${status}` : ''}`,
          {},
          true,
        ),
      updateStatus: (id: string, status: string) =>
        request(`/admin/bookings/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        }, true),
      remove: (id: string) =>
        request(`/admin/bookings/${id}`, { method: 'DELETE' }, true),
    },
  },

  createBooking: (data: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children?: number;
    roomType?: string;
    roomCount?: number;
    guestName: string;
    email?: string;
    phone: string;
    specialRequests?: string;
    source?: string;
  }) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),

  getMyBookings: (phone: string) =>
    request<
      Array<{
        id: string;
        guestName: string;
        checkIn: string;
        checkOut: string;
        roomType: string | null;
        adults: number;
        children: number;
        status: string;
        createdAt: string;
      }>
    >(`/bookings/my?phone=${encodeURIComponent(phone)}`),
};
