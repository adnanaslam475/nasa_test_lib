export const queryParamsToString = (params = {}, options) => {
  const { hideEmpty, suffixToken, separatorToken } = {
    hideEmpty: true,
    suffixToken: "&",
    separatorToken: "&",
    ...options,
  };
  const keys = Object.keys(params);
  let transformedParams = keys.reduce((acc, current) => {
    if (params[current] || !hideEmpty) {
      // eslint-disable-next-line no-param-reassign
      acc += `${current}=${params[current]}${separatorToken}`;
    }
    return acc;
  }, "");
  transformedParams = suffixToken + transformedParams;
  return transformedParams.slice(0, -1);
};
