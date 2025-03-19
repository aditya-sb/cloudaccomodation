export const COUNTRY_CURRENCY_MAP = {
  'USA': { code: 'USD', symbol: '$' },
  'India': { code: 'INR', symbol: '₹' },
  'Canada': { code: 'CAD', symbol: 'C$' },
  'UK': { code: 'GBP', symbol: '£' },
  'EU': { code: 'EUR', symbol: '€' },
  'Australia': { code: 'AUD', symbol: 'A$' }
} as const;

export const getCurrencySymbol = (country: string) => {
  return COUNTRY_CURRENCY_MAP[country as keyof typeof COUNTRY_CURRENCY_MAP]?.symbol || '$';
};
