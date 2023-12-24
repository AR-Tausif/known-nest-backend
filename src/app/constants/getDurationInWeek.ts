const getDurationInWeeks = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationInWeeksResult = Math.ceil(
    (end - start) / (7 * 24 * 60 * 60 * 1000),
  );
  return durationInWeeksResult;
};

export default getDurationInWeeks;
