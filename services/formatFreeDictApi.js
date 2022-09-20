const filterObjectByKey = (obj) => {
  const filteredByKey = Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => key === "word")
  );


  return filteredByKey;
};

module.exports = filterObjectByKey;
