import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

const setToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Token is undefined or null");
    }
    await setItemAsync("token", token);
  } catch (error) {
    throw error;
  }
};

const getToken = async () => {
  try {
    const token = await getItemAsync("token");
    return token;
  } catch (error) {
    return null;
  }
};

const deleteToken = async () => {
  try {
    await deleteItemAsync("token");
  } catch (error) {
    throw error;
  }
};

export { setToken, getToken, deleteToken };