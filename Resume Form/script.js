document.getElementById("formData").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone_no = document.getElementById("phone_no").value.trim();
    const address = document.getElementById("address").value.trim();
    const education = document.getElementById("education").value.trim();
    const skill = document.getElementById("skill").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const project = document.getElementById("project").value.trim();

    if (!name || !email || !phone_no || !address || !education || !skill || !experience || !project) {
        alert("Please fill out all required fields correctly.");
        return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Basic phone number validation (e.g., 10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone_no)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Store form data in localStorage for use in resume_selection.html
    const formData = { name, email, phone_no, address, education, skill, experience, project };
    localStorage.setItem("resumeFormData", JSON.stringify(formData));

    console.log("Form Data:", formData);

    // Redirect to resume_selection.html
    window.location.href = "new_tab.html";
});