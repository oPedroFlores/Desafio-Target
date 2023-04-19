botoes = document.querySelectorAll('.botao');
//Deixando erro invisivel e infos também
const erro = document.getElementById('erro');
erro.classList.add('invisible');
const infos = document.getElementsByClassName('infos')[0];
infos.classList.add('invisible');

botoes.forEach((botao) => {
  botao.addEventListener('click', () => {
    const valor = botao.innerText;
    verificarJson(valor);
  });
});

function verificarJson(mesProcurado) {
  // Lendo os dados do faturamento diário de um arquivo JSON
  fetch('faturamento.json')
    .then((response) => response.json())
    .then((data) => {
      const json = data;

      const indexDoMesProcurado = json.meses.findIndex(
        (mes) => mes.mes === mesProcurado,
      );
      if (indexDoMesProcurado == -1) {
        erro.innerText = 'Não existe esse mês na base de dados.';
        erro.classList.remove('invisible');
        infos.classList.add('invisible');
        return;
      } else {
        erro.classList.remove('invisible');
        infos.classList.remove('invisible');
        erro.innerText = mesProcurado;
      }

      // Percorrendo o vetor de faturamento diário
      const faturamentoMensal =
        json.meses[indexDoMesProcurado].faturamento_diario;

      // Inicializando as variáveis com o primeiro valor do vetor
      let totalFaturamento = 0;
      let diasComFaturamentoAcimaDaMedia = 0;
      let menorFaturamento = faturamentoMensal[0];
      let maiorFaturamento = 0;

      for (let i = 0; i < faturamentoMensal.length; i++) {
        const faturamentoDiario = faturamentoMensal[i];
        // Verificando se o faturamento diário é o menor ou o maior já encontrado

        if (faturamentoDiario < menorFaturamento) {
          menorFaturamento = faturamentoDiario;
        }
        if (faturamentoDiario > maiorFaturamento) {
          maiorFaturamento = faturamentoDiario;
        }

        // Somando o faturamento diário ao total mensal, ignorando dias sem faturamento
        if (faturamentoDiario > 0) {
          totalFaturamento += faturamentoDiario;
        }
      }

      // Calculando a média mensal de faturamento diário
      const mediaMensalFaturamento = (
        totalFaturamento / faturamentoMensal.length
      ).toFixed(2);

      // Calculando o número de dias no mês em que o valor de faturamento diário foi superior à média mensal
      diasComFaturamentoAcimaDaMedia = faturamentoMensal.filter(
        (faturamentoDiario) => faturamentoDiario > mediaMensalFaturamento,
      ).length;
      //Definindo os paragrafos
      const pTotalDias = document.getElementById('totalDias');
      pTotalDias.innerText =
        'Total de dias no mês:  ' + faturamentoMensal.length;

      const PMenorFaturamento = document.getElementById('menorFaturamento');
      PMenorFaturamento.innerText =
        'Menor faturamento:  R$ ' + menorFaturamento;

      const pMaiorFaturamento = document.getElementById('maiorFaturamento');
      pMaiorFaturamento.innerText =
        'Maior faturamento:  R$ ' + maiorFaturamento;

      const pMediaMes = document.getElementById('mediaMes');
      pMediaMes.innerText = 'Média do mês:  R$ ' + mediaMensalFaturamento;

      const pDiasAcima = document.getElementById('diasAcima');
      pDiasAcima.innerText =
        'Número de dias acima da média mensal:  ' +
        diasComFaturamentoAcimaDaMedia;

      // Exibindo os resultados
      // console.log(
      //   `Número de dias com faturamento acima da média: ${diasComFaturamentoAcimaDaMedia}`,
      // );
    });
}
