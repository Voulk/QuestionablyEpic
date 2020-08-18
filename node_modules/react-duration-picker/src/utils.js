function toTwoDigitString(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

// eslint-disable-next-line import/prefer-default-export
export { toTwoDigitString };
