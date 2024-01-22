const axios = require('axios');
const { JSDOM } = require('jsdom');

async function scrapeImages(url) {
  try {
    // Fetch HTML content of the website
    const response = await axios.get(url);
    const html = response.data;

    // Parse HTML using jsdom
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract image elements
    const imageElements = document.querySelectorAll('img');

    // Extract image URLs
    const imageUrls = Array.from(imageElements).map(img => img.src);

    return imageUrls;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
const websiteUrl = 'https://www.christimms.org';
scrapeImages(websiteUrl)
  .then(imageUrls => {
    console.log('Scraped Image URLs:', imageUrls);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });











// const HTMLSTRING = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="stylesheet" type="text/css" href="main.css" />
//     <link rel="stylesheet" type="text/css" href="menu.css" />
//     <link rel="preconnect" href="https://fonts.googleapis.com" />
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
//     <link
//       href="https://fonts.googleapis.com/css2?family=Public+Sans&family=Staatliches&display=swap"
//       rel="stylesheet"
//     />
//     <link
//       rel="stylesheet"
//       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
//     />
//     <title>Personalised Games</title>
//   </head>

//   <body>
//     <header>


//       <div class="motion-tog">

//         <label class="switch" role="motion reduction">
//           <input type="checkbox" id="motionToggle" checked="true" tabindex="0">
//           <span class="slider round"></span>
//         </label>
        
//       </div>
//       <div class="skew-motion"></div>

//       <nav>
//       <button role="navigation menu"
//         id="mainMenu-btn"
//         class="menuCSS"
//         aria-label="Menu"
//       >
//         <span></span> 
//         <span></span>
//         <span></span>
//       </button>
//       <div class="bgcircle"></div>
   

//       <div id="mainMenu" class="menu hide">
//         <ul>
//           <li class="menu-item"><a href="#tab1">Intro</a></li>
//           <li class="menu-item"><a href="#tab2">Who We Game With</a></li>
//           <li class="menu-item"><a href="#tab3">Meet the Team</a></li>
//           <li class="menu-item"><a href="#tab4">Subscriptions</a></li>
//           <li class="menu-item"><a href="#tab5">Contact</a></li>
          
          
//         </ul>
//       </div>
//       </nav>
//     </header>

//     <!-- Each page is a section below, with the menu changing class from "display:none" to "display:visible"-->
//     <!-- swap the class 'hide' with 'show' in any tab you want to work with -->

//     <section id="tab1" class="section show stack-xl display-column">
//       <div class="hero">
        
//         <!-- <video id="video"
//           class="hero-img"
//           src="./img/intro/abstract.mp4"
//           autoplay
//           loop
//           muted
//           plays-inline
//         ></video> -->


//         <video id="video"
//           class="hero-img"
//           autoplay
//           loop
//           muted
//           plays-inline
//         >
//         <source src="./img/intro/abstract.mp4" type="video/mp4">
//       </video>


//         <div class="center width-xxl">
//         <h1 class="alt-h1 hide">PERSONLISED GAMES.</h1>
//         <h1 class="alt-h1 hide">CUSTOM MADE FOR YOU.</h1>   

//           <div class="intro-text-wrapper">
//             <svg
//               id="intro-text"
//               width="1171"
//               height="325"
//               viewBox="0 0 1171 325"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M464.053 315.1H463.553V315.6V323.2V323.7H464.053H700.955H701.455V323.2V315.6V315.1H700.955H464.053ZM465.953 317.5H699.055V321.3H465.953V317.5Z"
//                 stroke="white"
//               />
//               <path
//                 d="M692.578 303.59L692.572 303.596L692.566 303.602C691.701 304.525 690.649 304.98 689.379 304.98C688.111 304.98 687.022 304.525 686.09 303.596C685.225 302.671 684.791 301.549 684.791 300.2C684.791 298.781 685.229 297.668 686.079 296.815C687.009 295.946 688.1 295.516 689.379 295.516C690.66 295.516 691.715 295.947 692.578 296.81L692.583 296.815L692.589 296.821C693.502 297.677 693.967 298.788 693.967 300.2C693.967 301.542 693.506 302.662 692.578 303.59ZM684.387 305.287L684.388 305.287C685.757 306.656 687.451 307.38 689.379 307.38C691.3 307.38 692.978 306.66 694.295 305.267C695.669 303.883 696.367 302.157 696.367 300.2C696.367 298.204 695.683 296.443 694.253 295.09C692.925 293.774 691.259 293.116 689.379 293.116C687.49 293.116 685.809 293.779 684.432 295.07L684.416 295.085L684.41 295.091L684.404 295.096L684.388 295.112C683.023 296.477 682.391 298.232 682.391 300.2C682.391 302.129 683.037 303.849 684.345 305.243C684.345 305.243 684.345 305.243 684.345 305.243L684.36 305.26L684.366 305.266L684.371 305.271L684.387 305.287Z"
//                 stroke="white"
//               />
//               <path
//                 d="M661.838 297.83L661.836 297.833C657.087 302.644 650.508 305.076 642.032 305.076C633.556 305.076 626.943 302.644 622.129 297.83C617.326 293.028 614.884 285.88 614.884 276.296V238.3H620.988V276.008C620.988 284.007 622.792 290.013 626.501 293.92C630.202 297.82 635.404 299.74 642.032 299.74C648.722 299.74 653.956 297.821 657.658 293.92C661.367 290.013 663.172 284.007 663.172 276.008V238.3H669.084V276.296C669.084 285.88 666.641 293.028 661.838 297.83ZM671.484 236.4V235.9H670.984H661.272H660.772V236.4V276.008C660.772 283.706 659.027 288.991 655.918 292.268C652.782 295.571 648.249 297.34 642.032 297.34C635.884 297.34 631.38 295.575 628.242 292.268C625.132 288.991 623.388 283.706 623.388 276.008V236.4V235.9H622.888H612.984H612.484V236.4V276.296C612.484 286.265 615.028 294.124 620.432 299.528C625.795 304.891 633.075 307.476 642.032 307.476C650.985 307.476 658.238 304.892 663.54 299.522C668.94 294.119 671.484 286.262 671.484 276.296V236.4Z"
//                 stroke="white"
//               />
              
//               <path
//                 d="M466.441 238.3H472.853L495.746 275.755L496.173 276.452L496.6 275.755L519.493 238.3H525.425L499.01 281.525L498.937 281.645V281.785V304.5H492.929V281.786V281.645L492.856 281.525L466.441 238.3ZM518.001 236.139L496.173 271.851L474.345 236.139L474.198 235.9H473.918H463.053H462.161L462.626 236.661L490.529 282.32V306.4V306.9H491.029H500.837H501.337V306.4V282.32L529.24 236.661L529.705 235.9H528.813H518.428H518.148L518.001 236.139Z"
//                 stroke="white"
//               />
//               <path
//                 d="M1061.14 165.894L1077.69 189.11L1078.25 189.9H1077.28H1066.06H1065.8L1065.65 189.689L1050.56 168.393C1049.11 168.523 1047.6 168.588 1046.05 168.588H1029.9V189.4V189.9H1029.4H1019.5H1019V189.4V119.4V118.9H1019.5H1046.05C1051.94 118.9 1057.11 119.859 1061.51 121.849C1065.91 123.775 1069.35 126.63 1071.74 130.427C1074.22 134.182 1075.41 138.686 1075.41 143.84C1075.41 148.886 1074.21 153.353 1071.74 157.16C1069.34 160.893 1065.91 163.742 1061.52 165.73L1061.14 165.894ZM1061.14 165.894C1061.26 165.844 1061.38 165.793 1061.5 165.741L1061.51 165.737L1061.51 165.738L1061.51 165.734L1061.52 165.731L1061.14 165.894ZM1028 166.188H1027.5V166.688V187.5H1021.4V121.3H1046.05C1051.69 121.3 1056.51 122.22 1060.53 124.039L1060.53 124.039L1060.54 124.042C1064.55 125.798 1067.6 128.359 1069.72 131.722L1069.72 131.722L1069.73 131.732C1071.9 135.027 1073.01 139.054 1073.01 143.84C1073.01 148.494 1071.91 152.493 1069.73 155.856L1069.72 155.858C1067.61 159.159 1064.55 161.722 1060.53 163.543C1060.15 163.712 1059.75 163.873 1059.35 164.026L1059.35 164.026C1058.91 164.194 1058.46 164.353 1058 164.501L1057.35 164.711L1057.75 165.267L1073.59 187.5H1067.04L1051.88 166.101L1051.71 165.86L1051.41 165.893C1050.89 165.954 1050.36 166.005 1049.83 166.046C1048.61 166.141 1047.35 166.188 1046.05 166.188H1028ZM1028 126.444H1027.5V126.944V160.64V161.14H1028H1045.86C1052.64 161.14 1057.86 159.656 1061.44 156.606C1065.09 153.552 1066.9 149.273 1066.9 143.84C1066.9 138.345 1065.1 134.034 1061.44 130.978C1057.86 127.928 1052.64 126.444 1045.86 126.444H1028ZM1045.86 158.74H1029.9V128.844H1045.86C1052.34 128.844 1056.91 130.268 1059.89 132.806L1059.89 132.808L1059.9 132.816L1059.9 132.817C1062.91 135.337 1064.5 138.92 1064.5 143.84C1064.5 148.688 1062.92 152.242 1059.9 154.766L1059.9 154.769L1059.89 154.778L1059.89 154.778C1056.91 157.316 1052.34 158.74 1045.86 158.74Z"
//                 stroke="white"
//               />
              
//               <path
//                 d="M887.564 153.844H921.816V158.988H887.564H887.064V159.488V187.5H880.96V121.3H926.04V126.444H887.564H887.064V126.944V153.344V153.844H887.564ZM889.464 189.4V161.388H923.716H924.216V160.888V151.944V151.444H923.716H889.464V128.844H927.94H928.44V128.344V119.4V118.9H927.94H879.06H878.56V119.4V189.4V189.9H879.06H888.964H889.464V189.4Z"
//                 stroke="white"
//               />
//               <path
//                 d="M797.72 181.856V182.356H798.22H838.136V187.5H791.616V121.3H836.696V126.444H798.22H797.72V126.944V150.848V151.348H798.22H832.472V156.396H798.22H797.72V156.896V181.856ZM840.036 179.956H800.12V158.796H834.372H834.872V158.296V149.448V148.948H834.372H800.12V128.844H838.596H839.096V128.344V119.4V118.9H838.596H789.716H789.216V119.4V189.4V189.9H789.716H840.036H840.536V189.4V180.456V179.956H840.036Z"
//                 stroke="white"
//               />
//               <path
//                 d="M753.356 132.181L753.356 132.18L753.345 132.175L753.337 132.171L753.337 132.17L753.327 132.165L753.356 132.181ZM753.356 132.181C757.474 134.329 760.63 137.288 762.874 141.066C765.108 144.829 766.255 149.252 766.255 154.4C766.255 159.477 765.111 163.905 762.87 167.74C760.625 171.518 757.467 174.51 753.345 176.722M753.356 132.181L753.345 176.722M753.345 176.722C749.319 178.853 744.485 179.956 738.779 179.956H720.807V128.844H738.779C744.477 128.844 749.304 129.976 753.327 132.165L753.345 176.722ZM757.743 125.561L757.743 125.561L757.749 125.564C763.11 128.339 767.263 132.211 770.222 137.184C773.178 142.153 774.663 147.887 774.663 154.4C774.663 160.913 773.178 166.647 770.222 171.616C767.263 176.589 763.109 180.495 757.746 183.334C752.454 186.106 746.265 187.5 739.163 187.5H712.303V121.3H739.163C746.263 121.3 752.452 122.726 757.743 125.561ZM718.407 181.856V182.356H718.907H738.779C744.796 182.356 750.032 181.191 754.469 178.842L754.472 178.841C758.963 176.432 762.456 173.138 764.937 168.959L764.939 168.956C767.421 164.711 768.655 159.854 768.655 154.4C768.655 148.883 767.421 144.024 764.937 139.841C762.456 135.662 758.963 132.4 754.47 130.055C750.033 127.641 744.796 126.444 738.779 126.444H718.907H718.407V126.944V181.856ZM709.903 189.4V189.9H710.403H739.163C746.583 189.9 753.168 188.441 758.861 185.459L758.862 185.458L758.868 185.455L758.868 185.455C764.602 182.42 769.089 178.213 772.284 172.843C775.487 167.459 777.063 161.292 777.063 154.4C777.063 147.508 775.487 141.341 772.284 135.957C769.089 130.586 764.6 126.41 758.864 123.439C753.171 120.391 746.584 118.9 739.163 118.9H710.403H709.903V119.4V189.4Z"
//                 stroke="white"
//               />
//               <path
//                 d="M647.664 169.548H647.34L647.208 169.844L639.307 187.5H633.017L663.28 121.3H669.646L699.909 187.5H693.523L685.622 169.844L685.49 169.548H685.166H647.664ZM649.785 164.084L649.47 164.788H650.242H682.588H683.36L683.044 164.084L666.871 127.942L666.415 126.922L665.959 127.942L649.785 164.084ZM691.835 189.604L691.968 189.9H692.292H702.866H703.645L703.321 189.192L671.321 119.192L671.187 118.9H670.866H662.06H661.738L661.605 119.192L629.605 189.192L629.281 189.9H630.06H640.538H640.862L640.995 189.604L648.896 171.948H683.934L691.835 189.604ZM679.656 162.388H653.174L666.415 132.798L679.656 162.388Z"
//                 stroke="white"
//               />
//               <path
//                 d="M615.527 121.3H620.595V187.5H614.779V134.251V132.403L613.848 133.998L587.592 178.956H584.805L558.55 134.305L557.619 132.721V134.558V187.5H551.803V121.3H556.873L585.905 170.836L586.338 171.575L586.768 170.834L615.527 121.3ZM586.328 166.812L558.393 119.147L558.248 118.9H557.962H549.903H549.403V119.4V189.4V189.9H549.903H559.519H560.019V189.4V141.538L583.287 181.109L583.432 181.356H583.718H588.683H588.97L589.115 181.108L612.379 141.271V189.4V189.9H612.879H622.495H622.995V189.4V119.4V118.9H622.495H614.433H614.145L614.001 119.149L586.328 166.812Z"
//                 stroke="white"
//               />
//               <path
//                 d="M498.715 121.3H503.783V187.5H497.967V134.251V132.403L497.035 133.998L470.78 178.956H467.993L441.738 134.305L440.807 132.721V134.558V187.5H434.991V121.3H440.06L469.092 170.836L469.526 171.575L469.956 170.834L498.715 121.3ZM469.516 166.812L441.58 119.147L441.436 118.9H441.149H433.091H432.591V119.4V189.4V189.9H433.091H442.707H443.207V189.4V141.538L466.475 181.109L466.62 181.356H466.906H471.87H472.158L472.302 181.108L495.567 141.271V189.4V189.9H496.067H505.683H506.183V189.4V119.4V118.9H505.683H497.621H497.333L497.188 119.149L469.516 166.812Z"
//                 stroke="white"
//               />
//               <mask
//                 id="path-14-outside-1_0_1"
//                 maskUnits="userSpaceOnUse"
//                 x="347.008"
//                 y="117.824"
//                 width="74"
//                 height="72"
//                 fill="black"
//               >
//                 <rect
//                   fill="white"
//                   x="347.008"
//                   y="117.824"
//                   width="74"
//                   height="72"
//                 />
               
//               </mask>
              
//               <path
//                 d="M319.432 187.5H313.328V126.944V126.444H312.828H289.712V121.3H343.048V126.444H319.932H319.432V126.944V187.5ZM310.928 128.844V189.4V189.9H311.428H321.332H321.832V189.4V128.844H344.948H345.448V128.344V119.4V118.9H344.948H287.812H287.312V119.4V128.344V128.844H287.812H310.928Z"
//                 stroke="white"
//               />
              
//               <path
//                 d="M212.494 180.83L212.492 180.833C207.743 185.644 201.164 188.076 192.688 188.076C184.212 188.076 177.599 185.644 172.785 180.83C167.983 176.028 165.54 168.88 165.54 159.296V121.3H171.644V159.008C171.644 167.007 173.448 173.013 177.157 176.92C180.858 180.82 186.06 182.74 192.688 182.74C199.378 182.74 204.612 180.821 208.315 176.92C212.023 173.013 213.828 167.007 213.828 159.008V121.3H219.74V159.296C219.74 168.88 217.297 176.028 212.494 180.83ZM163.64 118.9H163.14V119.4V159.296C163.14 169.265 165.685 177.124 171.088 182.528C176.451 187.891 183.731 190.476 192.688 190.476C201.641 190.476 208.893 187.892 214.195 182.523C219.596 177.12 222.14 169.263 222.14 159.296V119.4V118.9H221.64H211.928H211.428V119.4V159.008C211.428 166.706 209.684 171.991 206.574 175.268C203.439 178.571 198.906 180.34 192.688 180.34C186.54 180.34 182.037 178.575 178.898 175.268C175.788 171.991 174.044 166.706 174.044 159.008V119.4V118.9H173.544H163.64Z"
//                 stroke="white"
//               />
              
//               <path
//                 d="M1166.3 69.5905L1166.29 69.5961L1166.29 69.602C1165.42 70.5249 1164.37 70.98 1163.1 70.98C1161.83 70.98 1160.74 70.5255 1159.81 69.5962C1158.94 68.6708 1158.51 67.5489 1158.51 66.2C1158.51 64.7808 1158.95 63.6681 1159.8 62.8152C1160.73 61.9461 1161.82 61.516 1163.1 61.516C1164.38 61.516 1165.43 61.9471 1166.3 62.8096L1166.3 62.8153L1166.31 62.8208C1167.22 63.6768 1167.69 64.7877 1167.69 66.2C1167.69 67.5418 1167.22 68.6619 1166.3 69.5905ZM1158.08 71.2608L1158.09 71.2664L1158.09 71.2718L1158.11 71.2875C1158.11 71.2876 1158.11 71.2876 1158.11 71.2877C1158.11 71.2877 1158.11 71.2877 1158.11 71.2878C1159.48 72.6565 1161.17 73.38 1163.1 73.38C1165.02 73.38 1166.7 72.6592 1168.02 71.264C1169.39 69.8809 1170.09 68.1553 1170.09 66.2C1170.09 64.2038 1169.4 62.4423 1167.97 61.0893C1166.64 59.7738 1164.98 59.116 1163.1 59.116C1161.21 59.116 1159.53 59.7786 1158.15 61.0698C1158.15 61.0698 1158.15 61.0698 1158.15 61.0699L1158.13 61.0852L1158.13 61.0913L1158.12 61.0976L1158.11 61.113C1156.74 62.4774 1156.11 64.2327 1156.11 66.2C1156.11 68.1287 1156.76 69.8488 1158.06 71.2435L1158.06 71.2443L1158.08 71.2608Z"
//                 stroke="white"
//               />
             
//               <path
//                 d="M1045.31 33.848V34.348H1045.81H1080.07V39.396H1045.81H1045.31V39.896V64.856V65.356H1045.81H1085.73V70.5H1039.21V4.29999H1084.29V9.44399H1045.81H1045.31V9.94399V33.848ZM1081.97 31.948H1047.71V11.844H1086.19H1086.69V11.344V2.39999V1.89999H1086.19H1037.31H1036.81V2.39999V72.4V72.9H1037.31H1087.63H1088.13V72.4V63.456V62.956H1087.63H1047.71V41.796H1081.97H1082.47V41.296V32.448V31.948H1081.97Z"
//                 stroke="white"
//               />
//               <path
//                 d="M945.122 72.4V72.9H945.622H955.238H955.738V72.4V24.5377L979.006 64.1094L979.151 64.356H979.437H984.402H984.689L984.833 64.1082L1008.1 24.2716V72.4V72.9H1008.6H1018.21H1018.71V72.4V2.39999V1.89999H1018.21H1010.15H1009.86L1009.72 2.14895L982.047 49.812L954.112 2.14717L953.967 1.89999H953.68H945.622H945.122V2.39999V72.4ZM954.269 17.3047L953.338 15.7213V17.5581V70.5H947.522V4.29999H952.592L981.623 53.8357L982.057 54.5752L982.487 53.8339L1011.25 4.29999H1016.31V70.5H1010.5V17.2504V15.4028L1009.57 16.9983L983.311 61.956H980.524L954.269 17.3047Z"
//                 stroke="white"
//               />
//               <path
//                 d="M864.824 72.1921L864.5 72.9H865.278H875.757H876.081L876.213 72.6042L884.114 54.948H919.153L927.054 72.6042L927.186 72.9H927.51H938.085H938.863L938.54 72.1921L906.54 2.19211L906.406 1.89999H906.085H897.278H896.957L896.824 2.19211L864.824 72.1921ZM882.883 52.548H882.559L882.427 52.8438L874.526 70.5H868.236L898.499 4.29999H904.864L935.127 70.5H928.742L920.841 52.8438L920.708 52.548H920.384H882.883ZM902.09 10.9417L901.634 9.92185L901.177 10.9417L885.004 47.0838L884.689 47.788H885.461H917.807H918.578L918.263 47.0838L902.09 10.9417ZM888.392 45.388L901.634 15.7976L914.875 45.388H888.392Z"
//                 stroke="white"
//               />
             
//               <path
//                 d="M708.526 62.956H726.498C732.203 62.956 737.036 61.853 741.062 59.7224C745.185 57.5105 748.344 54.5182 750.589 50.74C752.83 46.9048 753.974 42.4765 753.974 37.4C753.974 32.252 752.826 27.8287 750.592 24.066C748.349 20.2879 745.193 17.3289 741.075 15.1805L741.075 15.1804L741.064 15.1748L741.056 15.1705L741.056 15.1705L741.046 15.1649L708.526 62.956ZM708.526 62.956V11.844H726.498C732.196 11.844 737.023 12.9762 741.045 15.1646L708.526 62.956ZM697.622 72.4V72.9H698.122H726.882C734.302 72.9 740.886 71.4413 746.58 68.4591L746.581 68.4583L746.587 68.4554L746.587 68.4552C752.32 65.4199 756.808 61.2134 760.003 55.8435C763.206 50.4593 764.782 44.2917 764.782 37.4C764.782 30.5083 763.206 24.3407 760.003 18.9565C756.808 13.5864 752.319 9.41041 746.583 6.43878C740.889 3.39132 734.303 1.89999 726.882 1.89999H698.122H697.622V2.39999V72.4ZM742.188 61.8419L742.19 61.8406C746.682 59.432 750.175 56.1377 752.656 51.9593L752.658 51.9564C755.14 47.7112 756.374 42.8542 756.374 37.4C756.374 31.8832 755.14 27.0244 752.656 22.8407C750.175 18.6623 746.682 15.3995 742.189 13.0547C737.751 10.6409 732.515 9.44399 726.498 9.44399H706.626H706.126V9.94399V64.856V65.356H706.626H726.498C732.515 65.356 737.75 64.1912 742.188 61.8419ZM745.462 8.56073L745.462 8.56078L745.468 8.56403C750.829 11.339 754.982 15.2113 757.94 20.1836C760.897 25.1533 762.382 30.8869 762.382 37.4C762.382 43.9131 760.897 49.6467 757.94 54.6164C754.982 59.5893 750.828 63.4943 745.465 66.3334C740.173 69.1055 733.984 70.5 726.882 70.5H700.022V4.29999H726.882C733.982 4.29999 740.17 5.72594 745.462 8.56073Z"
//                 stroke="white"
//               />
              
              
//               <path
//                 d="M545.372 72.4V72.9H545.872H555.776H556.276V72.4V2.39999V1.89999H555.776H545.872H545.372V2.39999V72.4ZM547.772 4.29999H553.876V70.5H547.772V4.29999Z"
//                 stroke="white"
//               />
//               <path
//                 d="M488.841 72.4V72.9H489.341H536.877H537.377V72.4V63.456V62.956H536.877H499.745V2.39999V1.89999H499.245H489.341H488.841V2.39999V72.4ZM497.345 64.856V65.356H497.845H534.977V70.5H491.241V4.29999H497.345V64.856Z"
//                 stroke="white"
//               />
//               <path
//                 d="M408.542 72.1921L408.219 72.9H408.997H419.476H419.8L419.932 72.6042L427.833 54.948H462.872L470.773 72.6042L470.905 72.9H471.229H481.804H482.582L482.258 72.1921L450.258 2.19211L450.125 1.89999H449.804H440.997H440.676L440.542 2.19211L408.542 72.1921ZM426.602 52.548H426.278L426.145 52.8438L418.244 70.5H411.955L442.217 4.29999H448.583L478.846 70.5H472.46L464.559 52.8438L464.427 52.548H464.103H426.602ZM445.809 10.9417L445.352 9.92185L444.896 10.9417L428.723 47.0838L428.408 47.788H429.179H461.525H462.297L461.982 47.0838L445.809 10.9417ZM432.111 45.388L445.352 15.7976L458.594 45.388H432.111Z"
//                 stroke="white"
//               />
//               <path
//                 d="M341.935 72.4V72.9H342.435H352.339H352.839V72.4V21.9622L393.07 72.7106L393.22 72.9H393.462H401.395H401.895V72.4V2.39999V1.89999H401.395H391.587H391.087V2.39999V52.8547L350.758 2.08898L350.608 1.89999H350.366H342.435H341.935V2.39999V72.4ZM351.33 16.1964L350.439 15.0715V16.507V70.5H344.335V4.29999H349.449L392.595 58.612L393.487 59.7342V58.301V4.29999H399.495V70.5H394.38L351.33 16.1964Z"
//                 stroke="white"
//               />
              
//               <mask
//                 id="path-33-outside-2_0_1"
//                 maskUnits="userSpaceOnUse"
//                 x="194.106"
//                 y="0.824005"
//                 width="57"
//                 height="74"
//                 fill="black"
//               >
//                 <rect
//                   fill="white"
//                   x="194.106"
//                   y="0.824005"
//                   width="57"
//                   height="74"
//                 />
              
//               </mask>
             
//               <path
//                 d="M132.966 72.4V72.9H133.466H143.37H143.87V72.4V51.588H160.018C161.573 51.588 163.077 51.5235 164.53 51.3931L179.622 72.6891L179.772 72.9H180.03H191.247H192.217L191.654 72.1098L175.11 48.8941C175.23 48.8437 175.349 48.7925 175.467 48.7407L175.468 48.7406L175.476 48.737L175.476 48.737L175.482 48.7344L175.49 48.7306C175.49 48.7306 175.49 48.7306 175.49 48.7306C179.878 46.7423 183.314 43.8919 185.71 40.1586C188.177 36.3513 189.374 31.8851 189.374 26.84C189.374 21.6858 188.185 17.1819 185.71 13.4259C183.315 9.62951 179.877 6.7747 175.479 4.84833C171.082 2.85854 165.91 1.89999 160.018 1.89999H133.466H132.966V2.39999V72.4ZM141.97 49.188H141.47V49.688V70.5H135.366V4.29999H160.018C165.661 4.29999 170.483 5.21953 174.499 7.03942L174.499 7.03946L174.505 7.04208C178.519 8.79791 181.573 11.3592 183.691 14.7224L183.691 14.7225L183.697 14.7315C185.873 18.0269 186.974 22.0544 186.974 26.84C186.974 31.4943 185.874 35.4926 183.694 38.856L183.693 38.858C181.576 42.1588 178.52 44.7223 174.502 46.5432C174.116 46.7123 173.722 46.8733 173.32 47.0263C172.879 47.1943 172.429 47.3527 171.97 47.5012L171.32 47.7113L171.716 48.2671L187.56 70.5H181.012L165.848 49.1011L165.677 48.8595L165.382 48.8935C164.862 48.9536 164.332 49.0046 163.795 49.0463C162.579 49.1407 161.32 49.188 160.018 49.188H141.97ZM141.97 9.44399H141.47V9.94399V43.64V44.14H141.97H159.826C166.608 44.14 171.831 42.6557 175.413 39.6059C179.063 36.5515 180.87 32.2731 180.87 26.84C180.87 21.345 179.065 17.0335 175.412 13.9779C171.831 10.9282 166.608 9.44399 159.826 9.44399H141.97ZM159.826 41.74H143.87V11.844H159.826C166.305 11.844 170.877 13.2676 173.858 15.8064L173.861 15.8092L173.871 15.8173L173.871 15.8174C176.883 18.337 178.47 21.9197 178.47 26.84C178.47 31.688 176.889 35.2424 173.871 37.7665L173.868 37.7693L173.858 37.7775L173.858 37.7776C170.877 40.3164 166.305 41.74 159.826 41.74Z"
//                 stroke="white"
//               />
//               <path
//                 d="M77.2511 33.848V34.348H77.7511H112.003V39.396H77.7511H77.2511V39.896V64.856V65.356H77.7511H117.667V70.5H71.1471V4.29999H116.227V9.44399H77.7511H77.2511V9.94399V33.848ZM113.903 31.948H79.6511V11.844H118.127H118.627V11.344V2.39999V1.89999H118.127H69.2471H68.7471V2.39999V72.4V72.9H69.2471H119.567H120.067V72.4V63.456V62.956H119.567H79.6511V41.796H113.903H114.403V41.296V32.448V31.948H113.903Z"
//                 stroke="white"
//               />
//               <path
//                 d="M0.77832 72.4V72.9H1.27832H11.1823H11.6823V72.4V51.684H27.8303C33.7271 51.684 38.9037 50.7238 43.3025 48.7306C47.6911 46.742 51.127 43.8913 53.5233 40.1573C55.9897 36.3503 57.1863 31.8845 57.1863 26.84C57.1863 21.686 55.9981 17.1822 53.5232 13.4263C51.1278 9.62971 47.6893 6.77477 43.2914 4.84833C38.895 2.85854 33.7221 1.89999 27.8303 1.89999H1.27832H0.77832V2.39999V72.4ZM9.78232 49.284H9.28232V49.784V70.5H3.17832V4.29999H27.8303C33.4735 4.29999 38.2956 5.21953 42.312 7.03942L42.3119 7.03946L42.3179 7.04208C46.3312 8.79791 49.3856 11.3592 51.5032 14.7224L51.5031 14.7225L51.5091 14.7315C53.6853 18.0269 54.7863 22.0544 54.7863 26.84C54.7863 31.4943 53.6867 35.4926 51.5067 38.856L51.5055 38.858C49.3875 42.1596 46.3306 44.7236 42.312 46.5446C38.2956 48.3645 33.4735 49.284 27.8303 49.284H9.78232ZM43.2224 39.6081L43.2231 39.6075C46.8752 36.553 48.6823 32.2741 48.6823 26.84C48.6823 21.345 46.8773 17.0336 43.2249 13.978C39.6437 10.9283 34.4207 9.44399 27.6383 9.44399H9.78232H9.28232V9.94399V43.544V44.044H9.78232H27.6383C34.4196 44.044 39.6415 42.5922 43.2224 39.6081ZM27.6383 41.644H11.6823V11.844H27.6383C34.1172 11.844 38.6899 13.2676 41.6702 15.8064L41.6722 15.808L41.6818 15.8162L41.6834 15.8174C44.6959 18.337 46.2823 21.9197 46.2823 26.84C46.2823 31.6873 44.7018 35.2414 41.6846 37.7655C38.7033 40.2492 34.1245 41.644 27.6383 41.644Z"
//                 stroke="white"
//               />
//             </svg>
//           </div>

//           <div class="tab1">
//             <article class="team-card--tab1 stack-md width-lg">
//               <h2>Geo-Location</h2>
//               <p>Location based games blurring reality and gaming</p>
//             </article>

//             <article class="team-card--tab1 stack-md width-lg">
//               <h2>Networked Multiplayers</h2>
//               <p>
//                 Connect teams of up to 400 players from anywhere in the world
//               </p>
//             </article>

//             <article class="team-card--tab1 stack-md">
//               <h2>VR and AR</h2>
//               <p>
//                 We can customise breathtaking VR experiences for any headset
//               </p>
//             </article>

//             <article class="team-card--tab1 stack-md">
//               <h2>Educational training</h2>
//               <p>
//                 Virtual training courses and narratives tailored to your
//                 organisations needs
//               </p>
//             </article>

//             <article class="team-card--tab1 stack-md">
//               <h2>State of the art Servers</h2>
//               <p>
//                 With Server farms distributed globally, our networks never drop
//               </p>
//             </article>
//           </div>
//         </div>
//       </div>
//     </section>

//     <section id="tab2" class="section hide stack-xl">
//     <div class="center width-xxxl">
//       <h1>Who We Game With</h1>
      

//         <article class="tab2 tab2-img1">
//         <h2>Indie Developers</h2>
//         <p>We work with the hottest new emerging talent from across the world, who specialise in every platform, style and background to provide you with the very best.</p>
//         <img src="/img/games/1.png" alt="defiant lobster logo">
//         <img src="/img/games/2.png" alt="Game company logo">
//         <img src="/img/games/3.png" alt="Royal Game logo">
//         <img src="/img/games/4.png" alt="Masquerade logo">
//         <img src="/img/games/5.png" alt="kokyo logo">
//         <img src="/img/games/6.png" alt="Omelet logo">
//         <img src="/img/games/7.png" alt="Fargo Spaceman logo">
//         <img src="/img/games/8.png" alt="Firestrike logo">
//         <img src="/img/games/9.png" alt="Phaser Lock logo">
//         <img src="/img/games/10.png" alt="triumphant logo">
//         <img src="/img/games/11.png" alt="Dice up games logo">
//         <img src="/img/games/12.png" alt="Dark 3D logo">
//         <img src="/img/games/13.png" alt="Mockit logo">
//         <img src="/img/games/14.png" alt="Click Shooter logo">
//         <img src="/img/games/15.png" alt="Level up mushrooms logo">
//         <img src="/img/games/16.png" alt="Playstation logo">
//         </article>
    
//         <article class="tab2 tab2-img2">
//           <h2>Marketing Platforms</h2>
//           <p>We offer a wide range of Marketing approaches, from custom one off events, from Product lanuches to emerging Gamer Talent tournaments and charity events.</p>
//           <img src="/img/marketing/1.jpeg" alt="Yound white man stood in front of gaming event with coloured lights and branding">
//           <img src="/img/marketing/4.jpg" alt="People sat in team shirts playing desktop games on headsets">
//           <img src="/img/marketing/3.jpg" alt="people sat in casual clothing playing desktop games on headsets">
//           <img src="/img/marketing/2.jpg" alt="A large busy arena for a team gaming event with coloured lighting">
//           </article>

//         </div>
//     </section>

//     <section id="tab3" class="section hide stack-lg display-column">
//       <div class="center width-xl">
//         <h1>TAB 3 Meet the Team</h1>

//         <div class="tab3">
//           <article class="team-card stack-lg">
//             <h2>Eleni Souros</h2>
//             <img src="img/4.jpg" alt="" />
//             <p>
//               Works closely with our clients to develop personal sides to our
//               stories
//             </p>
//           </article>

//           <article class="team-card stack-lg">
//             <h2>Kazem Sehat</h2>
//             <img
//               src="img/1.png"
//               alt="portrait of Middle-Eastern Man in his thirties"
//             />
//             <p>
//               Our backend developer with 15 years experience developing Games
//             </p>
//           </article>

//           <article class="team-card stack-lg">
//             <h2>Gunnar Jóhannsdóttir</h2>
//             <img src="img/2.png" alt="" />
//             <p>Develops our Geo-location experiences and locations, and VR platforms for all users</p>
//           </article>

//           <article class="team-card stack-lg">
//             <h2>Catalina Castillo</h2>
//             <img src="img/5.jpg" alt="" />
//             <p>
//               Our UX expert designs custom set ups to suit every abaility and
//               need
//             </p>
//           </article>

//           <article class="team-card stack-lg">
//             <h2>Isla Alvarez</h2>
//             <img src="img/6.jpg" alt="" />
//             <p>
//               Our Network experts keep multiplayer games running when everything
//               else is going wrong
//             </p>
//           </article>
//         </div>
//       </div>
//     </section>

//     <section id="tab4" class="section hide stack-xl display-column">
//       <div class="center width-xxl">
//         <h1>Subscription</h1>

//         <div class="tab1">
//           <article class="team-card--tab2 stack-mg width-lg">
//             <h2>Entry Level</h2>
//             <p>Tailored content on one of our premade gaming architecture.</p>
//             <p>Huge variety of styles and personal touches available.</p>
//             <p>Up to 60 minutes playing time in narrative frameworks.</p>
//             <p>Include custom images, songs, narratives and avatars.</p>
//             <p>Game available to download.</p>
//           </article>

//           <article class="team-card--tab2 stack-mg width-lg">
//             <h2>Enthusiast</h2>
//             <p>24 hour access to state of the art gaming set-ups.</p>
//             <p>Private servers deliver un-throttled fibre-optic speeds</p>
//             <p>unlimited sessions for one user per session</p>
//             <p>Customise your gaming set-up with inidivdual log-ins and avatars</p>
//             <p>Annual subscription</p>
//           </article>

//           <article class="team-card--tab2 stack-mg width-lg">
//             <h2>Educational</h2>
//             <p>Up to 30 participants licensed.</p>
//             <p>Tailored content using premade game engines.</p>
//             <p>Asynchronous play available.</p>
//             <p>Rewards based on learning achievements.</p>
//             <p>9 months Access and permenant access to notes and chat</p>
//           </article>

//           <article class="team-card--tab2 stack-mg width-lg">
//             <h2>God Mode</h2>
//             <p>Up to 50 participants licensed</p>
//             <p>Completely tailored content from start to finish</p>
//             <p>Multiplayer and asynchronous play available</p>
//             <p>Endless game-play from anywhere in the world for a whole year</p>
//             <p>VR and Geolocation extension options possible also</p>
//           </article>
//         </div>
//       </div>
//     </section>

//     <section id="tab5" class="section hide display-column">
//       <div class="center width-lg">
        

//         <div class="tab5">
//           <h1>Contact us!</h1>
//           <form
//             action="https://formspree.io/f/xqkvjwle"
//             method="POST"
//             class="stack-md"
//           >
//             <div class="stack-md">
//               <label for="name">
//                 Your name:
//                 <input type="text" required name="name" />
//               </label>
//             </div>

//             <div class="stack-md">
//               <label for="company">
//                 Your company:
//                 <input type="text" required name="company" />
//               </label>
//             </div>

//             <div class="stack-md">
//               <label for="email">
//                 Your email:
//                 <input type="email" required name="email" />
//               </label>
//             </div>

//             <div class="stack-md">
//               <label>
//                 Your message:
//                 <textarea required name="message"></textarea>
//               </label>
//             </div>

//             <button type="submit" tabindex="0">Send</button>
//           </form>
//         </div>
//       </div>
//     </section>



//     <script type="text/javascript" src="main.js"></script>
//   </body>
// </html>`

// let img_sources = jsdom.env(
//   HTMLSTRING,
//   function (errors, window) {
//     var imgs = window.document.getElementsByTagName('img');
//     for (var i = 0; i < imgs.length; i++) {
//       var src = imgs[i].getAttribute('src');
//       if (src) console.log(src);
//     }
//   }
// );

// img_sources();