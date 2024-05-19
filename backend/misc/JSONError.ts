// utility class to throw JSON errors
export default class JSONError extends Error {
  constructor(message) {
    super(message);
    this.message = JSON.stringify({ error: message });
  }
}
