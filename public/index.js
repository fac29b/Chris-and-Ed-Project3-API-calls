const form1 = document.getElementById("input-container");
const form2 = document.getElementById("input-container2");
const form3 = document.getElementById("search-input-container");

const header = document.getElementById("header-id");

// Form 1 Input url
form1.addEventListener("submit", async function (event) {
  event.preventDefault();

  let imgUrlInput = document.getElementById("imgUrlInput").value;
  let radioBtnOption = document.querySelector(
    "input[name='audioDescription']:checked"
  ).value;

  console.log("radioBtnOption: ", radioBtnOption);
  // Activate loading
  LoadingAnimation(0);
  const response = await fetch("/submitUrl", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imgUrlInput, radioBtnOption }),
  });
  if (response.ok) {
    const result = await response.json();
    // Deactivate loading
    LoadingAnimation(0);
    //
    ClearDescriptionAudio();
    if (!result.audioAndDescription) {
      AddImgDescription(result);
    } else {
      AddImgDescriptionAudio(result);
    }
  }
});

// Form 2
form2.addEventListener("submit", async function (event) {
  event.preventDefault();

  let imgUrlInput = document.getElementById("submitUrltoscrape").value;

  LoadingAnimation(1);

  const response = await fetch("/submitUrltoscrape", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imgUrlInput }),
  });

  if (response.ok) {

    const result = await response.json();
    LoadingAnimation(1);

    const imagesContainer = document.querySelector(".images-container-scrape");

    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }
    for (let i = 0; i < result.scrapedImgUrlArray.length; i++) {
      imagesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="image-card">
          <div class="image-container">
            <img
              class="searchImages"
              src="${
                result?.scrapedImgUrlArray[i] === undefined
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
                  : result.scrapedImgUrlArray[i]
              }"
              alt=""
            />
          </div>
          <div class="image-nav">
            <button onclick="">Get Description</button>
            <button onclick="">Get Description and Audio</button>
          </div>
          <div class="card-description-audio">
            <h3>Description:</h3>
            <p>
              This image shows a roller coaster ride in action, with a group of
              people on board.
            </p>
          </div>
        </div>
        `
      );
    }
    
    
    
    
    
    
    
    
  

  };
});

// Form 3
form3.addEventListener("submit", async function (event) {
  event.preventDefault();
  // Activate loading
  LoadingAnimation(2);
  //
  let searchInput = document.getElementById("search-input").value;

  const response = await fetch("/image-search", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ searchInput }),
  });

  if (response.ok) {
    const result = await response.json();
    // Deactivate loading
    LoadingAnimation(2);
    //
    const imagesContainer = document.querySelector(".images-container");
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }
    console.log(result.imgResultsArray);
    for (let i = 0; i < result.imgResultsArray.length; i++) {
      imagesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="image-card">
          <div class="image-container">
            <img
              class="searchImages"
              src="${
                result.imgResultsArray[i]?.pagemap?.cse_image?.[0]?.src
                  ? result.imgResultsArray[i].pagemap.cse_image[0].src
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
              }"
              alt=""
            />
          </div>
          <div class="image-nav">
            <button onclick="">Get Description</button>
            <button onclick="">Get Description and Audio</button>
          </div>
          <div class="card-description-audio">
            <h3>Description:</h3>
            <p>
              This image shows a roller coaster ride in action, with a group of
              people on board.
            </p>
          </div>
        </div>
        `
      );
    }
  }
});

// OnLoad run some functions
window.onload = () => {
  RetrieveHeaderBgImg();
};

// Retrieve a random image from unsplash api to display as header bg
async function RetrieveHeaderBgImg() {
  const response = await fetch("/retrieveBgImage", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    header.style.backgroundImage = `url(${data.imageUrl})`;
    header.setAttribute('aria-label', 'awaiting dynamically created aria-label...');
    console.log(data.imageUrl);
    const imgUrlInput = data.imageUrl;
    const response2 = await fetch("/submitUrl", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ imgUrlInput, "radioBtnOption":"description" }),
    });
    if (response2.ok) {
      const result = await response2.json();
      console.log(result.visionResult);
      header.setAttribute('aria-label', `${result.visionResult}`);
    };





  }
}

// Switches between options
function SwitchBetweenOptions(index) {
  const sections = document.querySelectorAll(".section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active");
  }
  sections[index].classList.add("active");
}

// Add image description
function AddImgDescription(result) {
  const descriptionContainer = document.getElementById("description-container");
  descriptionContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div>
      <h2>Description</h2>
      <p>${result.visionResult}</p>
    </div>
    `
  );
}

// Add image description and audio
function AddImgDescriptionAudio(result) {
  const audioContainer = document.getElementById("audio-container");
  audioContainer.insertAdjacentHTML(
    "beforeend",
    `
    <audio controls>
      <source src="${result.speechData[1]}.mp3" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
    `
  );
  AddImgDescription(result);
}

// Clear description and audio if different result received
function ClearDescriptionAudio() {
  const descriptionContainer = document.getElementById("description-container");
  const audioContainer = document.getElementById("audio-container");
  if (descriptionContainer.firstElementChild) {
    descriptionContainer.removeChild(descriptionContainer.firstElementChild);
  }
  if (audioContainer.firstElementChild) {
    audioContainer.removeChild(audioContainer.firstElementChild);
  }
}

// Loading animation activate or deactivate
function LoadingAnimation(index) {
  const loadingContainer = document.querySelectorAll(".loading-anim");
  if (
    loadingContainer[index].style.display === "none" ||
    loadingContainer[index].style.display === ""
  ) {
    loadingContainer[index].style.display = "block";
    console.log("Loading activate!");
  } else {
    loadingContainer[index].style.display = "none";
    console.log("Loading Deactivate!");
  }
}
