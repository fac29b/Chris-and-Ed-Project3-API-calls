const form1 = document.getElementById("input-container");
const form2 = document.getElementById("input-container2");
const form3 = document.getElementById("search-input-container");

const header = document.getElementById("header-id");

// Form 1 Input url
form1.addEventListener("submit", async function (event) {
  event.preventDefault();

  let imgUrlInput = document.getElementById("imgUrlInput").value;

  const response = await fetch("/submitUrl", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imgUrlInput }),
  });
  if (response.ok) {
    const result = await response.json();
    const audioContainer = document.getElementById("audio-container");
    if (audioContainer.firstElementChild) {
      audioContainer.removeChild(audioContainer.firstElementChild);
    }
    audioContainer.insertAdjacentHTML(
      "beforeend",
      `
      <audio controls>
        <source src="${result.speechData[1]}.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      `
    );
    console.log(result);
  }
  console.log("imgUrlInput: " + imgUrlInput);
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
    console.log(result);
  }
});

// Form 3
form3.addEventListener("submit", async function (event) {
  event.preventDefault();

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
    const imagesContainer = document.querySelector(".images-container");
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }
    console.log(result.imgResultsArray);
    for (let i = 0; i < result.imgResultsArray.length; i++) {
      imagesContainer.insertAdjacentHTML(
        "beforeend", // Use a specific string for the position argument
        `
            <img class="searchImages"
              src="${
                result.imgResultsArray[i].pagemap.cse_image[0].src === undefined
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"
                  : result.imgResultsArray[i].pagemap.cse_image[0].src
              }"
              alt=""
            />
        `
      );
    }
    console.log(result.imgResultsArray);
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

// Switches between options
function SwitchBetweenOptions(index) {
  const sections = document.querySelectorAll(".section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active");
  }
  sections[index].classList.add("active");
}
