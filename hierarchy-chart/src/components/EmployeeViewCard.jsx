import styles from "../css/Card.module.css";

function EmployeeViewCard(props) {
  const { employee, onDragStart, onDrop, onDragOver, isDragging } = props;
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, employee)}
      onDrop={(e) => onDrop(e, employee)}
      onDragOver={onDragOver}
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
    >
      <div className={styles.name}>{employee.name}</div>
      <div className={styles.designation}>{employee.designation}</div>
      <div className={styles.team}>{employee.team}</div>
    </div>
  );
}

export default EmployeeViewCard;
