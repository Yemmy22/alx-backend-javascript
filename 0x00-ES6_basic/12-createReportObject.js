/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
export default function createReportObject(employeesList) {
  const obj = {
    allEmployees: {
      ...employeesList,
    },
    getNumberOfDepartments() {
      let count = 0;
      for (const department in employeesList) {
        count += 1;
      }
      return count;
    },
  };
  return { ...obj };
}
