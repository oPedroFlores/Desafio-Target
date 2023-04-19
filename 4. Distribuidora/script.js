const btnCalcular = document.getElementById('calc');
btnCalcular.addEventListener('click', calcularValores);

function calcularValores() {
  const spans = document.querySelectorAll('span');
  const valores = [];

  for (let i = 0; i < spans.length; i++) {
    valores.push(parseFloat(spans[i].textContent.replace(',', '.')));
  }

  const total = valores.reduce((acc, curr) => acc + curr, 0);

  const porcentagens = valores.map((valor) => {
    const porcentagem = (valor / total) * 100;
    return `[${porcentagem.toFixed(2)}%]`;
  });

  const resultados = document.querySelectorAll('.resultado');

  for (let i = 0; i < porcentagens.length; i++) {
    resultados[i].textContent = porcentagens[i];
  }
}
