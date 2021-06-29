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
  const hours = Math.abs((parseInt(timeIn.hour.toString().split('0')) - parseInt(timeOut.hour.toString().split('0')))) 
  return hours
 }

 const wagesEarnedOnDate = (employee, date) => {
  const hours = hoursWorkedOnDate(employee, date)
  return hours * employee.payPerHour
 }

 const allWagesFor = (employee) => {
  const wages = employee.timeInEvents.map(record => wagesEarnedOnDate(employee, record.date));
  return wages.reduce((wage, total) => wage + total);
 }

 const calculatePayroll = (employees) => {
  const payroll = employees.map(employee => allWagesFor(employee));
  return payroll.reduce((wage, total) => wage + total);
 }

 const findEmployeeByFirstName = (records, name) => {
  return records.find(record => record.firstName === name);
 }