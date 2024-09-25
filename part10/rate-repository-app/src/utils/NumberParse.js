const NumberParser = (number) => {
  if (isNaN(number) || typeof number !== "number") {
    throw Error(`${number} is NaN or not a valid number to be parsed`);
  }

  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};

export default NumberParser;
