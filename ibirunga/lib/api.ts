const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ibirunga_admin_token');
}

export function setToken(token: string) {
  localStorage.setItem('ibirunga_admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('ibirunga_admin_token');
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Request failed');
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ accessToken: string; admin: { email: string; name: string | null } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),

  getContent: () => request<import('./cms-types').CmsContent>('/content'),

  admin: {
    dashboard: () =>
      request<{ counts: Record<string, number> }>('/admin/dashboard', {}, true),
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
    email: string;
    phone: string;
    specialRequests?: string;
    source?: string;
  }) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
};
