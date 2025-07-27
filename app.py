from flask import Flask, request, render_template, send_file, jsonify
from ultralytics import YOLO
import cv2
import os
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import base64

# Initialize Flask app
app = Flask(__name__)



# Folder to save uploaded images
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the trained YOLO model once during initialization
model = YOLO("models/saved_model.pt")

@app.route('/')
def index():
    # Render the HTML form for image upload
    return render_template('Index.html')


@app.route('/detect', methods=['POST'])
def detect_image():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"})

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"})

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        results = model(file_path)
        detected_img = results[0].plot()

        # Convert detected image to base64
        pil_image = Image.fromarray(detected_img)
        buffered = BytesIO()
        pil_image.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        return jsonify({
            "message": "Detection successful!",
            "result_image": img_base64
        })
    
    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"})
    
    


if __name__ == '__main__':
    app.run(debug=True)
