document.addEventListener("DOMContentLoaded", function () {
    // Initial state: show only the home section
    var sections = document.querySelectorAll("section");
    sections.forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("welcome").style.display = "block";

    function navigateToSection(sectionId) {
        // Hide all sections
        var sections = document.querySelectorAll("section");
        sections.forEach(function (section) {
          section.style.display = "none";
        });
        // Show the selected section
        document.getElementById(sectionId).style.display = "block";
    
        var navLinks = document.querySelectorAll(".movies .movie");
        navLinks.forEach(function (link) {
          link.classList.remove("active");
        });
      }
      // Event listeners for navigation links
  var navLinks = document.querySelectorAll(".movies .movie");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var sectionId = link.getAttribute("href").slice(1);
      navigateToSection(sectionId);
    });
  });
  });