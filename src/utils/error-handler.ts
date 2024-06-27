export const errorHandler = (error: any): string => {
  if (
    error.response &&
    error.response.errors &&
    error.response.errors.length > 0 &&
    error.response.errors[0].message
  ) {
    return error.response.errors[0].message;
  } else if (typeof error === 'object' && error !== null) {
    if ('message' in error) {
      return error.message;
    }
  }
  return 'Something went wrong!';
};
