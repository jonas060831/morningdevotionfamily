"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import DismissModal from "@/components/modals/dismiss/DismissModal";

export interface User {
  username: string;
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

interface Account {
  _id: string;
  name: string;
  [key: string]: any;
}

interface AuthContextValues {
  user: User | null;
  loading: boolean;   // ✅ new
  setUser: (user: User | null) => void;
  clearUser: () => void;
  currentAccount: Account | null;
  setCurrentAccount: (account: Account | null) => void;
}

const AuthContext = createContext<AuthContextValues>({
  user: null,
  loading: true,
  setUser: () => {},
  clearUser: () => {},
  currentAccount: null,
  setCurrentAccount: () => {},
});

const parseToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload as User;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [currentAccount, _setCurrentAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);   // ✅ loading state
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Hydrate once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (token) setUser(parseToken(token));

    const storedAccount = localStorage.getItem("currentAccount");
    if (storedAccount) {
      try {
        _setCurrentAccount(JSON.parse(storedAccount));
      } catch {}
    }

    setLoading(false); // ✅ hydration complete
  }, []);

  const clearUser = () => {
    setUser(null);
    _setCurrentAccount(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentAccount");
  };

  const setCurrentAccount = (account: Account | null) => {
    _setCurrentAccount(account);
    if (account) {
      localStorage.setItem("currentAccount", JSON.stringify(account));
    } else {
      localStorage.removeItem("currentAccount");
    }
  };

  // ✅ Session expiration check
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = parseToken(token);
      if (!payload) return;

      const currentTime = Math.floor(Date.now() / 1000);
      const isLoginRoute = pathname === "/login" || pathname === "/admin/login";

      if (payload.exp && payload.exp < currentTime && !isLoginRoute) {
        setIsSessionExpired(true);
        setIsModalOpen(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, clearUser, currentAccount, setCurrentAccount }}
    >
      {children}

      {isSessionExpired && (
        <DismissModal
          title="Good Bye!"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            const redirectPath = user?.role === "admin" ? "/admin/login" : "/login";
            clearUser();
            router.push(redirectPath);
          }}
          buttonTitle="Ok"
        >
          <h3>Session Expired</h3>
        </DismissModal>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
