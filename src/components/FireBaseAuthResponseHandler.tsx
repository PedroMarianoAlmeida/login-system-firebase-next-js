import { useEffect } from 'react';

const FireBaseAuthResponseHandler = ({
  loading,
  error,
  values,
  initialValues,
  setSubmitting,
  resetForm,
  setOpen,
}) => {
  const clearModal = () => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      setSubmitting(false);
      resetForm();
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!error) {
        clearModal();
      }
      setSubmitting(false);
    }
  }, [loading]);

  return <></>;
};

export default FireBaseAuthResponseHandler;
