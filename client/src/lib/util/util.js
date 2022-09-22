export const getChangedDate = (date, delimeter = '-', options) => {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  const hour = String(targetDate.getHours()).padStart(2, '0');
  const minute = String(targetDate.getMinutes()).padStart(2, '0');
  const second = String(targetDate.getSeconds()).padStart(2, '0');

  return options?.isNeedTime
    ? `${[year, month, day].join(delimeter)} ${[hour, minute, second].join(
        options?.timeDelimeter ? options?.timeDelimeter : ':'
      )}`
    : [year, month, day].join(delimeter);
};
