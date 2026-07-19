export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const getDiscountedPrice = (price, discountPercentage) => {
  if (!price) return 0
  if (!discountPercentage) return price
  const discount = price * (discountPercentage / 100)
  return price - discount
}
