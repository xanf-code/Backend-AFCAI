const State = require("../../models/state");

exports.AddState = async (state) => {
  const newState = new State({
    stateName: state,
  });

  const stateExist = await State.find({
    stateName: state,
  });

  if (stateExist.length > 0) {
    return;
  } else {
    try {
      await newState.save();
    } catch (err) {
      throw new ApolloError(err, "400");
    }
  }
};
