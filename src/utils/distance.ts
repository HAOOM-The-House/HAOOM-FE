export const getDistance = (distance: number) => {
  if (distance >= 1000) {
    const kilometer = distance / 1000
    if (Number.isInteger(kilometer)) return String(kilometer) + 'KM'
    else return String(kilometer.toFixed(1)) + 'KM'
  } else {
    return String(distance) + 'M'
  }
}
