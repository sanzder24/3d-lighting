/*****
 * @author Zachary Wartell
 *
 * @version 1.x-5
 *
 *****/

/**
 * @author Zachary Wartell using Code Listing 10.1 from Matsuda, Kouichi; Lea, Rodger (see REFERENCE)
 * @description
 * This functions initializes several event handlers that implement a simple mouse user interface for 3D object rotation.
 *
 * The event handlers detect mouse motion when the left-button is held down.   The xy cursor
 * motion is used to compute and update two rotation angles stored in Array "currentAngle" . The values are:
 *
 *      [x-axis rotation angle, y-axis rotation angle]
 *
 * After mouseRotation_initEventHandlers is called the rotation angles stored in "currentAngle" will be continuously updated.
 * x-axis rotation is clamps to [-90,90] degrees. y-axis rotation is allowed to have arbitrary value.
 *
 *
 * @param {Object} canvas - HTML 5 Canvas
 * @param {Number[]} currentAngle - Array of 2 numbers contain x-axis and y-axis rotation angles
 **/
function mouseRotation_initEventHandlers(canvas, currentAngle) {
	
    var dragging = false;         
    var lastX = -1, lastY = -1;   // Last position of the mouse

    canvas.onmousedown = function (ev) {   // When mouse is clicked
        var x = ev.clientX, y = ev.clientY;
      
        var rect = ev.target.getBoundingClientRect();
        if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
            lastX = x;
            lastY = y;
            dragging = true;
        }
    };
    canvas.onmouseup = function (ev) {
        dragging = false; }; 

    canvas.onmousemove = function (ev) { // Mouse is moved
        var x = ev.clientX, y = ev.clientY;
        if (dragging) {
            var factor = 100 / canvas.height; // The rotation ratio
            var dx = factor * (x - lastX);
            var dy = factor * (y - lastY);
            // Limiting x axis to 180 
            currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
            currentAngle[1] = currentAngle[1] + dx;
        }
        
        lastX = x, lastY = y;
    };
	 
}
