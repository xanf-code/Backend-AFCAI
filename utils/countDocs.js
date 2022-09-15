async function getCount(onlyVerified, Team) {
  if (onlyVerified) {
    const count = await Team.collection.countDocuments({
      isVerified: "true",
    });
    return count;
  } else {
    const count = await Team.collection.countDocuments();
    return count;
  }
}

module.exports = getCount;
