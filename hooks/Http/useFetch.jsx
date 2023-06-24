import useSwr from "swr";

export const useFetch = (path) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSwr(path, fetcher, {
    refreshInterval: true,
    revalidateOnMount: true,
  });

  return { data, error };
};
