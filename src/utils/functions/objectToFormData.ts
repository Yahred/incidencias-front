import isNullOrUndefined from './isNullOrUndefined';

const objectToFormData = (obj: object) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, entrie]) => {
    if (isNullOrUndefined(entrie)) return;
    if (entrie instanceof File) return formData.append(key, entrie);
    if (typeof entrie === 'object')
      return formData.append(key, JSON.stringify(entrie));
    formData.append(key, entrie);
  });
  return formData;
};

export default objectToFormData;
