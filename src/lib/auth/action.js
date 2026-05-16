"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const Logout = async () => {
  const cookieStorage = await cookies();
  cookieStorage.delete("Authentication", { path: "/" });
  redirect("/auth/login");
};

export const Register = async (values) => {
  try {
    // Build payload, avoid sending empty strings (some backends validate empty string as not-empty error)
    const payload = {
      email: values.email?.trim(),
      password: values.password,
      username: values.username?.trim(),
      firstName: values.firstName?.trim(),
      lastName: values.lastName?.trim(),
    };

    const institution = values.institution?.trim();
    if (institution) {
      payload.institution = institution;
    }

    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (response.ok) {
      return { success: true, data };
    }

    // Normalize different possible error shapes
    const rawMessage = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message || data?.error || "Registration failed";

    return {
      success: false,
      message: rawMessage,
      statusCode: data?.statusCode,
    };
  } catch (error) {
    console.error("Register action error:", error);
    return { success: false, message: error.message || "Unexpected error" };
  }
};

export const Login = async (emailOrUsername, password) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrUsername, password }),
      credentials: "omit",
    });

    const data = await res.json();

    if (res.ok && data.accessToken) {
      const cookieStorage = await cookies();

      cookieStorage.set({
        name: "Authentication",
        value: data.accessToken,
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 36,
      });

      return { success: true };
    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: error.message };
  }
};

export const ForgotPassword = async (email) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "omit",
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Request failed" };
    }
  } catch (error) {
    console.error("Error during forgot password:", error);
    return { success: false, message: error.message || "Unexpected error" };
  }
};

export const VerifyEmail = async (token) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${encodeURIComponent(
        token,
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
      },
    );

    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = {};
    }

    if (res.ok) {
      return { success: true, message: data.message };
    }
    return {
      success: false,
      message: data.message || "Email verification failed",
    };
  } catch (error) {
    console.error("Error during email verification:", error);
    return { success: false, message: error.message || "Unexpected error" };
  }
};

export const ResetPassword = async (token, newPassword) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
      credentials: "omit",
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Reset failed" };
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    return { success: false, message: error.message || "Unexpected error" };
  }
};
