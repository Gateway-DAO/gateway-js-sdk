export const errorHandler = (error: any): string => {
  if (typeof error === 'object' && error !== null) {
    if (
      Array.isArray(error.errors) &&
      error.errors.length > 0 &&
      'message' in error.errors[0]
    ) {
      return error.errors[0].message;
    } else if ('message' in error) {
      return error.message;
    }
  }

  return 'Something went wrong!';
};
