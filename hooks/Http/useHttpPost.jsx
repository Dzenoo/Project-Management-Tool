import { useState } from "react";

export const useHttpPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendPostRequest = async (
    url = "",
    typeOfMethod = "",
    bodyData = {}
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: typeOfMethod,
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      });

      const resData = await response.json();

      if (response.ok) {
        setIsLoading(false);
      } else {
        setError(resData.message);
      }
      return resData;
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendPostRequest };
};
