export default function createIteratorObject(report) {
  const iterator = [];
  for (const employeeLists of Object.values(report.allEmployees)) {
    iterator.push(...employeeLists);
  }
  return iterator;
}
