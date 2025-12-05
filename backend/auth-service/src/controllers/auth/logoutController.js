export const logoutController = (req, res) => {
  res
    .cookie("token", "", { expires: new Date(0) })
    .json({ message: "Logged out" });
};
