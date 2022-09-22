export const getChangedDate = (date, delimeter = '-', options) => {
  if (!date) return '-';
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

export const getChangedMaskingAccount = (account) => {
  const accountRegex = /(?<=.{2})(?=.{3})./gi;
  return account ? account.replace(accountRegex, '*') : '-';
};

export const getChangedMaskingPhoneNumber = (phoneNumber) => {
  const phoneRegex = /(?<=.{4})(?=.{6})./gi;
  return phoneNumber ? phoneNumber.replace(phoneRegex, '*') : '-';
};
