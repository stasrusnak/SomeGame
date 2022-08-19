export const errorMessage = ({ error, msg }) => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable-next-line */
    console.error({ msg, error });
  }
};

export const handleMutationError = (state, newStatus, error, msg) => {
  errorMessage({ error, msg });
  const mutState = state;
  mutState.status = {
    ...mutState.status,
    ...newStatus,
    error,
    msg,
  };
};

export default {
  handleMutationError,
  errorMessage,
};
