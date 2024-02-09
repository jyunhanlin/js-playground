// from ReadStream to ReadableStream
async function* nodeStreamToIterator(stream) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}

function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

const nodeStream = fs.createReadStream('./.gitignore', { highWaterMark: 8 });
const iterator = nodeStreamToIterator(nodeStream);
const webStream = iteratorToStream(iterator);

const res = new Response(webStream);
const blob = await res.blob();
console.log(await blob.text());
