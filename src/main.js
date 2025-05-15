import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = import.meta.env.BASE_URL;
  document.querySelector("#home-link").href = baseUrl;
  document.querySelector("#contacts-link").href = baseUrl + "contacts";

  try {
    fetch("content/hero.json")
      .then(res => res.json())
      .then(data => {
        const title = document.getElementById("title");
        const desc = document.getElementById("description");

        title.textContent = data.title;
        desc.textContent = data.description;

        title.classList.remove("invisible");
        desc.classList.remove("invisible");
      });
  } catch (error) {
    console.error("Failed to load hero content:", error);
  }
});
