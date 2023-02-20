const ruleArea = document.getElementById("rule");

const rules = {
  red: "赤い文字",
  blue: "青い文字",
  green: "緑の文字",
  black: "黒い文字",
  赤: "赤という文字",
  青: "青という文字",
  緑: "緑という文字",
  黒: "黒という文字",
};

let isCorrect = "";
let randomClasses;

const cells = document.querySelectorAll(".cell");
const startButton = document.getElementById("start");
const messageArea = document.getElementById("messageArea");
let message = "";
const letters = ["赤", "青", "緑", "黒"];
const colors = ["red", "blue", "green", "black"];
const size = ["large", "mid", "small"];
let shown = [];
let rule = "";
let score = 0;
let chain = 0;
let chainRecord = 0;

// 配列並び替え
function shuffle(array) {
  for (i = array.length - 1; i > 0; i--) {
    r = Math.floor(Math.random() * (i + 1));
    tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

// 配列からランダム取得
function choseFrom(array) {
  return shuffle(array)[0];
}

// どっちが大きい？
function max(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

// ランダムにクラスつけるよ
function addRandomClass(targets, classes) {
  const randomClasses = shuffle(classes);
  targets.forEach((target, index) => {
    target.classList.add(randomClasses[index]);
    shown.push(randomClasses[index]);
  });
}

// 文字表示
function showLetters() {
  // 表示場所選ぶ
  const targets = [];
  const random = shuffle([0, 1, 2, 3, 4, 5]);
  for (i = 0; i < 3; i++) {
    target = document.getElementById(`cell_${random[i]}`);
    targets.push(target);
  }

  // 文字きめる
  const shuffledLetters = shuffle(letters);
  targets.forEach((target, index) => {
    target.innerHTML = shuffledLetters[index];
    target.classList.add(shuffledLetters[index]);
    shown.push(shuffledLetters[index]);
  });
  // クラスつける
  randomClasses = shuffle(colors);
  targets.forEach((target, index) => {
    target.classList.add(randomClasses[index]);
    shown.push(randomClasses[index]);
  });
  randomClasses = shuffle(size);
  targets.forEach((target, index) => {
    target.classList.add(randomClasses[index]);
  });

}

// 指示だし
function showRule() {
  const index = choseFrom(shown);
  rule = rules[index];
  ruleArea.innerHTML = rule;
  isCorrect = index;
}

// リセット
function reset() {
  cells.forEach((cell) => {
    cell.className = "cell";
    cell.innerHTML = "";
    ruleArea.innerHTML = "";
    rule = "";
    shown = [];
  });
}

// 正誤判定
function judge(target, isCorrect) {
  return target.classList.contains(isCorrect);
}

// クリック時処理
cells.forEach((cell) => {
  cell.addEventListener("click", function () {
    if (judge(cell, isCorrect)) {
      // 正解の時
      score++;
      chain++;
      if (chain === 1) {
        message = "正解！";
      } else {
        message = `${chain}問連続正解！`;
      }
    } else {
      // 不正解の時
      chainRecord = max(chain, chainRecord);
      chain = 0;
      message = "不正解...";
    }
    messageArea.innerHTML = message;
    // 次の問題
    reset();
    showLetters();
    showRule();
  });
});

// ゲーム終了
function gameEnd() {
  cells.forEach((cell) => {
    cell.classList.add("no_event");
    startButton.style.display = "block";
  });
  chainRecord = max(chain, chainRecord);
  messageArea.innerHTML = `全部で${score}問正解！<br>最大連続正解数：${chainRecord}`;
  reset();
  score = 0;
  chain = 0;
  chainRecord = 0;
  ruleArea.innerHTML = "startを押してね";
  cells.forEach((cell) => {
    cell.classList.add("no_event");
  });
}

// スタートボタン
startButton.addEventListener("click", function () {
  reset();
  messageArea.innerHTML = "";
  startButton.style.display = "none";
  showLetters();
  showRule();
  cells.forEach((cell) => {
    cell.classList.remove("no_event");
  });
  window.setTimeout(function () {
    gameEnd();
  }, 30000);
});
