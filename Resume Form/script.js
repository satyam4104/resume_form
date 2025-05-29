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



