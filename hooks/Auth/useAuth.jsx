import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

let logoutTimer;
export const useAuth = () => {
  const [token, settoken] = useState();
  const [tokenExpirationTime, settokenExpirationTime] = useState();
  const router = useRouter();

  const login = useCallback((tokene, expirationDate) => {
    settoken(tokene);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    settokenExpirationTime(tokenExpirationDate);

    localStorage.setItem(
      "user",
      JSON.stringify({
        token: tokene,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(async () => {
    settoken(null);
    settokenExpirationTime(null);
    localStorage.removeItem("user");
    localStorage.removeItem("User");
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

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("userData"));
  //   if (
  //     storedData &&
  //     storedData.token &&
  //     new Date(storedData.expiration) > new Date()
  //   ) {
  //     login(storedData.token, new Date(storedData.expiration));
  //   }
  // }, [login]);

  return { token, login, logout };
};
