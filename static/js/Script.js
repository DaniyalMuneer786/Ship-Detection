const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");
const submitBtn = document.getElementById("submit-btn");
const resultsDiv = document.getElementById("results");

fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image Preview" style="max-width: 100%; border-radius: 5px;">`;
        };
        reader.readAsDataURL(file);
    }
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    
    if (fileInput.files.length === 0) {
        alert("Please upload an image first!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);  // Sends the file with 'file' as the key

    // Send image to Flask backend
    fetch("/detect", {
        method: "POST",
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        // Display the result image
        const url = URL.createObjectURL(blob);
        resultsDiv.innerHTML = `
        <br><br>=======================================<br>
        <p>Image uploaded successfully!</p>
        <img src="${url}" alt="Result Image" style="width: 400px; height: 400px; border-radius: 10px; border: 3px solid red; border-radius: 10px;">
        `;
    })
    .catch(error => {
        console.error("Error Response:", error);
        resultsDiv.innerHTML = "<p>Something went wrong! Check console.</p>";
    });
});






// function showImage(event) {
//     var input = event.target;
//     var reader = new FileReader();
  
//     reader.onload = function(){
//       var img = document.querySelector('.uploaded-image');
//       img.src = reader.result;
//       img.style.display = 'block'; // Display the uploaded image
//     };
  
//     reader.readAsDataURL(input.files[0]);
//   }