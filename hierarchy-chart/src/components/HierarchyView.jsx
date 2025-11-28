import { useEffect, useState } from "react";
import styles from "../css/Heirarchy.module.css"
var mockData = [
  {
    id: 1,
    name: "Mark Hill",
    designation: "CEO",
    team: "Executive",
    manager: null,
  },
  {
    id: 2,
    name: "Joe Linux",
    designation: "VP Engineering",
    team: "Engineering",
    manager: 1,
  },
  {
    id: 3,
    name: "John Green",
    designation: "VP Sales",
    team: "Sales",
    manager: 1,
  },
  {
    id: 4,
    name: "Ron Blomquist",
    designation: "Senior Engineer",
    team: "Engineering",
    manager: 2,
  },
  {
    id: 5,
    name: "Sarah Chen",
    designation: "Engineer",
    team: "Engineering",
    manager: 2,
  },
  {
    id: 6,
    name: "Mike Ross",
    designation: "Sales Manager",
    team: "Sales",
    manager: 3,
  },
  {
    id: 7,
    name: "Lisa Wang",
    designation: "Sales Rep",
    team: "Sales",
    manager: 6,
  },
  {
    id: 8,
    name: "Tom Brady",
    designation: "Junior Engineer",
    team: "Engineering",
    manager: 4,
  },
  {
    id: 9,
    name: "Amy Adams",
    designation: "VP Marketing",
    team: "Marketing",
    manager: 1,
  },
  {
    id: 10,
    name: "Bob Smith",
    designation: "Marketing Manager",
    team: "Marketing",
    manager: 9,
  },
];

const api = {
  getEmployees: function () {
    return Promise.resolve(mockData);
  },
  updateEmployee: function (empId, newManagerId) {
    mockData = mockData.map((emp) => {
      if (empId == emp.id) {
        emp.manager = newManagerId;
        return emp;
      }
      return emp;
    });
    return Promise.resolve({ success: true });
  },
};

function HierarchyView() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  useEffect(() => {
    async function get() {
      const employess = await api.getEmployees();
      setEmployees(() => employess);
      setFilteredEmployees(() => employess);
    }
    get();
  }, []);

  const teams = ["All", ...new Set(employees.map((e) => e.team))];

  useEffect(() => {
    var emps = employees;
    if (selectedTeam != "All") {
      setFilteredEmployees(emps.filter((emp) => emp.team == selectedTeam));
    } else {
      setFilteredEmployees(emps);
    }
    if (searchTerm != "") {
      setFilteredEmployees(
        emps.filter((ele) => {
          return (
            ele.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ele.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ele.team.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }
  }, [searchTerm, selectedTeam]);

  return (
    <div className={styles.container}>

      <div className={styles.sidebar}>
      <h2 className={styles.title}>
          Employees
        </h2>
  
    
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div     className={styles.selectWrapper}>
        <select
          value={selectedTeam}
          onChange={(e) => {
            setSelectedTeam(e.target.value);
          }}
          className={styles.select}
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.employeeList}>
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className={styles.employeeCard}
          >
            <div className={styles.employeeName}>{emp.name}</div>
            <div className={styles.employeeDesignation}>{emp.designation}</div>
            <div className={styles.employeeTeam}>{emp.team}</div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default HierarchyView;
