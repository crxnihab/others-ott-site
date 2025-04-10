function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("theme-icon");

  body.classList.toggle("light");
  body.classList.toggle("dark");

  if (body.classList.contains("light")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}
