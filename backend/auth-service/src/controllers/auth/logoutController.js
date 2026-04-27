export const logoutController = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};
