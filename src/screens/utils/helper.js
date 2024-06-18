export const sliceText = (text) => {
  if (text.length > 10) {
    return text.slice(10) + "...";
  }
  return text;
};
const fileList ="";

export const props = {
  accept: ".png,.svg,.jpg",
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList?.splice(index, 1);
  },
};

export const beforeUpload = () => {
  return false;
};
