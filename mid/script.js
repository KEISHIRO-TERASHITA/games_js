const ctx = document.getElementById("myChart");
const button = document.querySelector("button");
const dataArea = document.querySelectorAll(".datum");
let data = [5, 5, 5, 5, 5, 5];

// グラフ描画処理
function drawChart(data) {
  var ctx = document.getElementById("myChart").getContext("2d");
  window.myChart = new Chart(ctx, {
    // インスタンスをグローバル変数で生成
    type: "radar",
    data: {
      // ラベルとデータセット
      labels: ["a", "b", "c", "d", "e", "f"],
      datasets: [
        {
          data: data, // グラフデータ
          backgroundColor: "rgba(0, 134, 197, 0.7)", // 棒の塗りつぶし色
          borderColor: "rgba(0, 134, 197, 1)", // 棒の枠線の色
          borderWidth: 1, // 枠線の太さ
        },
      ],
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 10,
        }
      },
      legend: {
        display: false, // 凡例を非表示
      },
    },
  });
}

drawChart(data); // グラフ描画処理を呼び出す

dataArea.forEach((datumArea, index) => {
  datumArea.value = data[index];
  datumArea.addEventListener("change", function () {
    const area = document.getElementById("chartArea");
    area.innerHTML = "";
    const myChart = document.createElement("canvas");
    myChart.id = "myChart";
    area.appendChild(myChart);
    dataArea.forEach((datum, index) => {
      data[index] = datum.value;
    });
    drawChart(data);
  });
});
