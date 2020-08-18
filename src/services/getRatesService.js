export default ({ base = 'USD' } = {}) =>
  fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
