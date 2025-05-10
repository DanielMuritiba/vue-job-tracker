import store from "@/store";
import Store from "../store";
import router from "@/router";

export const authHeader = () => {
  const { currentUser } = store.state;

  return {
    "Content-type": "application/json",
    authorization: "Bearer " + currentUser?.token,
  };
};

export const handleResponseWithLoginCheck = (promise) => {
  return promise
    .then((data) => {
      return data;
    })
    .catch((error) => {
      const status = error?.response?.status;

      if (status === 403 || status === 401) {
        Store.dispatch("clearUser").then(() => {
          router.push({ name: "login" }).catch((e) => console.log(e));
        });
      }

      return Promise.reject(error);
    });
};
