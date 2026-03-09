export const clearPhone = (phone: string | null): string | null => {
  if (!phone) {
    return null;
  }
  return phone.replace(/[^\d+]/g, '');
};
