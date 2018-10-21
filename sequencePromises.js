// promise顺序执行
let urls = ['a', 'b', 'c'];

function urls2promises(urls) {
  return urls.map(url => {
    return function (query) {
      return new Promise((resolve) => {
        console.log(`query[${query}]`);
        console.log(`ajax[${url}]`); // 模拟ajax
        resolve(`res[${url}]`);
      });
    };
  })
}

function promiseSeq1(urls) {
  return urls2promises(urls).reduce((acc, cur) => {
    return acc.then(res => {
      console.log(res);
      return cur(res);
    });
  }, Promise.resolve(urls[0]));
}

function promiseSeq2(urls) {
  let p = Promise.resolve(urls[0]);
  urls2promises(urls).forEach((promise) => {
    p =  p.then(res => {
      console.log(res);
      return promise(res);
    })
  });
  return p;
}

let p1 = promiseSeq1(urls);
let p2 = promiseSeq2(urls);

p1.then((res) => { console.log(res); });
p2.then((res) => { console.log(res); });
