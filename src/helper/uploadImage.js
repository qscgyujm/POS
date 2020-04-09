/* eslint import/prefer-default-export: "off" */

export const uploadImage = (
  e,
  uploadAction,
  uploadResolveAction,
) => {
  const formData = new FormData();
  const file = e.currentTarget.files[0];
  // const fileSize = file && convertToMb(file.size);

  formData.append('image', file);

  // for (const [key, value] of formData.entries()) {
  //   console.log('formdData', key, value);
  // }

  if (file) {
    uploadAction(formData, uploadResolveAction);
  }
};
