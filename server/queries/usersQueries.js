const AllUsers = "SELECT * FROM users";
const UserById = "SELECT * FROM users WHERE id =$1";
const checkEmailExists = "SELECT * FROM users WHERE email = $1";
const addUser = "INSERT INTO users(username,password,email) VALUES($1,$2,$3)";
const deleteUser ="DELETE FROM users WHERE id = $1";
const updateUserPassword ="UPDATE users SET password = $1 WHERE email = $2";
const updateUserToken ="UPDATE users SET refreshToken = $1 WHERE username = $2";
const checkRefreshTokenExists ="SELECT * FROM users WHERE refreshToken = $1";
const updateUserPhotoUrl ="UPDATE users SET photoUrl = $1 WHERE email = $2";


module.exports = {
    AllUsers,
    UserById,
    checkEmailExists,
    addUser,
    deleteUser,
    updateUserPassword,
    updateUserToken,
    checkRefreshTokenExists,
    updateUserPhotoUrl
}