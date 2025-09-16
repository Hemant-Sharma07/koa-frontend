export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const formatOrderId = (id) => {
  return `#${id.slice(-8).toUpperCase()}`;
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  if (date.toDate) return date.toDate().toLocaleDateString();
  if (date instanceof Date) return date.toLocaleDateString();
  return new Date(date).toLocaleDateString();
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};