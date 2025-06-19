/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function (students, sandwiches) {
  const count = [0, 0];

  for (const type of students) {
    count[type] += 1;
  }

  for (const type of sandwiches) {
    if (count[type] === 0) return count[0] + count[1];

    count[type] -= 1;
  }

  return 0;
};
