import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const setToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Token is undefined or null");
    }
    await setItemAsync("token", token);
  } catch (error) {
    console.error("Error saving token:", error.message);
    throw error;
  }
};

const getToken = async () => {
  try {
    const token = await getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error.message);
    return null;
  }
};

const deleteToken = async () => {
  try {
    await deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error.message);
    throw error;
  }
};

export { setToken, deleteToken, getToken };