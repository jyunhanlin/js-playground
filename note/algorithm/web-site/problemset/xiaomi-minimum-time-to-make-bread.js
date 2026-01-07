var minimumBreadTime = function (a, b) {
  const n = a.length;

  let minA = Infinity;
  let minAIndex;
  let sMinA = Infinity;
  let minB = Infinity;
  let minBIndex;
  let sMinB = Infinity;

  for (let i = 0; i < n; i += 1) {
    if (a[i] < minA) {
      sMinA = minA;
      minA = a[i];
      minAIndex = i;
    } else if (a[i] < sMinA) {
      sMinA = a[i];
    }

    if (b[i] < minB) {
      sMinB = minB;
      minB = b[i];
      minBIndex = i;
    } else if (b[i] < sMinB) {
      sMinB = b[i];
    }
  }

  if (minAIndex !== minBIndex) return Math.max(minA, minB);

  return Math.min(minA + minB, Math.max(minA, sMinB), Math.max(minB, sMinA));
};
