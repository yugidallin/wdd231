// Footnote
const year = document.querySelector("#currentYear");
const today = new Date();
let lastModDate = new Date(document.lastModified);

year.innerHTML = `&copy${today.getFullYear()}`;
document.getElementById(
  "lastModified"
).textContent = `Last modified on: ${lastModDate.toDateString()} at ${lastModDate.toLocaleTimeString()}`;

// Menu
const menuBtn = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Course Array
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

// Function to display courses
function displayCourses(courses) {
  const coursesContainer = document.querySelector(".courses");
  coursesContainer.innerHTML = "";

  courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    courseCard.classList.add(course.completed ? "completed" : "incomplete");
    courseCard.innerHTML = `
      <h3>${course.subject} ${course.number} | <span>Credits: ${course.credits}</span></h3>  
    `;
    coursesContainer.appendChild(courseCard);
  });

  // Calculate total credits
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalCreditsElement = document.querySelector("#totalCredits");
  totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

// Function to filter courses
function filterCourses(category) {
  let filteredCourses;
  if (category === "All") {
    filteredCourses = courses;
  } else {
    filteredCourses = courses.filter((course) => course.subject === category);
  }
  displayCourses(filteredCourses);
}

// Event listeners for filter buttons
document.querySelectorAll(".filter-buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-buttons button")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterCourses(button.textContent);
  });
});

// Initial display of all courses
filterCourses("All");
