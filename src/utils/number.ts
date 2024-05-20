export const getNumber = (number: string) => {
  if (number.length === 8) {
    return number.replace(/(\d{4})(\d{4})/, '$1-$2')
  } else if (number.length === 9) {
    return number.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')
  } else if (number.length === 10) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  } else if (number.length === 11) {
    return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  } else {
    return number
  }
}
