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

function shiftDown2(arr, k, n) {
  while(2*k+1 < n) {
    let j = 2*k+1;
    if (j+1 < n && arr[j+1] > arr[j]) j++;
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
  for(let i = Math.floor((arr.length-1)/2); i >=0; i--) {
    shiftDown(arr, i);
  }
}

// heapSort1, 将所有的元素依次添加到堆中, 在将所有元素从堆中依次取出来, 即完成了排序
// 无论是创建堆的过程, 还是从堆中依次取出元素的过程, 时间复杂度均为O(nlogn)
// 整个堆排序的整体时间复杂度为O(nlogn)
function heapSort1(arr) {
  let heap = [], ret = [];
  for(let i = 0; i < arr.length; i++) {
    insert(heap, arr[i]);
  }
  for(let i = arr.length-1; i >= 0; i--) {
    ret[i] = (extractMax(heap));
  }
  return ret;
}

// heapSort2, 借助我们的heapify过程创建堆
// 此时, 创建堆的过程时间复杂度为O(n), 将所有元素依次从堆中取出来, 实践复杂度为O(nlogn)
// 堆排序的总体时间复杂度依然是O(nlogn), 但是比上述heapSort1性能更优, 因为创建堆的性能更优
function heapSort2(arr) {
  let ret = [];
  heapify(arr);
  for(let i = arr.length-1; i >= 0; i--) {
    ret[i] = (extractMax(arr));
  }
  return ret;
}

// 堆排序3: 不使用一个额外的最大堆, 直接在原数组上进行原地的堆排序
function heapSort3(arr) {
  heapify(arr);
  for(let i = arr.length-1; i > 0; i--) {
    swap(arr, 0, i);
    shiftDown2(arr, 0, i);
  }
  return arr;
}
