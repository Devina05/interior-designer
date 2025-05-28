document.addEventListener("DOMContentLoaded",()=> {
  // Global state to track furniture list
  let furnitureList =[];

  // Function to start AR experience
  function startAR() {
  const arView = document.getElementById("ar-view");
  arView.innerHTML = "<p>AR experience is live! Add furniture to begin designing.</p>";
  console.log("AR experience initialized.");
}



// Function to access the camera and take a picture
async function addFurniture() {
    try {
      // Access the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const arView = document.getElementById("ar-view");
      arView.innerHTML = ""; // Clear the AR view content

      // Create video element to display the camera feed
      const video = document.createElement("video");
      video.style.width = "300px";
      video.id = "camera-view";
      video.autoplay = true;
      video.srcObject = stream;
      arView.appendChild(video);

      // Create a button to capture the image
      const captureButton = document.createElement("button");
      captureButton.id = "capture-button";
      captureButton.textContent = "Capture Image";
      arView.appendChild(captureButton);

      // Capture image event
      captureButton.addEventListener("click", () => {
        // Stop the camera feed and capture the frame
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Replace video feed with the captured image
        const img = document.createElement("img");
        img.id = "captured-image";
        img.src = canvas.toDataURL("image/png");
        img.alt = "Captured Furniture Image";

        arView.innerHTML = ""; // Clear AR view
        arView.appendChild(img); // Add captured image to AR view

        // Stop the camera stream
        stopCamera(video);

        // Prompt the user for a furniture name and add it to the list
        const furnitureName = prompt("Enter furniture name for this image (e.g., Sofa, Table):");
        if (furnitureName) {
          furnitureList.push({ name: furnitureName, image: img.src });
          console.log(`Furniture added: ${furnitureName}`);
        }
      });
    } catch (err) {
      console.error("Camera access error:", err.name, err.message);
      alert(`Error: ${err.name}. ${err.message}`);
    }
  }

  //function to capter room
  async function addroom() {
    try {
      // Access the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const arVie = document.getElementById("ar-vie");
      arVie.innerHTML = ""; // Clear the AR view content

      // Create video element to display the camera feed
      const video = document.createElement("video");
      video.style.width = "300px";
      video.id = "camera-view";
      video.autoplay = true;
      video.srcObject = stream;
      arVie.appendChild(video);

      // Create a button to capture the image
      const captureButton = document.createElement("button");
      captureButton.id = "capture-button";
      captureButton.textContent = "Capture Image";
      arVie.appendChild(captureButton);

      // Capture image event
      captureButton.addEventListener("click", () => {
        // Stop the camera feed and capture the frame
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Replace video feed with the captured image
        const img = document.createElement("img");
        img.id = "captured-image";
        img.src = canvas.toDataURL("image/png");
        img.alt = "Captured Furniture Image";

        arVie.innerHTML = ""; // Clear AR view
        arVie.appendChild(img); // Add captured image to AR view

        // Stop the camera stream
        stopCamera(video);

        // Prompt the user for a furniture name and add it to the list
        const furnitureName = prompt("Enter furniture name for this image (e.g., Sofa, Table):");
        if (furnitureName) {
          furnitureList.push({ name: furnitureName, image: img.src });
          console.log(`Furniture added: ${furnitureName}`);
        }
      });
    } catch (err) {
      console.error("Camera access error:", err.name, err.message);
      alert(`Error: ${err.name}. ${err.message}`);
    }
  }
  // AR.js Interaction Logic

// Rotate Furniture Button
const rotateFurnitureButton = document.getElementById('rotate-furniture');
const furniture = document.getElementById('furniture');
let currentRotation = 0;

rotateFurnitureButton.addEventListener('click', function () {
    if (furniture) {
        currentRotation += 45; // Increment rotation
        furniture.setAttribute('rotation', `0 ${currentRotation} 0`);
    }
});

// Add Furniture Button (Dynamically create furniture models)
const addFurnitureButton = document.getElementById('add-furniture');
addFurnitureButton.addEventListener('click', function () {
    const marker = document.querySelector('a-marker');
    const newFurniture = document.createElement('a-box');
    newFurniture.setAttribute('position', '0 0.5 0');
    newFurniture.setAttribute('scale', '0.5 0.5 0.5');
    newFurniture.setAttribute('material', 'color: green');
    marker.appendChild(newFurniture);
});

// Save Design Button
const saveArrangementButton = document.getElementById('save-arrangement');
saveArrangementButton.addEventListener('click', function () {
    alert('Your design has been saved!');
});


// Function to stop the camera feed
function stopCamera(video) {
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    video.srcObject = null;
  }

// Function to remove the last added furniture
function removeFurniture() {
    const arView = document.getElementById("ar-view");
    const lastFurniture = furnitureList.pop(); // Remove last furniture from the list
    if (lastFurniture) {
      arView.innerHTML = "<p>Your image will appear here.</p>"; // Reset AR view placeholder
      console.log(`Removed furniture: ${lastFurniture.name}`);
    } else {
      alert("No furniture to remove.");
    }
  }

  function removeroom() {
    const arVie = document.getElementById("ar-vie");
    const lastFurniture = furnitureList.pop(); // Remove last furniture from the list
    if (lastFurniture) {
      arVie.innerHTML = "<p>Your image will appear here.</p>"; // Reset AR view placeholder
      console.log(`Removed furniture: ${lastFurniture.name}`);
    } else {
      alert("No furniture to remove.");
    }
  }

// Function to save the design
function saveDesign() {
    if (furnitureList.length > 0) {
      const summary = furnitureList.map((item) => item.name).join(", ");
      const designSummary = `Furniture in your design: ${summary}`;
      console.log(designSummary);

      // Display saved design in the summary area
      const designSummaryArea = document.getElementById("design-summary");
      designSummaryArea.textContent = designSummary;
    } else {
      alert("No furniture in the design to save.");
    }
  }
  function saveDesigns() {
    if (furnitureList.length > 0) {
      const summary = furnitureList.map((item) => item.name).join(", ");
      const designSummary = `Furniture in your design: ${summary}`;
      console.log(designSummary);

      // Display saved design in the summary area
      const designSummaryArea = document.getElementById("design-summary");
      designSummaryArea.textContent = designSummary;
    } else {
      alert("No furniture in the design to save.");
    }
  }


  // Simple AI chatbot that responds based on user input
document.getElementById('send-btn').addEventListener('click', () => {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
      addMessageToChat('user', userInput); // Show user message
      document.getElementById('user-input').value = ''; // Clear input field
      generateBotResponse(userInput); // Generate bot response
    }
  });

  //create a button for chatbot
document.addEventListener("DOMContentLoaded", () => {
    const chatbotLogo = document.getElementById("chatbot-logo");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbotButton = document.getElementById("close-chatbot");

    // Show Chatbot when logo is clicked
    chatbotLogo.addEventListener("click", () => {
        chatbotContainer.classList.remove("hidden");
    });

    // Hide Chatbot when close button is clicked
    closeChatbotButton.addEventListener("click", () => {
        chatbotContainer.classList.add("hidden");
    });
});


// Function to add messages to the chat log
function addMessageToChat(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.textContent = message;
  document.getElementById('chat-log').appendChild(messageDiv);
  document.getElementById('chat-log').scrollTop = document.getElementById('chat-log').scrollHeight; // Scroll to bottom
}

//API for chatbot
const sendMessage = async () => {
  const userInput = document.querySelector('.user-input').value;

  if (userInput.trim() === '') return;

  // Display user's message in the chat log
  const chatLog = document.querySelector('#chat-log');
  const userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = `You: ${userInput}`;
  chatLog.appendChild(userMessageDiv);

  try {
      const response = await fetch('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Display AI's reply in the chat log
      const botReplyDiv = document.createElement('div');
      botReplyDiv.textContent = `AI: ${data.reply}`;
      chatLog.appendChild(botReplyDiv);
  } catch (error) {
      console.error('Error:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'AI: Sorry, I am unable to process your request at the moment.';
      chatLog.appendChild(errorDiv);
  }

  document.querySelector('.user-input').value = ''; // Clear input field
};
document.querySelector('#send-btn').addEventListener('click', sendMessage);


// Function to generate bot's response
function generateBotResponse(input) {
  let botResponse = '';

  // Simple keyword-based responses (extend this for more sophisticated responses)
  if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
    botResponse = 'Hello! How can I assist you with your interior design today?';
  } else if (input.toLowerCase().includes('design') || input.toLowerCase().includes('room')) {
    botResponse = 'I can help you design your room using AR tools. What do you have in mind?';
  } else if (input.toLowerCase().includes('help')) {
    botResponse = 'I can assist you with designing your space or answer any questions about our platform.';
  } else if (input.toLowerCase().includes('camera')) {
    botResponse = 'You can start the camera by clicking the button to visualize your room in AR.';
  } else {
    botResponse = 'I\'m sorry, I didn\'t quite catch that. Could you please rephrase?';
  }

  // Add bot response to chat
  setTimeout(() => addMessageToChat('bot', botResponse), 1000); // Simulate delay for bot response
}

// Event Listeners

  console.log("Page loaded and JavaScript initialized.");

  // Attach event listeners to buttons
  document.getElementById("start-ar").addEventListener("click", startAR);
  document.getElementById("add-furniture").addEventListener("click", addFurniture);
  document.getElementById("remove-furniture").addEventListener("click", removeFurniture);
  document.getElementById("save-design").addEventListener("click", saveDesign);

  document.getElementById("add-picture").addEventListener("click", addroom);
  document.getElementById("remove-picture").addEventListener("click", removeroom);
  document.getElementById("save-designs").addEventListener("click", saveDesigns);

})
