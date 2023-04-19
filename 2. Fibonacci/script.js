const btn = document.getElementById('botao');
const resultado = document.getElementById('resultado');
const sequencia = document.getElementById('sequencia');
let fibo1 = 0;
let fibo2 = 1;
function calcularSequenciaFibonacci(numero) {
  let temp;
  let sequenciaFibo = [];
  while (fibo1 < numero) {
    sequenciaFibo = [...sequenciaFibo, fibo1];
    temp = fibo2;
    fibo2 += fibo1;
    fibo1 = temp;
  }
  sequenciaFibo = [...sequenciaFibo, fibo1];
  return sequenciaFibo;
}

function pertenceSequenciaFibonacci(numero, sequenciaFibo) {
  return sequenciaFibo.includes(numero);
}

btn.addEventListener('click', () => {
  let numero = document.getElementById('fiboTexto').value;
  let sequenciaFibo = calcularSequenciaFibonacci(numero);

  resultado.innerText =
    fibo1 == numero
      ? 'Pertence a sequência fibonaci'
      : 'Não pertence a sequência fibonaci';

  sequencia.innerText = `${sequenciaFibo.join(', ')}...`;

  console.log(numero);
});
