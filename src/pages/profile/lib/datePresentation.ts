export const datePresentation = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};
