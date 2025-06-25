document.getElementById("RetrivedData").addEventListener("submit", async function (event) {
    event.preventDefault();

    const query = document.getElementById("query").value.trim();
    if (!query) {
        alert("Please enter a query before submitting.");
        return;
    }

    try {
        const response = await fetch("http://10.224.1.107:8005/response_from_vb", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query }),
            keepalive: true
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response from FastAPI:", data);
        console.log("Response of RAG system: ",data.answer)
        // alert(`Success: ${data.message}\nQuery: ${data.query}`);

        let htmloutput = marked.parse(data.answer);

        document.getElementById("Result").innerHTML = htmloutput

    } catch (error) {
        console.error("Error:", error);
        alert(`An error occurred: ${error.message}`);
    }
});
















// document.getElementById("RetrivedData").addEventListener("submit", async function (event) {

//     event.preventDefault();

//     const query = document.getElementById("query").value;
//     console.log(query)

//     try{
//         const response = await fetch("http://10.224.1.107:8005/response_from_vb",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"applicaion/json"
//             },
//             body: JSON.stringify({query }),
//             keepalive: true
//         });

//         console.log("Response from fastapi: ",response);

//         if (!response.ok){
//             throw new  Error(`HTTP error! Status: ${response.status}`);

//         }

//         const data = await response.json(); // Parse the JSON response
//         console.log("Data received: ", data);

//     }catch (error){
//         console.error("Error: ", error);
//         alert("An error occurred while sending data to the FastAPI server");
//     }
    
    
// });