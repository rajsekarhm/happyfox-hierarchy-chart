import { useCallback, useEffect, useState } from "react";
import styles from "../css/Heirarchy.module.css";
import TreeView from "./TreeView";

function HierarchyContainer() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [draggedEmployee, setDraggedEmployee] = useState(null);

  useEffect(() => {
    async function get() {
      var response = await fetch("/api/orgtree");
      var _employess = await response.json();
      const { org } = _employess;
      setEmployees(() => org);
      setFilteredEmployees(() => org);
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
  }, [searchTerm, selectedTeam, employees]);

  const getChartEmployees = useCallback(() => {
    if (selectedTeam === "All") return employees;

    const teamEmployees = employees.filter((e) => e.team === selectedTeam);
    const teamIds = new Set(teamEmployees.map((e) => e.id));
    const relevantEmployees = new Set(teamIds);
    console.log(teamEmployees, relevantEmployees);

    teamEmployees.forEach((emp) => {
      let current = emp;
      while (current.manager) {
        relevantEmployees.add(current.manager);
        current = employees.find((e) => e.id === current.manager);
        if (!current) break;
      }
    });

    return employees.filter((e) => relevantEmployees.has(e.id));
  }, [employees, selectedTeam]);

  const rootEmployees = getChartEmployees().filter((e) => e.manager === null);

  const handleDragStart = (e, employee) => {
    setDraggedEmployee(employee);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = async (e, newManager) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedEmployee || newManager.id == draggedEmployee.id) {
      setDraggedEmployee(null);
      return;
    }

    // Prevent circular reference
    let current = newManager;
    while (current) {
      if (current.id === draggedEmployee.id) {
        alert("Cannot make an employee their own subordinate!");
        setDraggedEmployee(null);
        return;
      }
      current = employees.find((e) => e.id === current.manager);
    }

    const updateEmployeeList = await fetch("/api/manager/changed", {
      method: "PUT",
      body: JSON.stringify({
        employees,
        employeeId: draggedEmployee.id,
        managerId: newManager.id,
      }),
    });
    const response = await updateEmployeeList.json()
    setEmployees(response);

    setDraggedEmployee(null);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Employees</h2>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.selectWrapper}>
          Filter by Team
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
            <div key={emp.id} className={styles.employeeCard}>
              <div className={styles.employeeName}>{emp.name}</div>
              <div className={styles.employeeDesignation}>
                {emp.designation}
              </div>
              <div className={styles.employeeTeam}>{emp.team}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.orgcontainer}>
        <h1 className={styles.orgheading}>Organization Chart</h1>
        <div className={styles.orgwrapper}>
          {rootEmployees.map((root) => (
            <TreeView
              key={root.id}
              employee={root}
              employees={getChartEmployees()}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              draggedId={draggedEmployee?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HierarchyContainer;
