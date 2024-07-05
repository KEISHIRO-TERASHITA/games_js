const board = document.querySelector(".board");
const turn_shower = document.querySelector(".turnShower");
let turn = "white";
let opponent = "black";
const colors = {
  white: "白",
  black: "黒",
};
let row_now = "";
let column_now = "";
const direction = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

// セル検索
function cell(row, column) {
  return document.getElementById(`cell_${row}_${column}`);
}
// クラス判定
function checkClass(target, className) {
  return target.classList.contains(className);
}

// テーブル内に行を作成
function makeRow() {
  const row = document.createElement("tr");
  board.appendChild(row);
}

// マスを一つ行に挿入
function createCell(row, column, target) {
  const cell = document.createElement("td");
  cell.className = "cell";
  cell.id = `cell_${row}_${column}`;
  cell.setAttribute("row", row);
  cell.setAttribute("column", column);
  target.appendChild(cell);
}

// ひっくり返せるやつ取得
function getCells(row, column, r, c) {
  let cells = [];
  while (0 <= row - r && row - r <= 7 && 0 <= column - c && column - c <= 7) {
    const checked_cell = cell(row - r, column - c);
    if (checkClass(checked_cell, `cell_${opponent}`)) {
      cells.push(checked_cell);
      row -= r;
      column -= c;
      continue;
    } else if (checkClass(checked_cell, `cell_${turn}`)) {
      return cells;
    } else {
      cells = [];
      return cells;
    }
  }
  cells = [];
  return cells;
}

// おけるマスがあるか探す
function searchPossibleArea() {
  let result = false;
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      if (checkClass(cell(i, j), "cell_black")) {
        continue;
      }
      if (checkClass(cell(i, j), "cell_white")) {
        continue;
      }
      direction.forEach((array) => {
        const possibleAreas = getCells(i, j, array[0], array[1]);
        if (possibleAreas[0]) {
          result = true;
        }
      });
    }
  }
  return result;
}

// 石を置く処理
function putStone(row, column) {
  const target = cell(row, column);
  target.classList.add(`cell_${turn}`);
}

// 石をひっくり返す処理
function reversStone(target) {
  target.classList.toggle("cell_black");
  target.classList.toggle("cell_white");
}

// 番を切り替える処理
function switchTurn() {
  if (turn === "black") {
    turn = "white";
    opponent = "black";
  } else {
    turn = "black";
    opponent = "white";
  }
  turn_shower.innerHTML = colors[turn];
}

// 置けないところクリックしたら
function impossibleMessage() {
  messageArea.innerHTML = "そこには置けません！";
}

// ゲーム終了処理
function gameEnd() {
  const messageArea = document.getElementById("messageArea");
  const blacks = document.querySelectorAll(".cell_black");
  const whites = document.querySelectorAll(".cell_white");
  const score_black = blacks.length;
  const score_white = whites.length;
  let result = "";
  if (score_black > score_white) {
    result = "黒の勝ち";
  } else if (score_black < score_white) {
    result = "白の勝ち";
  } else {
    result = "引き分け";
  }
  const message = `黒のスコアは${score_black}点、白のスコアは${score_white}点<br>勝負は${result}！`;
  messageArea.innerHTML = message;
  board.classList.add("no_event")
}

// ゲームボードを生成
for (let i = 0; i < 8; i++) {
  makeRow();
}
const rows = document.querySelectorAll("tr");
rows.forEach((row, index) => {
  for (let i = 0; i < 8; i++) {
    createCell(index, i, row);
  }
});

putStone(3, 3);
putStone(4, 4);
switchTurn();
putStone(3, 4);
putStone(4, 3);

// 各セルにイベント追加
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  const row = cell.getAttribute("row");
  const column = cell.getAttribute("column");

  cell.addEventListener("click", function () {
    let correct = false;
    // クリック時の処理
    if (checkClass(this, "cell_black")) {
      impossibleMessage();
      return;
    }
    if (checkClass(this, "cell_white")) {
      impossibleMessage();
      return;
    }
    let targets = "";
    // ひっくり返せる石を探す & ひっくり返す
    direction.forEach((array) => {
      targets = getCells(row, column, array[0], array[1]);
      if (targets) {
        targets.forEach((target) => {
          reversStone(target);
          correct = true;
        });
      }
    });
    if (correct) {
      putStone(row, column);
      messageArea.innerHTML = "";
      switchTurn();
      if (searchPossibleArea() === false) {
        messageArea.innerHTML = `${colors[turn]}は置けません...`;
        switchTurn();
        if (searchPossibleArea() === false) {
          gameEnd();
        }
      }
    } else {
      impossibleMessage();
    }
  });
});
