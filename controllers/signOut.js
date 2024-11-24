exports.signOut = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
    };

    return res
    .status(200)
    .clearCookie("token", options)
    .json("User has been logged out!");
    return;
}