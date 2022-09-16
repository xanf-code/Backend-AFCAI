async function getCount(Team) {
  const count = await Team.collection.countDocuments();
  return count;
}

async function verifiedCount(Verified, value, field, cursor) {
  const verified_teams = await Verified.find({
    [field]: {
      $regex: value,
      $options: "i",
    },
  })
    .sort("id")
    .where("id")
    .gt(cursor || -1)
    .countDocuments();
  return verified_teams;
}

module.exports = { getCount, verifiedCount };
