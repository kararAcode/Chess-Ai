
class Button {
  constructor(x, y, w, h, color, text="", radius=0) {
    // attributes of button
    // defaults to no text and unrounded corners
  
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.text = text;
    this.radius = radius;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h, this.radius);

    textSize(17);
    fill("white");
    textAlign(CENTER);
    text(this.text, this.x + this.w/2, this.y + this.h/2); // text placed in the center of button
  }

  onClick(callback) {
        
    if (mouseX >= this.x && mouseX < this.x + this.w && (mouseY >= this.y && mouseY <= this.y + this.h) && mouseIsPressed) {
      // checks if button is clicked
      // if clicked runs the callback
      callback();
    }
  }
}