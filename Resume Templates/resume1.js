
    async function handleFormSubmit() {
   

    // Retrieve form data from localStorage
    const formdata = JSON.parse(localStorage.getItem('resumeFormData')) || {};


    const name = formdata.name;
    const email = formdata.email;
    const phone_no = formdata.phone_no;
    const address = formdata.address;
    const education = formdata.education;
    const skill = formdata.skill;
    const experience = formdata.experience;
    const project = formdata.project;

    // Update DOM elements
    document.getElementById('name').textContent = formdata.name || 'Full Name';
    document.getElementById('jobTitle').textContent = 'Job Title';
    document.getElementById('email').textContent = formdata.email || 'Email';
    document.getElementById('phone').textContent = formdata.phone_no || 'Phone Number';
    document.getElementById('location').textContent = formdata.address || 'Address';

    console.log("Sending data: ", JSON.stringify(formdata));
    console.log("sending data 2: ", formdata);

    try {
        const response = await fetch("http://10.224.1.107:8000/transfer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata),
            keepalive: true
        });
        

        console.log("Response: ",response);

        console.log("Response for json: ",response.json);


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response from server: ", result);
        alert("Data sent successfully! For data tranfer");

    } catch (error) {
        console.error("Error: ", error);
        alert("An error occurred while sending data to the FastAPI server. For data tranfer");
    }

    try {
         const response = await fetch("http://10.224.1.107:8000/summary", {
            method : "POST",
            headers : {
                "content-type": "application/json"
            },
            body:JSON.stringify(formdata),
            keepalive: true
         });

         console.log("Response for summary: ", response);
         

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response from server for summary: ", result);
        console.log("Response from ollama for summary: ", result.ollama_response.response);
        document.getElementById("Summary").textContent = result.ollama_response.response 
        alert("Data sent successfully! For summary");
        

        } catch (error) {
            console.error("Error: ", error);
            alert("An error occurred while sending data to the FastAPI server for summary.");
        }


        try {
            const response = await fetch("http://10.224.1.107:8000/work_experience",{
                method: "POST",
                headers : {
                "content-type": "application/json"
            },            
                body: JSON.stringify(formdata),
                keepalive: true
            });

            console.log("Responce for work experience: ", response)

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);

            }

            const result = await response.json();
            console.log("Response from server for work experience: ", result);
            console.log("Response from ollama for work experience: ", result.ollama_response.response);
            document.getElementById("work").textContent = result.ollama_response.response 
            alert("Data sent successfully! For work experience");
            

            } catch (error) {
                console.error("Error: ", error);
                alert("An error occurred while sending data to the FastAPI server for work experience.");
            }



            
        try {
            const response = await fetch("http://10.224.1.107:8000/education",{
                method: "POST",
                headers : {
                "content-type": "application/json"
            },                 
                body: JSON.stringify(formdata),
                keepalive: true
            });

            console.log("Responce for education: ", response)

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);

            }

            const result = await response.json();
            console.log("Response from server for education: ", result);
            console.log("Response from ollama for education: ", result.ollama_response.response);
            document.getElementById("education").textContent = result.ollama_response.response 
            alert("Data sent successfully! For education");
            

            } catch (error) {
                console.error("Error: ", error);
                alert("An error occurred while sending data to the FastAPI server for education.");
            }

            
        try {
            const response = await fetch("http://10.224.1.107:8000/skill_project",{
                method: "POST",
                headers : {
                "content-type": "application/json"
            },                 
                body: JSON.stringify(formdata),
                keepalive: true
            });

            console.log("Responce for Skill and projects: ", response)

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);

            }

            const result = await response.json();
            console.log("Response from server for Skill and projects: ", result);
            console.log("Response from ollama for Skill and projects: ", result.ollama_response.response);
            document.getElementById("skill").textContent = result.ollama_response.response 
            alert("Data sent successfully! For Skill and projects");
            

            } catch (error) {
                console.error("Error: ", error);
                alert("An error occurred while sending data to the FastAPI server for Skill and projects.");
            }
        
    }





 handleFormSubmit()