
const form = document.getElementById("input-container");
const form2 = document.getElementById("input-container2");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    let imgUrlInput = document.getElementById("imgUrlInput").value;
    let jsonInput = JSON.stringify({imgUrlInput});

    // console.log(JSON.stringify({imgUrlInput}));
    
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



form2.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    let imgUrlInput = document.getElementById("submitUrltoscrape").value;
    let jsonInput = JSON.stringify({imgUrlInput});

    // console.log(JSON.stringify({imgUrlInput}));
    
    const response = await fetch("/submitUrltoscrape",{
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

