export const getChangedDate = (date, delimeter = '-') => {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth()).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  return [year, month, day].join(delimeter);
}