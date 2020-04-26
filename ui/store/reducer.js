export const searchReducer = (state, action) => {

    if (action.type === 'search') {
        return {
            ...state,
            result: [...action.payload]
        }
    }

    return state;
};

export const searchAction = (result) => {
    return {
        type: 'search',
        payload: result
    }
};
