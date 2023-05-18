// var demoArr = [
//   { size: 20, color: "slateblue" },
//   { size: 36, color: "slateblue" },
//   { size: 42, color: "slateblue" },
//   { size: 47, color: "slateblue" },
//   { size: 48, color: "slateblue" },
//   { size: 95, color: "slateblue" },
//   { size: 64, color: "slateblue" },
//   { size: 58, color: "slateblue" },
//   { size: 91, color: "slateblue" },
//   { size: 65, color: "slateblue" },
//   // { size: 65, color: "slateblue" },
//   // { size: 84, color: "slateblue" },
//   // { size: 76, color: "slateblue" },
//   // { size: 77, color: "slateblue" },
//   // { size: 79, color: "slateblue" },
//   // { size: 93, color: "slateblue" },
//   // { size: 48, color: "slateblue" },
//   // { size: 80, color: "slateblue" },
//   // { size: 46, color: "slateblue" },
//   // { size: 89, color: "slateblue" },
// ];

var demoArr = [
  { size: 10, color: "slateblue" },
  { size: 80, color: "slateblue" },
  { size: 30, color: "slateblue" },
  { size: 90, color: "slateblue" },
  { size: 40, color: "slateblue" },
  { size: 50, color: "slateblue" },
  { size: 70, color: "slateblue" },
];

var sizeRange = 20;
var speedRange = 120;
var bars = [];

function addBars(arr) {
  const numberOfBars = sizeRange;

  for (let i = 0; i < numberOfBars; i++) {
    const barSize = Math.floor(Math.random() * (100 - 20)) + 20;
    arr.push({ size: barSize, color: "slateblue" });
  }

  createBars(arr);
}

function createBars(arr) {
  document.querySelector(".visualizer").innerHTML = "";
  arr.forEach((bar) => {
    document
      .querySelector(".visualizer")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="bar" style="width: ${
          Math.floor(sizeRange / 16) * 100
        }%; height: ${bar.size}%; background-color: ${bar.color};">${
          bar.size
        }</div>`
      );
  });
}
createBars(demoArr);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
  let selectedBar = document.getElementsByClassName("bar");
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].size > arr[j + 1].size) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        createBars(arr);
        selectedBar[j].style.backgroundColor = "green";
        selectedBar[j + 1].style.backgroundColor = "green";
        await sleep(speedRange);
      }
    }
    await sleep(speedRange);
  }
}

async function insertionSort(arr) {
  let i, j, minIndex;
  for (i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (j = i + 1; j < arr.length; j++) {
      if (arr[j].size < arr[minIndex].size) minIndex = j;
    }

    let temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;

    createBars(arr);
    await sleep(speedRange + 1000);
  }
}

async function quickSort(arr, low, high) {
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  async function partition(arr, low, high) {
    let pivot = arr[high];

    let i = low - 1;
    for (let j = low; j <= high; j++) {
      if (arr[j].size < pivot.size) {
        i++;
        swap(arr, i, j);
      }
      createBars(arr);
      await sleep(speedRange);
    }

    swap(arr, i + 1, high);
    return i + 1;
  }

  if (low < high) {
    partition(arr, low, high).then(async (part) => {
      quickSort(arr, low, part - 1);
      quickSort(arr, part + 1, high);
      createBars(arr);
      await sleep(speedRange);
    });
  }
}

async function mergeSort(arr, l, r) {
  async function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1);
    var R = new Array(n2);

    for (var i = 0; i < n1; i++) {
      L[i] = arr[l + i];
      createBars(arr);
      await sleep(speedRange);
    }
    for (var j = 0; j < n2; j++) {
      R[j] = arr[m + 1 + j];
      createBars(arr);
      await sleep(speedRange);
    }

    var i = 0;
    var j = 0;
    var k = l;

    while (i < n1 && j < n2) {
      if (L[i].size <= R[j].size) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      createBars(arr);
      await sleep(speedRange);
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      createBars(arr);
      await sleep(speedRange);
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      createBars(arr);
      await sleep(speedRange);
    }
  }

  if (l >= r) {
    createBars(arr);
    await sleep(speedRange);
    return;
  }

  var m = l + parseInt((r - l) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);

  createBars(arr);
  await sleep(speedRange);
}

window.onload = function () {
  // addBars(bars);

  document.getElementById("sizeRange").onchange = function () {
    10 * this.value;
  };
  document.getElementById("speedRange").onchange = function () {
    200 * this.value;
  };
  document.getElementById("bubbleSortBtn").onclick = function () {
    bubbleSort(demoArr);
  };
  document.getElementById("selectionSortBtn").onclick = function () {
    insertionSort(demoArr);
  };
  document.getElementById("insertionSortBtn").onclick = function () {
    insertionSort(demoArr);
  };
  document.getElementById("quickSortBtn").onclick = function () {
    quickSort(demoArr, 0, demoArr.length - 1);
  };
  document.getElementById("mergeSortBtn").onclick = function () {
    // console.log(0 + parseInt(1 - 0 / 2));
    mergeSort(demoArr, 0, demoArr.length - 1);
  };
};
