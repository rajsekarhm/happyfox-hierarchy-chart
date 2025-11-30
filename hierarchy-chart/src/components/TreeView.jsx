import EmployeeViewCard from "./EmployeeViewCard";
import styles from "../css/Tree.module.css";

function TreeView(props) {
  const { employee, employees, onDragStart, onDragOver, draggedId, onDrop } =
    props;
  const childrens = employees.filter((emp) => employee.id == emp.manager);
  const isDragging = draggedId === employee.id;

  return (
    <div className={styles.container}>
      <EmployeeViewCard
        employee={employee}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
        isDragging={isDragging}
      />
      {childrens.length > 0 && (
        <div className={styles.childrenWrapper}>
          {childrens.length > 1 ? (
            <>
              <div className={styles.horizontalLine} />
            </>
          ) : (
            <div className={styles.verticalLine} />
          )}

          {childrens.map((child) => (
            <div key={child.id} className={styles.childWrapper}>
              <div
                className={
                  childrens.length > 1
                    ? styles.verticalLine
                    : styles.singleVerticalLine
                }
              />

              <TreeView
                employee={child}
                employees={employees}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                draggedId={draggedId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeView;
