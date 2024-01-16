
const form = document.getElementById("input-container");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  

    var imgUrlInput = document.getElementById("imgUrlInput").value;

    console.log(JSON.stringify({imgUrlInput}));
    
    const response = await fetch("/submitUrl",{
        method:"POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({imgUrlInput}),
    });
    if (response.ok) {
        const result = await response.json();
        console.log(result);
    };

    console.log("imgUrlInput: " + imgUrlInput);
});