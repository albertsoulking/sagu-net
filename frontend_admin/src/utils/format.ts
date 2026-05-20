import dayjs from 'dayjs'

export function formatCurrency(amount: number, currency = 'MMK') {
  return `${currency} ${amount.toLocaleString('en-US')}`
}

export function formatDate(date: string | Date, format = 'DD MMM YYYY') {
  return dayjs(date).format(format)
}

export function formatRelative(date: string) {
  return dayjs(date).fromNow()
}
