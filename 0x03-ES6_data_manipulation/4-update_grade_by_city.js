/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
export default function updateStudentGradeByCity(students, city, newgrades) {
  return students
    .filter((obj) => obj.location === city)
    .map((student) => {
      newgrades.map((data) => {
        if (data.studentId === student.id) {
          student.grade = data.grade;
        }

        if (!student.hasOwnProperty('grade')) {
          student.grade = 'N/A';
        }
        return student;
      });
      return student;
    });
}
