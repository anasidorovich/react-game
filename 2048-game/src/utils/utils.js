const getItemPosition = (size) => {
  const rowPosition = Math.floor(Math.random() * size) + 1;
  const colPosition = Math.floor(Math.random() * size) + 1;
  return [rowPosition, colPosition];
};

export default getItemPosition;