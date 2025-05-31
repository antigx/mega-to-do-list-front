export const getColor = (priority: number): string => {
  switch (priority) {
    case 1:
      return "#33C1FF";
    case 2:
      return "#28A745";
    case 3:
      return "#FF5733";
    default:
      return "#28A745";
  }
};
