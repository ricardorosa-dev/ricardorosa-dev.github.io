window.onload = function () {
  generateColors();
  selectedColor();

  createBoard(5);
  useColors();

  colorPicker();

  clear();
  setBoardButton();

  console.log(document.getElementsByClassName("pixel")[0].style.height);
};

// CRIAR O QUADRO DINAMICAMENTE
function createBoard(num) {
  for (coluna = 1; coluna <= num; coluna++) {
    let wrapper = document.getElementById("pixel-board");
    let tr = document.createElement("tr");
    wrapper.appendChild(tr);
    for (let linha = 1; linha <= num; linha++) {
      let td = document.createElement("td");
      tr.appendChild(td);
      td.classList.add("pixel");
    }
  }
}

let colors = [
  "black",
  "rgb(214, 40, 40)",
  "rgb(252, 191, 73)",
  "rgb(234, 226, 183)",
];

// CRIA AS CORES ALEATÓRIAS DA PALETA
function generateColors() {
  // -gera cores aleatórias e joga elas na array 'colors'
  for (let i = 1; i < 4; i += 1) {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;

    let rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    colors[i] = rgb;
  }
  // pega as cores da array 'colors' e joga nos quatro elementos
  let box1 = document.getElementById("black");
  let box2 = document.getElementById("red");
  let box3 = document.getElementById("yellow");
  let box4 = document.getElementById("gray");

  box1.style.backgroundColor = colors[0];
  box2.style.backgroundColor = colors[1];
  box3.style.backgroundColor = colors[2];
  box4.style.backgroundColor = colors[3];
}

// ESCOLHER COR DA PALETA AO CLICAR COM O BOTÃO DIREITO
function colorPicker() {
  let selected2;
  let colorWell = document.getElementById("colorWell");
  let colorElements = document.getElementsByClassName("color");

  for (let i = 0; i < colorElements.length; i += 1) {
    colorElements[i].addEventListener("contextmenu", function () {
      selected2 = colorElements[i];

      colorWell.style.left = event.clientX;
      colorWell.style.top = event.clientY;
      colorWell.click();
      event.preventDefault();
    });
  }

  colorWell.addEventListener("change", function () {
    selected2.style.backgroundColor = colorWell.value;
  });
}

// Botão LIMPAR, pinta o background de todos os pixels de branco
function clear() {
  let limparButton = document.getElementById("clear-board");

  limparButton.addEventListener("click", function () {
    // Todos os pixelBoxes viram branco de novo.
    let pixelBoxes = document.getElementsByClassName("pixel");
    for (let i = 0; i < pixelBoxes.length; i++) {
      pixelBoxes[i].style.backgroundColor = "white";
    }
  });
}

let chosenColor = colors[0]; // preto já pré-selecionado

// PEGA A COR CLICADA E JOGA NA VARIAVEL chosenColor
function selectedColor() {
  let colorElements = document.getElementsByClassName("color");
  colorElements[0].classList.add("selected");

  //selectedDiv porque é o que tá com 'selected' atualmente
  let selectedDiv = colorElements[0];

  for (let i = 0; i < colorElements.length; i++) {
    // pegar cada elemento com a id color e adicionar um eventListener nele
    colorElements[i].addEventListener("click", function () {
      chosenColor = colorElements[i].style.backgroundColor;
      selectedDiv.classList.remove("selected");
      selectedDiv = colorElements[i];
      colorElements[i].classList.add("selected");
    });
  }
}

// PINTAR QUALQUER PIXEL COM A COR CLICADA
function useColors() {
  let pixelBoxes = document.getElementsByClassName("pixel");

  // Adiciona funcionalidade de pintar clicando
  for (let i = 0; i < pixelBoxes.length; i++) {
    // clicando com o botão do mouse
    pixelBoxes[i].addEventListener("mousedown", function () {
      pixelBoxes[i].style.backgroundColor = chosenColor;
    });
    // extra pra apagar com o botão direito do mouse!!
    pixelBoxes[i].addEventListener("contextmenu", function () {
      pixelBoxes[i].style.backgroundColor = "white";
      event.preventDefault();
    });
    //extra pra pintar ou apagar segurando o mouse!!
    pixelBoxes[i].addEventListener("mouseover", function () {
      if (event.buttons === 1) {
        pixelBoxes[i].style.backgroundColor = chosenColor;
      } else if (event.buttons === 2) {
        pixelBoxes[i].style.backgroundColor = "white";
        event.preventDefault();
      }
    });
  }
}

// TRÊS FUNÇÕES ABAIXO SÂO PARA REFAZER O QUADRO

let numberForBoard = "";

//MUDAR O TAMANHO DO QUADRO
function setBoardButton() {
  let numInput = document.getElementById("board-size");
  let numButton = document.getElementById("generate-board");

  numInput.addEventListener("input", function () {
    numberForBoard = numInput.value;
  });

  // -tanto o keydown quanto o Button refazem o quadro
  numInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      rebuildBoard();
    }
  });
  numButton.addEventListener("click", function () {
    rebuildBoard();
  });
}

// APAGA O QUADRO PRA CRIAR UM NOVO DE OUTRO TAMANHO
function eraseBoard() {
  let wrapper = document.getElementById("pixel-board");
  wrapper.innerHTML = "";
}

function rebuildBoard() {
  // Não deixar colocar valor null ou maior que 50
  if (!numberForBoard) {
    window.alert("Board inválido!");
    return;
  } else if (numberForBoard > 50) {
    window.alert("O tamanho máximo é 50 x 50");
    numberForBoard = 50;
  } else if (numberForBoard < 5) {
    window.alert("O tamanho mínimo é 5 x 5");
    numberForBoard = 5;
  }

  eraseBoard();
  createBoard(numberForBoard);
  useColors();
}
