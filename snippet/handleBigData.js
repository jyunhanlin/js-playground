function* dataGenerator() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

function* processData(data, processFn) {
  for (let item of data) {
    yield processFn(item);
  }
}

const data = dataGenerator();

const processedData = processData(data, (item) => item * 2);

for (let i = 0; i < 500; i++) {
  console.log(processedData.next().value);
}
