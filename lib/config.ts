export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://arixconnect.github.io/Beautybymica').replace(/\/$/, '');
export const site = {
  name: 'Beauty by Mica',
  location: 'Marie Pampoen, Curaçao',
  preview: true,
  bookingUrl: null as string | null,
  whatsappUrl: null as string | null,
  instagramUrl: null as string | null,
  currencies: ['EUR', 'USD', 'XCG'],
};
export const asset = (path: string) => `${basePath}${path}`;
