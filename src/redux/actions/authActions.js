export const authActions = (data) => {
  console.log("in actions", data);
  return {
    type: data.type,
    payload: {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    },
  };
};
