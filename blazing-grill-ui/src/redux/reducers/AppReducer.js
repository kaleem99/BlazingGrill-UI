const defaultState = { navigation: true };
const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CLOSE_NAV":
      return { ...state, navigation: false };
    case "OPEN_NAV":
      return { ...state, navigation: true };
    default:
      return state;
  }
};

export default appReducer;
