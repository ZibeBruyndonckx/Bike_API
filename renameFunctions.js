const sortObjectByKey = (unordered) => {
  const ordered = Object.keys(unordered)
    .sort()
    .reverse()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
  return ordered;
};

const sortObjectByValue = (mediumObject) => {
  mediumObject = sortObjectByKey(mediumObject);
  let sortable = [];
  for (let medium in mediumObject) {
    sortable.push([medium, mediumObject[medium]]);
  }
  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });
  sortable = sortable.reverse();
  const responseObject = {};
  for (const thing of sortable) {
    responseObject[thing[0]] = thing[1];
  }

  return responseObject;
};

const sortObjectByAge = (mediumObject) => {
  const sortedAges = Object.keys(mediumObject).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const sortedObject = {};
  sortedAges.forEach((age) => {
    sortedObject[age] = mediumObject[age];
  });

  return sortedObject;
};

module.exports = {
  sortObjectByValue,
  sortObjectByAge,
};
