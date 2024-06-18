export const getErrorMessage = (error) => {
  return error.response.data?.error || error.response?.data || 'Unknown error';
}