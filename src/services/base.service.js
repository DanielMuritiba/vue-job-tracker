import store from "@/store";

export const authHeader = () => {
  const { currentUser } = store.state;

  return {
    "Content-type": "application/json",
    authorization: "Bearer " + currentUser?.token,
  };
};

export const handleResponseWithLoginCheck = (promise) => {
  return promise
    .then((data) => data)
    .catch((error) => {
      const status = error?.response?.status;
      console.warn("Error:", status, error?.response?.data?.message);

      return Promise.reject(error);
    });
};
