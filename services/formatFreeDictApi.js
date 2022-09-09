const filterObjectByKey = (obj) => {
  const filteredByKey = Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => key === "word")
  );
  console.log("filter by key ", filteredByKey);

  return filteredByKey;
};

module.exports = filterObjectByKey;
