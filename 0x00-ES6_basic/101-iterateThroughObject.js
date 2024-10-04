export default function iterateThroughObject(reportWithIterator) {
  let text = '';

  for (const item of reportWithIterator) {
    text += item;
    if (reportWithIterator.indexOf(item) !== reportWithIterator.length - 1) {
      text += ' | ';
    }
  }
  return text;
}
