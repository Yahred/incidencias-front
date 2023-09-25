import isNullOrUndefined from './isNullOrUndefined';

const objectToFormData = (obj: object) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, entrie]) => {
    if (isNullOrUndefined(entrie)) return;
    if (typeof entrie === 'object')
      return formData.set(key, JSON.stringify(entrie));
    formData.set(key, entrie);
  });
  return formData;
};

export default objectToFormData;
