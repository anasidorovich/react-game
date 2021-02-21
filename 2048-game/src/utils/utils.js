/*const getItemPosition = (size, data) => {
  const rowPosition = Math.floor(Math.random() * size);
  const colPosition = Math.floor(Math.random() * size);
  if (data[colPosition][rowPosition] === 0 ) {
    //data[colPosition][rowPosition] = 2;
  } else {
    getItemPosition(size, data);
  }
  return { row: rowPosition + 1, col: colPosition + 1};
};*/

const getItemPosition = (size, data) => {
  const rowPosition = Math.floor(Math.random() * size);
  const colPosition = Math.floor(Math.random() * size);
  if (data[colPosition][rowPosition].value === 0 ) {
    data[colPosition][rowPosition].value = 2;
    data[colPosition][rowPosition].row = rowPosition + 1;
    data[colPosition][rowPosition].column = colPosition + 1;
  } else {
    getItemPosition(size, data);
  }
  return { row: rowPosition + 1, col: colPosition + 1};
}
export default getItemPosition;
