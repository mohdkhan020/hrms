// export const logoutController = (req, res) => {
//   res
//     .cookie("token", "", { expires: new Date(0) })
//     .json({ message: "Logged out" });
// };


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
