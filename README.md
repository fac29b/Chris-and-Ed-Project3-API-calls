# ApImg - API-Driven Image Application

**Contributors: Chris and Ed**

This versatile Node.js and Express.js-based application harnesses the power of various APIs to offer a range of image-related functionalities.

### Live demo:

[ApImg](http://16.170.245.48:3000/)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

1. **Image Description using OpenAI Vision API and Text-to-Speech**

   - Accepts a picture URL as input.
   - Utilizes OpenAI Vision API for image description.
   - Option to receive description only or both description and audio (using OpenAI Text-to-Speech).

2. **Website Image Scraping and Description**

   - Takes a website URL as input.
   - Scrapes images and displays them in cards.
   - Offers the option to get the image description and audio using OpenAI APIs.

3. **Google Image API Search**
   - Enables image search using Google Image API.
   - Organizes the results in cards.
   - Provides options to get image descriptions and audio using OpenAI APIs.

## Getting Started

### Prerequisites

- Node.js
- Express.js
- OpenAI Vision API
- OpenAI Text-to-Speech API
- Unsplash API
- Google Image API
- Amazon Web Services (AWS) with EC2 instance
- File system for audio.mp3 storage on the server

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/fac29b/Chris-and-Ed-Project3-API-calls.git
   ```

2. Install dependencies.

   ```bash
   cd Chris-and-Ed-Project3-API-calls
   npm install
   ```

3. Set up environment variables.
   - Create a `.env` file with your API keys and configuration details.

### Usage:

#### 1. Image Description with Text-to-Speech:

- Accepts a picture URL and uses OpenAI Vision API to generate a description.
- Provides options to retrieve either the description or both the description and an audio representation using OpenAI Text-to-Speech.

#### 2. Website Image Scraping and Description:

- Takes a website URL as input and scrapes images.
- Presents images in user-friendly cards.
- Allows users to obtain image descriptions and audio using OpenAI APIs.

#### 3. Google Image API Search:

- Employs the Google Image API to enable image searches.
- Organizes search results in cards.
- Facilitates the retrieval of image descriptions and audio through OpenAI APIs.

## Additional features

Additionally, the application features a dynamic header image generated via the Unsplash API, ensuring a visually engaging and ever-changing experience. Accessibility is prioritized, with detailed descriptions for header images and text manipulation for optimal readability.

The project leverages Amazon Web Services (AWS) with an EC2 instance for web hosting, utilizing the file system to store audio files locally on the server.

## Technologies Used

- Node.js
- Express.js
- OpenAI Vision API
- OpenAI Text-to-Speech API
- Unsplash API
- Google Image API
- Amazon Web Services (AWS) with EC2 instance
