// Behavioral Design Patterns

// Visitor

// ES6
function bonusPattern(employee) {
  if (employee instanceof Manager) employee.bonus = employee.salary * 2;
  if (employee instanceof Developer) employee.bonus = employee.salary;
}

class Employee {
  constructor(salary) {
    this.bonus = 0;
    this.salary = salary;
  }

  accept(item) {
    item(this);
  }
}

class Manager extends Employee {
  constructor(salary) {
    super(salary);
  }
}

class Developer extends Employee {
  constructor(salary) {
    super(salary);
  }
}

// ES5
function bonusPattern(employee) {
  if (employee instanceof Manager) employee.bonus = employee.salary * 2;
  if (employee instanceof Developer) employee.bonus = employee.salary;
}

function Employee() {
  this.bonus = 0;
}

Employee.prototype.accept = function (item) {
  item(this);
};

function Manager(salary) {
  this.salary = salary;
}

Manager.prototype = Object.create(Employee.prototype);

function Developer(salary) {
  this.salary = salary;
}

Developer.prototype = Object.create(Employee.prototype);

// -----

var Employee = function (name, salary, vacation) {
  var self = this;

  this.accept = function (visitor) {
    visitor.visit(self);
  };

  this.getName = function () {
    return name;
  };

  this.getSalary = function () {
    return salary;
  };

  this.setSalary = function (sal) {
    salary = sal;
  };

  this.getVacation = function () {
    return vacation;
  };

  this.setVacation = function (vac) {
    vacation = vac;
  };
};

var ExtraSalary = function () {
  this.visit = function (emp) {
    emp.setSalary(emp.getSalary() * 1.1);
  };
};

var ExtraVacation = function () {
  this.visit = function (emp) {
    emp.setVacation(emp.getVacation() + 2);
  };
};

function run() {
  var employees = [
    new Employee('John', 10000, 10),
    new Employee('Mary', 20000, 21),
    new Employee('Boss', 250000, 51),
  ];

  var visitorSalary = new ExtraSalary();
  var visitorVacation = new ExtraVacation();

  for (var i = 0, len = employees.length; i < len; i++) {
    var emp = employees[i];

    emp.accept(visitorSalary);
    emp.accept(visitorVacation);
    console.log(
      emp.getName() + ': $' + emp.getSalary() + ' and ' + emp.getVacation() + ' vacation days'
    );
  }
}
