const isEmpty = (object: object | any[]) =>
  Array.isArray(object) ? !object.length : !Object.keys(object).length;

export default isEmpty;
