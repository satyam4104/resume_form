
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
        alert("Data sent successfully!");

    } catch (error) {
        console.error("Error: ", error);
        alert("An error occurred while sending data to the FastAPI server.");
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

         console.log("Response: ", response);
         

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response from server: ", result);
        console.log("Response from ollama: ", result.ollama_response.response);
        document.getElementById("Summary").textContent = result.ollama_response.response 
        alert("Data sent successfully!");
        

        } catch (error) {
            console.error("Error: ", error);
            alert("An error occurred while sending data to the FastAPI server.");
        }
    }





 handleFormSubmit()