export const sliceText = (text) => {
  if (text.length > 10) {
    return text.slice(10) + "...";
  }
  return text;
};
