export const resourceFilterActions = (data) => {
  console.log('in actions', data)
  return {
    type: "SET",
    payload: data,
  };
};
