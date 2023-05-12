const sortObjectByKey = (unordered, reverse = false) => {
  if (reverse) {
    const ordered = Object.keys(unordered)
      .sort()
      .reverse()
      .reduce((obj, key) => {
        obj[key] = unordered[key];
        return obj;
      }, {});
    return ordered;
  } else {
    const ordered = Object.keys(unordered)
      .sort()
      .reduce((obj, key) => {
        obj[key] = unordered[key];
        return obj;
      }, {});
    return ordered;
  }
};

const sortObjectByValue = (maxSpeed) => {
  maxSpeed = sortObjectByKey(maxSpeed, true);

  let sortable = [];
  for (var vehicle in maxSpeed) {
    sortable.push([vehicle, maxSpeed[vehicle]]);
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

module.exports = {
  sortObjectByKey,
  sortObjectByValue,
};
