export function createFilterConstant(queryParams: Record<string, unknown>) {
  // Create a filter based on query parameters
  const filter = {};

  if (queryParams.minPrice && queryParams.maxPrice) {
    filter.price = {
      $gte: parseFloat(queryParams.minPrice),
      $lte: parseFloat(queryParams.maxPrice),
    };
  }

  if (queryParams.tags) {
    filter['tags.name'] = queryParams.tags;
  }

  if (queryParams.startDate && queryParams.endDate) {
    filter.startDate = {
      $gte: new Date(queryParams.startDate),
      $lte: new Date(queryParams.endDate),
    };
  }

  // Add more filters as needed

  return filter;
}
