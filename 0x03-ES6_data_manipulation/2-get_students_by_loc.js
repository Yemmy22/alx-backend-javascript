export default function getStudentsByLocation(students, city) {
  return students.filter((ele) => ele.location === city);
}
