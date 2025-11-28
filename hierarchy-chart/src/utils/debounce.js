function debounce(fun, delay) {
  var timeoutId = false;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fun(...args);
    }, delay);
  };
}

export default debounce;
