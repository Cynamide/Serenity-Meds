const initialFilterState = {
  groups: [[], [], [], [], [], [], []],
};

export const filterStateReducer = (
  state = initialFilterState,
  action = null
) => {
  switch (action.type) {
    case "SET":
      console.log('reducer payload', action.payload);
      return {
        ...state,
        groups: action.payload,
      };
    default:
      console.log("YOU SHOULD NOT BE HERE");
  }
  return state;
};
