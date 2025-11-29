export const applyCityFilter = (query) => {
  const filter = {};

  if (query.city) {
    filter.city = { $regex: new RegExp(`^${query.city.trim()}$`, "i") };
  }

  return filter;
};
