function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function shiftUp(arr, k) {
  while(k > 0 && arr[k] > arr[Math.floor((k-1)/2)]) {
    swap(arr, k, Math.floor((k-1)/2)); // swap操作可优化为赋值操作
    k = Math.floor((k-1)/2);
  }
}

function shiftDown(arr, k) {
  while(2*k+1 < arr.length) {
    let j = 2*k+1;
    if (j+1 < arr.length && arr[j+1] > arr[j]) j++;
    if (arr[k] > arr[j]) break;
    swap(arr, k, j); // swap操作可优化为赋值操作
    k = j;
  }
}

// 入队
function insert(arr, item) {
  arr.push(item);
  shiftUp(arr, arr.length-1);
}
// 出队
function extractMax(arr) {
  let max = arr[0];
  swap(arr, 0, arr.length-1);
  arr.pop();
  shiftDown(arr, 0);
  return max;
}
// 堆化
function heapify(arr) {
  for(let i = Math.floor((arr.length-2)/2); i >=0; i--) {
    shiftDown(arr, i);
  }
}
