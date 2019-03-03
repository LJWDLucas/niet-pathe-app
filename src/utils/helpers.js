export const flatten = data => {
  const flattenedData = data.reduce((accumulator, current) => {
    accumulator.push(...current);
    return accumulator;
  }, []);
  return flattenedData.some(flattenedArray => flattenedArray instanceof Array) ? flatten(flattenedData) : flattenedData;
};
