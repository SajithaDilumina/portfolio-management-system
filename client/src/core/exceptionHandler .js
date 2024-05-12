export const exceptionHandler = async (error) => {
    return new Promise((resolve) => {
      let errorMsg = 'Ops! Something went wrong.';
      if (error) {
        switch (error.status) {
          case 0:
            errorMsg = error.data.message || 'Network Failure Detected';
            break;
          case 404:
            errorMsg = error.data.message || 'URL Not Found';
            break;
          case 500:
            errorMsg = error.data.message || 'Internal Server Error';
            break;
          case 504:
            errorMsg = error.data.message || 'Gateway Timeout';
            break;
          default:
            errorMsg = error.data.message || 'Ops! Something went wrong';
        }
      }
      resolve(errorMsg);
    });
  };
  