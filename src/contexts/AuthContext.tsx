/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AuthSession, AuthUser, LoginPayload, Order } from '@/types';

interface AuthContextValue {
  isAuthenticated: boolean;
  sessionToken: string | null;
  user: AuthUser | null;
  orders: Order[];
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
}

const AUTH_STORAGE_KEY = 'solopharma-auth';

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): AuthSession {
  if (typeof window === 'undefined') {
    return {
      sessionToken: null,
      user: null,
      orders: [],
    };
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) {
      return {
        sessionToken: null,
        user: null,
        orders: [],
      };
    }

    const parsedValue = JSON.parse(rawValue) as Partial<AuthSession>;
    return {
      sessionToken: parsedValue.sessionToken ?? null,
      user: parsedValue.user ?? null,
      orders: parsedValue.orders ?? [],
    };
  } catch {
    return {
      sessionToken: null,
      user: null,
      orders: [],
    };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession>(readStoredSession);

  const persistSession = useCallback((nextSession: AuthSession) => {
    setSession(nextSession);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const existingSession = readStoredSession();
    const existingUser = existingSession.user;
    const identifier = payload.email ?? payload.phone ?? 'SoloPharma Customer';
    const defaultName = existingUser?.name
      ?? identifier.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

    const nextUser: AuthUser = {
      name: defaultName,
      email: payload.email ?? existingUser?.email ?? '',
      phone: payload.phone ?? existingUser?.phone ?? '',
      address: existingUser?.address ?? '',
      joinDate: existingUser?.joinDate ?? new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    };

    persistSession({
      sessionToken: crypto.randomUUID(),
      user: nextUser,
      orders: existingSession.orders ?? [],
    });
  }, [persistSession]);

  const logout = useCallback(() => {
    persistSession({
      sessionToken: null,
      user: null,
      orders: [],
    });
  }, [persistSession]);

  const updateProfile = useCallback((updates: Partial<AuthUser>) => {
    if (!session.user) {
      return;
    }

    persistSession({
      ...session,
      user: {
        ...session.user,
        ...updates,
      },
    });
  }, [persistSession, session]);

  const addOrder = useCallback((order: Omit<Order, 'id' | 'date' | 'status'>) => {
    if (!session.user) {
      return;
    }

    const nextOrder: Order = {
      ...order,
      id: `#ORD-${String(session.orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
    };

    persistSession({
      ...session,
      orders: [nextOrder, ...session.orders],
    });
  }, [persistSession, session]);

  const value = useMemo(() => ({
    isAuthenticated: Boolean(session.sessionToken && session.user),
    sessionToken: session.sessionToken,
    user: session.user,
    orders: session.orders,
    login,
    logout,
    updateProfile,
    addOrder,
  }), [addOrder, login, logout, session, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
