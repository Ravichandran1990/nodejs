const users = [];
const addUser = ({socket_id, name, user_id, room_id}) => {
    const exist = users.find((user) => user.room_id === room_id && user.user_id === user_id);
    console.log("Exist "+exist);
    if(exist) {
        return {error: "User already exist in this room"}
    }
    const user = {
        name,
        socket_id,
        user_id,
        room_id
    };
    users.push(user);
    console.log(users);
    return {user}
}

const removeUser = (socketId) => {
    const index = users.findIndex((user) => user.socket_id === socketId);
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
    
}

const getUser = (roomId,userId) => {          
    const getUserData = users.find((user) => user.room_id === roomId && user.user_id === userId);
    console.log("getUserData "+ getUserData);   
    return getUserData;
}

module.exports = {addUser,getUser,removeUser};