// // Select elements
// const fileInput = document.getElementById("file-input");
// const imagePreview = document.getElementById("image-preview");
// const submitBtn = document.getElementById("submit-btn");
// const resultsDiv = document.getElementById("results");

// // Handle image upload and preview
// fileInput.addEventListener("change", () => {
//     const file = fileInput.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
//         };
//         reader.readAsDataURL(file);
//     }
// });

// // Mock function to simulate ship detection
// submitBtn.addEventListener("click", () => {
//     if (fileInput.files.length === 0) {
//         alert("Please upload an image first!");
//         return;
//     }

//     // Placeholder for actual detection logic
//     resultsDiv.innerHTML = `
//         <p>🚢 Ship detection is in progress...</p>
//         <p>✅ Ships Detected: <strong>3 Ships</strong></p>
//     `;
// });




// // Select the file input and image preview elements
// const fileInput = document.getElementById("file-input");
// const imagePreview = document.getElementById("image-preview");

// // Add an event listener to handle file input changes
// fileInput.addEventListener("change", () => {
//     const file = fileInput.files[0]; // Get the first selected file

//     if (file) {
//         const reader = new FileReader(); // Create a FileReader object

//         // When the file is loaded, display it as an image
//         reader.onload = function (e) {
//             imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 300px; border: 1px solid #ccc; padding: 5px;">`;
//         };

//         reader.readAsDataURL(file); // Read the file as a Data URL
//     } else {
//         // If no file is selected, clear the preview
//         imagePreview.innerHTML = `<p>No image selected</p>`;
//     }
// });






// Select the necessary elements
const uploadForm = document.getElementById("upload-form");
const fileInput = document.getElementById("file-input");
const resultsDiv = document.getElementById("results");

// Handle form submission
uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if a file is selected
    if (fileInput.files.length === 0) {
        alert("Please upload an image first!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        // Send the file to the server using Fetch API
        const response = await fetch("/detect", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        // Display the result image or error message
        if (result.error) {
            resultsDiv.innerHTML = `<p style="color: red;">Error: ${result.error}</p>`;
        } else {
            resultsDiv.innerHTML = `
                <p style="color: green;">Image uploaded successfully!</p>
                <a href="${result.result_image_url}" target="_blank">
                    <img src="${result.result_image_url}" alt="Result Image" style="max-width: 300px; max-height: 300px; border: 2px solid #ccc; padding: 5px;">
                </a>
            `;
        }
    } catch (error) {
        console.error("Error during image upload:", error);
        resultsDiv.innerHTML = `<p style="color: red;">Something went wrong! Check console for details.</p>`;
    }
});











