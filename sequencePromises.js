// promise顺序执行
let urls = ['a', 'b', 'c'];
let promises = urls.map(url => {
  return function(query) {
    return new Promise((resolve) => {
      console.log(`query[${query}]`);
      console.log(`ajax[${url}]`); // 模拟ajax
      resolve(`res[${url}]`);
    });
  };
});

promises.reduce((acc, cur) => {
  return acc.then(res => {
    console.log(res);
    return cur(res);
  });
}, Promise.resolve(urls[0])).then(res => {
  console.log(res);
});

let p = promises[0](urls[0]);
for(let i = 1; i < promises.length; i++) {
  p = p.then(res => {
    console.log(res);
    return promises[i](res);
  });
}
p.then((res) => { console.log(res); });
