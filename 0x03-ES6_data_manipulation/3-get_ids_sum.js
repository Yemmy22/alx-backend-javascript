export default function getStudentIdsSum(students) {
  return (students.reduce((sum, currentValue) => sum + currentValue.id, 0));
}
