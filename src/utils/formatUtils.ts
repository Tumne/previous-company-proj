import { joinStrings } from './stringUtils';

export const formatCurrency = (amount, currency) => {
  const formatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

const numberFormatter = new Intl.NumberFormat();
export const formatNumber = number => numberFormatter.format(number);

type User = { firstName: string; lastName: string };
export const formatFullName = (user: User) => {
  if (!user) {
    return '';
  }
  return `${user.firstName} ${user.lastName}`;
};

export const formatInitials = (user: User) =>
  formatFullName(user)
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

export const formatYMMT = retailItem =>
  retailItem ? joinStrings([retailItem.year, retailItem.make, retailItem.model, retailItem.trim], ' ') : '';
