/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (startGene, endGene, bank) {
  const bankSet = new Set(bank);
  if (!bankSet.has(endGene)) return -1;

  const AGCT = ['A', 'G', 'C', 'T'];
  const queue = [];
  const visited = new Set();
  queue.push(startGene);
  visited.add(startGene);

  let step = 0;

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i += 1) {
      const gene = queue.shift();
      if (gene === endGene) return step;

      const geneChars = gene.split('');
      for (let j = 0; j < geneChars.length; j += 1) {
        const oldChar = geneChars[j];
        for (const newChar of ['A', 'G', 'C', 'T']) {
          geneChars[j] = newChar;
          const newGene = geneChars.join('');

          if (!visited.has(newGene) && bankSet.has(newGene)) {
            queue.push(newGene);
            visited.add(newGene);
          }
        }
        geneChars[j] = oldChar;
      }
    }

    step += 1;
  }

  return -1;
};
