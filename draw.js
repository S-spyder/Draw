document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas element
    var canvas = document.getElementById("drawingCanvas");
    var colorPicker = document.getElementById("colorPicker");
    var bgColorPicker = document.getElementById("bgColorPicker");
    var downloadButton = document.getElementById("downloadButton");

    if (!canvas.getContext) {
        console.error("Canvas not supported. Please use a modern browser.");
        return;
    }

    // Get the 2d rendering context
    var context = canvas.getContext("2d");

    // Set initial styles
    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    canvas.style.backgroundColor = "#FFFFFF"

    // Variables to track drawing state
    var isDrawing = false;

    // Event listeners for mouse interactions
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    colorPicker.addEventListener("input", function () {
        context.strokeStyle = colorPicker.value;
    })

    bgColorPicker.addEventListener("input", function () {
        canvas.style.backgroundColor = bgColorPicker.value;
    })

    // Functions to handle drawing
    function startDrawing(e) {
        isDrawing = true;
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function draw(e) {
        if (!isDrawing) return;

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
    }

    downloadButton.addEventListener("click", function() {
        var dataUrl = canvas.toDataURL("image/png");
        var link = document.createElement("a");
        link.href = dataUrl;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});