const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (records) => {
  return records.map(record => createEmployeeRecord(record));
}

const createTimeInEvent = (employee, timeIn) => {
  employee.timeInEvents.push({
    type: 'TimeIn',
    date: timeIn.split(' ')[0],
    hour: parseInt(timeIn.split(' ')[1])
  });
  return employee
} 

const createTimeOutEvent = (employee, timeOut) => {
  employee.timeOutEvents.push({
    type: 'TimeOut',
    date: timeOut.split(' ')[0],
    hour: parseInt(timeOut.split(' ')[1])
  })
  return employee
}

const hoursWorkedOnDate = (employee, date) => {
  const timeIn = employee.timeInEvents.find(record => record.date === date);
  const timeOut = employee.timeOutEvents.find(record => record.date === date);
  const hours = Math.abs((timeIn.hour - timeOut.hour)) 
  return parseInt(hours.toString().split('0'))
 }

 const wagesEarnedOnDate = (employee, date) => {
  const hours = hoursWorkedOnDate(employee, date)
  return hours * employee.payPerHour
 }