import { useState } from "react";

export const useHttpPost = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        alert(resData.message);
      }
      return resData;
    } catch (err) {
      console.log(err.message);
      alert(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendPostRequest };
};
