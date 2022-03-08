const authState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
};

export const authStateReducer = (state = authState, action = null) => {
  if (action) {
    switch (action.type) {
      case "SET":
        return {
          ...state,
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
        };
      case "UNSET":
        return {
          ...state,
          access_token: null,
          refresh_token: null,
        };
      default:
        console.log("YOU SHOULD NOT BE HERE IN AUTH");
    }
  }
  return state;
};
