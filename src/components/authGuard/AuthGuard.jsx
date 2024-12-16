"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useFirebase } from "@/hooks/Firebase/useFirebase";
import { PUBLIC_ROUTES } from "@/constant/appConstant";

export default function AuthGuard({ children, fallback }) {
  const router = useRouter();
  const pathname = usePathname();
  const { states } = useFirebase();
  const { user, loader, accessToken } = states;
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!user && !accessToken && !PUBLIC_ROUTES.includes(pathname)) {
      router.push("/login");
    }
    setCheckingAuth(false);
  }, [accessToken, user, pathname]);

  useEffect(() => {
    if (user && accessToken && PUBLIC_ROUTES.includes(pathname)) {
      router.push("/");
    }
    setCheckingAuth(false);
  }, [accessToken, user, pathname]);

  if (checkingAuth) return fallback || "Loading"; // Show fallback while checking

  return children;
}
