// Select elements
const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");
const submitBtn = document.getElementById("submit-btn");
const resultsDiv = document.getElementById("results");

// Handle image upload and preview
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Update the resultsDiv to show the uploaded image
            resultsDiv.innerHTML = `
                <p>📷 Image Preview:</p>
                <img src="${e.target.result}" alt="Uploaded Image" style="max-width: 300px; max-height: 300px; border: 1px solid #ccc; margin-bottom: 10px;">
            `;
        };
        reader.readAsDataURL(file);
    }
});


// Handle ship detection simulation
submitBtn.addEventListener("click", async () => {
    if (fileInput.files.length === 0) {
        alert("Please upload an image first!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        // const response = await fetch("/detect", {
        //     method: "POST",
        //     body: formData,
        const response = await fetch("http://127.0.0.1:5000/detect", {
            method: "POST",
            body: formData,
        });


        const result = await response.json();

        if (result.error) {
            resultsDiv.innerHTML = `<p style="color: red;">❌ Error: ${result.error}</p>`;
        } else {
            resultsDiv.innerHTML = `
                <p>✅ Detection successful!</p>
                <p>📷 Result Image:</p>
                <img src="data:image/jpeg;base64,${result.result_image}" alt="Result Image" style="max-width: 300px; max-height: 300px; border: 1px solid #ccc; margin-bottom: 10px;">
            `;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">❌ Error: ${error.message}</p>`;
    }
});


