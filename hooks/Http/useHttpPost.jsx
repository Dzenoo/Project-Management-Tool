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
      });

      if (response.ok) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendPostRequest };
};
