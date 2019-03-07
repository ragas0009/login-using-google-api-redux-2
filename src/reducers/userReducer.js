const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PUT_USERDATA':
            return state.userData = action.userData;
        //return state.concat([action.data]);
        default:
            return state;
    }
}
export default userReducer;