"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, initialAuth = null }) {
  const [auth, setAuth] = useState(initialAuth);
  const [loading, setLoading] = useState(false);

  // Cookieleri yeniden kontrol eden fonksiyon - Login işleminden sonra çağrılabilir
  const refreshAuthFromCookies = async () => {
    try {
      // Server-side endpoint'ten auth durumunu kontrol et
      const response = await fetch("/api/auth/check");
      if (response.ok) {
        const data = await response.json();
        setAuth(data.authenticated ? data.token : null);
      } else {
        setAuth(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuth(null);
    }
  };

  useEffect(() => {
    // İlk yüklemede initialAuth kullanılıyor
    // Eğer initialAuth null ise, auth durumunu kontrol et
    if (initialAuth === null) {
      refreshAuthFromCookies();
    }
  }, [initialAuth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, refreshAuthFromCookies }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
