document.getElementById("formData").addEventListener("submit", async function(event) {
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

    // // Basic email validation
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(email)) {
    //     alert("Please enter a valid email address.");
    //     return;
    // }

    // // Basic phone number validation (e.g., 10 digits)
    // const phonePattern = /^\d{10}$/;
    // if (!phonePattern.test(phone_no)) {
    //     alert("Please enter a valid 10-digit phone number.");
    //     return;
    // }

    // Store form data in localStorage for use in resume_selection.html
    console.log("experice updated: ",experience);


    const formData = { name, email, phone_no, address, education, skill, experience, project };

    try{
        const response = await fetch("http://10.224.1.107:8001/save_data_to_MongDB", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            keepalive: true
        });

        console.log("Response form mongDB fastapi: ", response);
        console.log("Response form mongDB fastapi in json format: ", await response.json);

        if (!response.ok){
            throw new  Error(`HTTP error! Status: ${response.status}`);

        }

        const result = await response.json();
        console.log("Response from server: ", result)
        const session_id = result.id;
        console.log("Session_id from server: ", result.id)

        const fetchResponse = await fetch(`http://10.224.1.107:8001/get_latest_data_from_MongDB/${result.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!fetchResponse.ok) {
            throw new Error(`HTTP error fetching data! Status: ${fetchResponse.status}`);
        }

        const fetchedData = await fetchResponse.json();
        console.log("Latest data from MongoDB:", fetchedData);

        // Display the fetched data
        let responseContainer = document.getElementById("ResponseContainer");
        if (!responseContainer) {
            responseContainer = document.createElement("div");
            responseContainer.id = "ResponseContainer";
            document.querySelector(".container")?.appendChild(responseContainer);
        }

        responseContainer.innerHTML = `
            
            <br>
            <br>
            <h2>Latest Resume Data From MongoDB</h2>
            <br>
            <p><strong>Name:</strong> ${fetchedData.name}</p>
            <p><strong>Email:</strong> ${fetchedData.email}</p>
            <p><strong>Phone:</strong> ${fetchedData.phone_no}</p>
            <p><strong>Address:</strong> ${fetchedData.address}</p>
            <p><strong>Education:</strong> ${fetchedData.education}</p>
            <p><strong>Skills:</strong> ${fetchedData.skill}</p>
            <p><strong>Experience:</strong> ${fetchedData.experience}</p>
            <p><strong>Project:</strong> ${fetchedData.project}</p>
            <form action="/Resume Form/new_tab.html?sessionId=${result.id}" method="POST" target="_blank">
            <input type="hidden" name="session_id" value=${result.id}>
            <button id="template", type="submit">Choose the Resume Template</button>
            </form>
        `;
        
         // On the first page
// const sessionId = result.id;
// window.location.href = `/Resume Form/new_tab.html?sessionId=${sessionId}`;   
        

        
    }catch (error){
        console.error("Error: ", error);
        alert("An error occurred while sending data to the FastAPI server and mongoDB. For data tranfer");
    
    }

        // localStorage.setItem("resumeFormData", JSON.stringify(formData));

        // // Attach event listener to the template button after it's added to the DOM
        // document.getElementById("template").addEventListener("click", function(event) {
        //     event.preventDefault();
        //     window.location.href = "new_tab.html";
        // });

    // Redirect to resume_selection.html
    // this.addEventListener("submit")
    // {
    //     window.location.href = "new_tab.html"
    // }
        

});


// Initialize an array to store selected skills
let selectedSkills = [];

// Update the hidden input and display
function updateSkills() {
    // Update hidden input with comma-separated skills
    document.getElementById('skill').value = selectedSkills.join(', ');
    // Update display
    const display = document.getElementById('selectedSkillsDisplay');
    display.textContent = selectedSkills.length > 0 
        ? 'Selected skills: ' + selectedSkills.join(', ')
        : 'Selected skills: None';
}

// Handle predefined skill button clicks
document.querySelectorAll('.skill-button').forEach(button => {

    button.addEventListener('click', function() {
        const skill = this.getAttribute('data-skill');
        if (!selectedSkills.includes(skill)) {
            // Add skill and mark button as selected
            selectedSkills.push(skill);
            this.classList.add('selected');
        } else {
            // Remove skill and unmark button
            selectedSkills = selectedSkills.filter(s => s !== skill);
            this.classList.remove('selected');
        }
        updateSkills();
    });
});

// Handle custom skill addition
document.getElementById('addCustomSkill').addEventListener('click', function() {
    const customSkillInput = document.getElementById('customSkill');
    const skill = customSkillInput.value.trim();
    if (skill && !selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
        customSkillInput.value = ''; // Clear input
        updateSkills();
    }
});

// Allow pressing Enter to add custom skill
document.getElementById('customSkill').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('addCustomSkill').click();
    }
});

// Handle form submission (for demonstration)
// document.getElementById('skillsForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Submitted skills: ' + document.getElementById('skill').value);
// });

console.log(selectedSkills);


document.getElementById("AddExperience").addEventListener("click", function()
{
            const institute = document.getElementById('institute').value;
            const position = document.getElementById('position').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value || 'Present';

            // Create experience object
            const experience = {
                institute,
                position,
                startDate,
                endDate
            };

            // Get existing data from hidden input or initialize empty array
            const hiddenInput = document.getElementById('experience');
            let experiences = hiddenInput.value ? JSON.parse(hiddenInput.value) : [];

            // Add new experience to array
            experiences.push(experience);

            // Update hidden input with JSON string
            hiddenInput.value = JSON.stringify(experiences);

            // Generate output for display
            const output = experiences.map((exp, index) => `
            <br>
                <h3>Experience ${index + 1}</h3>
                <br>
                <p><strong>Institute/Company:</strong> ${exp.institute}</p>
                <p><strong>Position:</strong> ${exp.position}</p>
                <p><strong>From:</strong> ${exp.startDate}</p>
                <p><strong>Till:</strong> ${exp.endDate}</p>
            `).join('');

            document.getElementById('experience-output').innerHTML = output;

            // Reset form inputs (except hidden field)
            document.getElementById('institute').value = '';
            document.getElementById('position').value = '';
            document.getElementById('startDate').value = '';
            document.getElementById('endDate').value = '';

console.log(hiddenInput);
console.log(experiences);
});

           




document.getElementById("AddEducation").addEventListener("click", function()
{

    const Academy = document.getElementById("Academy").value;
    const startyear = document.getElementById("startyear").value;
    const endyear = document.getElementById("endyear").value;
    const percentage = document.getElementById("percentage").value||'Present';

    const edu={
        Academy,
        startyear,
        endyear,
        percentage
    }

            // Get existing data from hidden input or initialize empty array
            const hiddenInput = document.getElementById('education');
            let educations = hiddenInput.value ? JSON.parse(hiddenInput.value) : [];

            // Add new experience to array
            educations.push(edu);

            // Update hidden input with JSON string
            hiddenInput.value = JSON.stringify(educations);

            // Generate output for display
            const output = educations.map((exp, index) => `
            <br>
                <h3>Education ${index + 1}</h3>
                <br>
                <p><strong>Acedamy:</strong> ${exp.Academy}</p>
                <p><strong>Percentage:</strong> ${exp.percentage}</p>
                <p><strong>From:</strong> ${exp.startyear}</p>
                <p><strong>Till:</strong> ${exp.endyear}</p>
            `).join('');

            document.getElementById('Education-output').innerHTML = output;

            // Reset form inputs (except hidden field)
            document.getElementById('Academy').value = '';
            document.getElementById('percentage').value = '';
            document.getElementById('startyear').value = '';
            document.getElementById('endyear').value = '';

console.log(hiddenInput);
console.log(educations);

});