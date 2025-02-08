// JWT token generator
export const removeToken = (res) => {
    // Responce
    return res.status(200).clearCookie("token");
  };
  