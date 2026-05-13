"use server";

import { fetchInstance } from "../utils/fetch";
import { cookies } from "next/headers";

export const refresh = async () => {
  try {
    const res = await fetchInstance("/auth/refresh", { method: "POST" });
    return res;
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await fetchInstance("/auth/logout", { method: "POST" });

    const cookieStorage = await cookies();
    cookieStorage.delete("Authentication", { path: "/" });

    return res;
  } catch {
    return null;
  }
};

export const contact = async (data) => {
  try {
    const res = await fetchInstance("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  } catch {
    return null;
  }
};

export const createPublicSubmitPost = async (submitData) => {
  try {
    const response = await fetchInstance("/public-submit", {
      method: "POST",
      body: JSON.stringify(submitData),
    });

    return response;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const upComingEvents = async () => {
  try {
    const res = await fetchInstance("/gelecek-etkinlikler", { method: "GET" });
    return res;
  } catch {
    return null;
  }
};

export const RegisterEvent = async (data) => {
  try {
    const res = await fetchInstance("/gelecek-etkinlikler/kayit", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  } catch {
    return null;
  }
};

export const changePassword = async (data) => {
  try {
    const res = await fetchInstance("/users/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    console.error("Password change error:", error);
    return null;
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    if (!email || !email.trim()) {
      return {
        success: false,
        message: "E-posta adresi gerekli",
      };
    }

    const trimmedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return {
        success: false,
        message: "Geçerli bir e-posta adresi girin",
      };
    }

    const res = await fetchInstance("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email: trimmedEmail }),
    });

    // Backend'den gelen response'u kontrol et
    if (res && res.success === false) {
      return {
        success: false,
        message: res.message || "Abonelik sırasında bir hata oluştu",
      };
    }

    // Başarılı durumda
    return {
      success: true,
      message: "Bültene başarıyla abone oldunuz!",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return {
      success: false,
      message:
        "Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin.",
    };
  }
};
