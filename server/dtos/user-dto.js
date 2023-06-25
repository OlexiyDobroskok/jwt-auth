exports.getUserDto = (model) => {
  const { _id, email, isActivated } = model;
  return {
    id: _id,
    email,
    isActivated,
  };
};
