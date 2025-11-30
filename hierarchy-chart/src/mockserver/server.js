import { createServer } from "miragejs";

let server = createServer();

server.get("/api/orgtree", {
  org: [
    {
      id: 1,
      name: "Mark Hill",
      designation: "CEO",
      team: "Executive",
      manager: null,
      img_src: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: 2,
      name: "Joe Linux",
      designation: "VP Engineering",
      team: "Engineering",
      manager: 1,
      img_src: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "John Green",
      designation: "VP Sales",
      team: "Sales",
      manager: 1,
      img_src: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Ron Blomquist",
      designation: "Senior Engineer",
      team: "Engineering",
      manager: 2,
      img_src: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Sarah Chen",
      designation: "Engineer",
      team: "Engineering",
      manager: 2,
      img_src: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 6,
      name: "Mike Ross",
      designation: "Sales Manager",
      team: "Sales",
      manager: 3,
      img_src: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 7,
      name: "Lisa Wang",
      designation: "Sales Rep",
      team: "Sales",
      manager: 6,
      img_src: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 8,
      name: "Tom Brady",
      designation: "Junior Engineer",
      team: "Engineering",
      manager: 4,
      img_src: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 9,
      name: "Amy Adams",
      designation: "VP Marketing",
      team: "Marketing",
      manager: 1,
      img_src: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 10,
      name: "Bob Smith",
      designation: "Marketing Manager",
      team: "Marketing",
      manager: 9,
      img_src: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      id: 11,
      name: "Ethan Clark",
      designation: "Software Architect",
      team: "Engineering",
      manager: 2,
      img_src: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 12,
      name: "Nina Patel",
      designation: "Senior Marketing Specialist",
      team: "Marketing",
      manager: 9,
      img_src: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 13,
      name: "David Lee",
      designation: "Sales Associate",
      team: "Sales",
      manager: 6,
      img_src: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 14,
      name: "Emily Foster",
      designation: "HR Manager",
      team: "HR",
      manager: 1,
      img_src: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: 15,
      name: "Kevin Parker",
      designation: "IT Support Engineer",
      team: "IT",
      manager: 1,
      img_src: "https://randomuser.me/api/portraits/men/13.jpg",
    },
  ],
});

server.put("/api/manager/changed", (schema, request) => {
  const { employees, employeeId, managerId } = JSON.parse(request.requestBody);
  return employees.map((emp) => {
    if (employeeId == emp.id) {
      return { ...emp, manager: managerId };
    }
    return emp;
  });
});
