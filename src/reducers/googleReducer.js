const googleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PUT_GDATA':
            return state.googleData = action.googleData;
        //return state.concat([action.data]);
        // case 'DELETE_GOOGLEDATA':
        //     return state.filter((post)=>post.id !== action.id);
        // case 'EDIT_GOOGLEDATA':
        //     return state.map((post)=>post.id === action.id ? {...post,editing:!post.editing}:post);
        // case 'UPDATE_GOOGLEDATA':
        //     return state.map((post)=>{
        //         if(post.id === action.id) {
        //         return {
        //             ...post,
        //             title:action.data.newTitle,
        //             message:action.data.newMessage,
        //             editing: !post.editing
        //         }
        //         } else return post;
        //     })
        default:
            return state;
    }
}
export default googleReducer;