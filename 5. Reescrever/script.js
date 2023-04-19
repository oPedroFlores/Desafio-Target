const btnInverter = document.getElementById('inverter');
const inputString = document.querySelector('input[type="text"]');
const resultado = document.getElementById('resultado');

btnInverter.addEventListener('click', () => {
  const string = inputString.value;
  let stringInvertida = '';

  for (let i = string.length - 1; i >= 0; i--) {
    stringInvertida += string[i];
  }

  if (stringInvertida.length > 250) {
    resultado.textContent = stringInvertida.slice(0, 150) + ' ...';
  } else {
    resultado.textContent = stringInvertida;
  }
});
