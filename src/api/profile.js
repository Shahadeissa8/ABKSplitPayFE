import instance from "."; // Import axios instance

const getUserProfile = async (id) => {
  try {
    const response = await instance.get(`/ApplicationUser/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error(
      error.response?.data?.title || "Failed to fetch user profile."
    );
  }
};

export { getUserProfile };