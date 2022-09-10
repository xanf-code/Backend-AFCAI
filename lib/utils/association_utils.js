const Association = require("../../models/association");

exports.AddAssociation = async (association) => {
  const newAssociation = new Association({
    associationName: association,
  });

  const AssociationExist = await Association.find({
    associationName: association,
  });

  if (AssociationExist.length > 0) {
    return;
  } else {
    try {
      await newAssociation.save();
    } catch (err) {
      throw new ApolloError(err, "400");
    }
  }
};
