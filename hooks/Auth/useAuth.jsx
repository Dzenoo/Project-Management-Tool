import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [token, settoken] = useState(false);
  const [tokenExpirationTime, settokenExpirationTime] = useState();
  const router = useRouter();

  const login = useCallback((token, expirationDate) => {
    settoken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    settokenExpirationTime(tokenExpirationDate);

    localStorage.setItem(
      "user",
      JSON.stringify({
        token: token,
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(async () => {
    settoken(null);
    settokenExpirationTime(null);
    localStorage.removeItem("user");
    router.replace("/login");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationTime]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout };
};
