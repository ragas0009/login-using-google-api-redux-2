const instagramReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PUT_INSTADATA':
            return state.instaData = action.instaData;
        //return state.concat([action.data]);
        default:
            return state;
    }
}
export default instagramReducer;