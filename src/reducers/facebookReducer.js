const facebookReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PUT_FBDATA':
            return state.fbData = action.fbData
        //return state.concat([action.data]);
        default:
            return state;
    }
}
export default facebookReducer;