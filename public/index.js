const form1 = document.getElementById("input-container");
const form2 = document.getElementById("input-container2");
const form3 = document.getElementById("search-input-container");

const header = document.getElementById("header-id");

// Form 1 Input url
form1.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log("Event: ", event);

  let imgUrlInput = document.getElementById("imgUrlInput").value;
  let radioBtnOption = document.querySelector(
    "input[name='audioDescription']:checked"
  ).value;

  console.log("radioBtnOption: ", radioBtnOption);
  // Activate loading
  LoadingAnimation("01");
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
    LoadingAnimation("01");
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

  const response = await fetch("/submitUrltoscrape", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imgUrlInput }),
  });

  if (response.ok) {
    const result = await response.json();

    const imagesContainer = document.querySelector(".images-container");

    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }
    for (let i = 0; i < result.scrapedImgUrlArray.length; i++) {
      imagesContainer.insertAdjacentHTML(
        "beforeend", // Use a specific string for the position argument
        `
            <img class="searchImages"
              src="${
                result.scrapedImgUrlArray[i] === undefined
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
                  : result.scrapedImgUrlArray[i]
              }"
              alt=""
            />
        `
      );
    }
  }
});

// Form 3
form3.addEventListener("submit", async function (event) {
  event.preventDefault();
  // Activate loading
  LoadingAnimation("03");
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
    LoadingAnimation("03");
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
              id="imgSrc${i}"
              class="searchImages"
              src="${
                result.imgResultsArray[i]?.pagemap?.cse_image?.[0]?.src
                  ? result.imgResultsArray[i].pagemap.cse_image[0].src
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
              }"
              alt=""
            />
          </div>
          <div class="image-nav" id="imgNav${i}">
            <button onclick="RetrieveImageDescription(${i}, 'gleImg${i}')">Get Description</button>
            <button onclick="RetrieveImgDescriptionAndAudio(${i}, 'gleImg${i}')">Get Description and Audio</button>
          </div>
          <div class="loading-anim" id="loading-anim-gleImg${i}">
            <img src="./images/loading01.webp" alt="Loading image" />
          </div>
          <div class="card-description-audio">
            <h3>Description:</h3>
            <p id="decription${i}">
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
    console.log(data);
  }
}

// Retrieve google search image description
async function RetrieveImageDescription(descriptionId, specialIdIndex) {
  // Loading animation
  LoadingAnimation(specialIdIndex.toString());
  const imageUrl = document.getElementById(`imgSrc${descriptionId}`).src;
  console.log(imageUrl);
  const response = await fetch("/getImageDescription", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imageUrl: imageUrl, descripId: descriptionId }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    // Loading animation
    LoadingAnimation(specialIdIndex.toString());
    // Change active buttons
    const navButtons = document.getElementById(`imgNav${descriptionId}`);
    while (navButtons.firstElementChild) {
      navButtons.removeChild(navButtons.firstElementChild);
    }
    navButtons.insertAdjacentHTML(
      "beforeend",
      `
      <button onclick="RetrieveImageAudio(${descriptionId}, '${data.description.replace(
        /("|')/g,
        "-"
      )}', '${specialIdIndex}')">Get Audio</button>
      `
    );
    // Set description to display: block
    const descriptionToActivate = document.querySelectorAll(
      ".card-description-audio"
    );
    descriptionToActivate[data.descriptionId].style.display = "block";
    // Input description text between <p>description</p> element
    const descriptionElement = document.getElementById(
      `decription${data.descriptionId}`
    );
    descriptionElement.textContent = data.description;
  }
}

async function RetrieveImageAudio(descriptionId, description, specialIdIndex) {
  // Loading animation
  LoadingAnimation(specialIdIndex.toString());
  const response = await fetch("/getImageAudio", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      descriptionId: descriptionId,
      description: description,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    // Loading animation
    LoadingAnimation(specialIdIndex.toString());
    // Remove get audio button
    const navButtons = document.getElementById(`imgNav${descriptionId}`);
    while (navButtons.firstElementChild) {
      navButtons.removeChild(navButtons.firstElementChild);
    }
    // Insert audio html
    const descriptionToActivate = document.querySelectorAll(
      ".card-description-audio"
    );
    descriptionToActivate[data.descriptionId].insertAdjacentHTML(
      "beforeend",
      `
      <audio controls>
        <source src="${data.speechData[1]}.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      `
    );
    console.log(data);
  }
}

// Retrieve google search image Description and Audio
async function RetrieveImgDescriptionAndAudio(descriptionId, specialIdIndex) {
  // Loading animation
  LoadingAnimation(specialIdIndex.toString());
  const imageUrl = document.getElementById(`imgSrc${descriptionId}`).src;
  console.log(imageUrl);
  const response = await fetch("/getImgDescriptionAndAudio", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imageUrl: imageUrl, descripId: descriptionId }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    // Loading animation
    LoadingAnimation(specialIdIndex.toString());
    // Set description to display: block
    const descriptionToActivate = document.querySelectorAll(
      ".card-description-audio"
    );
    descriptionToActivate[data.descriptionId].style.display = "block";
    // Input description text between <p>description</p> element
    const descriptionElement = document.getElementById(
      `decription${data.descriptionId}`
    );
    descriptionElement.textContent = data.description;
    // Insert audio html
    descriptionToActivate[data.descriptionId].insertAdjacentHTML(
      "beforeend",
      `
      <audio controls>
        <source src="${data.speechData[1]}.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      `
    );
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
function LoadingAnimation(specialIndex) {
  const loadingContainer = document.getElementById(
    `loading-anim-${specialIndex}`
  );
  if (
    loadingContainer.style.display === "none" ||
    loadingContainer.style.display === ""
  ) {
    loadingContainer.style.display = "block";
  } else {
    loadingContainer.style.display = "none";
  }
}
