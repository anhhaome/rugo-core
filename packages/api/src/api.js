/**
 * Create api endpoint.
 *
 * @param {Composer} composer Composer to processing arguments and result.
 * @returns {Function} target function
 */
const createApi = composer => (...validateArgs) => async (...targetArgs) => {
  const args = await composer.argsParser(validateArgs, targetArgs);

  const result = {};
  try {
    const res = await args[0][args[1]](...args.slice(2));

    result.status = res === null ? 404 : 200;
    result.data = res === null ? 'Not found' : res;
  } catch (err) {
    result.status = 500;
    result.data = err.message;
  }

  return await composer.returnParser(result, targetArgs);
};
export default createApi;
