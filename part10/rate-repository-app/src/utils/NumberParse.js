const NumberParser = (number) => {
  if (isNaN(number) || typeof number !== "number") {
    throw Error(`${number} is NaN or not a valid number to be parsed`);
  }

  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "b";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "m";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};

export default NumberParser;
