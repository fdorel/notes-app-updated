/**
 * useLocalStorage hook - Provides persistent state using localStorage
 * @param {string} key - The storage key
 * @param {*} initialValue - Initial value if no data exists
 * @returns {[*, Function, Function]} State tuple with set and reset functions
 */

export function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or use initial value
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Update state and persist to localStorage
  const setLocalStorage = (newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  // Remove item from localStorage and reset state
  const removeLocalStorage = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };

  return [value, setLocalStorage, removeLocalStorage];
}
