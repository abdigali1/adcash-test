export const exceptionHandler = (error) => {
  const errorMessage = error.response?.data || error;
  console.error(errorMessage);
};
