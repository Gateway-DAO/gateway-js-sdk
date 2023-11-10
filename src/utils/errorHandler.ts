export const errorHandler = (error: any): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return error.message;
  } else {
    return 'Something went wrong!';
  }
};
