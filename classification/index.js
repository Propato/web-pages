var paulo = {
	nome: "Paulo",
	vitoria: 0,
	empate: 0,
	derrota: 0,
	pontos: 0
};

const elementoTabela = document.getElementsByClassName("tabelaJogadores")[0];
const newTeam = document.getElementsByClassName('new-team')[0];

newTeam.addEventListener('change', () => {

});


exibirNaTela();

function exibirNaTela() {
  elementoTabela.innerHTML = `
      <tr>
          <td>${paulo.nome}</td>
          <td>${paulo.vitoria}</td>
          <td>${paulo.empate}</td>
          <td>${paulo.derrota}</td>
          <td>${paulo.pontos}</td>
          <td><button onClick="adicionarVitoria(paulo)">Vitória</button></td>
          <td><button onClick="adicionarEmpate(paulo)">Empate</button></td>
          <td><button onClick="adicionarDerrota(paulo)">Derrota</button></td>
      </tr>
  `;
}

function adicionarVitoria(jogador) {
  jogador.vitoria++;
  jogador.pontos = jogador.pontos + 3;
  exibirNaTela();
}

function adicionarEmpate(jogador) {
  jogador.empate++;
  jogador.pontos++;
  exibirNaTela();
}

function adicionarDerrota(jogador) {
  jogador.derrota++;
  exibirNaTela();
}
