import isNullOrUndefined from './isNullOrUndefined';

const groupBy = (arr: object[], prop: string) => {
  const group = {};

  arr.forEach((item) => {
    const propValue = item[prop];

    if (isNullOrUndefined(propValue)) return;

    if (!(propValue in group)) {
      group[propValue] = [];
    }

    group[propValue].push(item);
  });

  return group;
};

export default groupBy;
