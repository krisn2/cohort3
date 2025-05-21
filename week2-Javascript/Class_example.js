class  Rectangle { // Obj rectangle build using class OR skeleton for object
    constructor(width, height,color) { // constructor to build the object
        this.width = width;  // properties
        this.height = height; // |
        this.color = color; // |
    }

    area() {
        const area = this.width * this.height;
        return area
    }

    paint () {
        console.log(`Painting with color ${this.color}`);
    }
}


const rect = new Rectangle(10, 20, 'red');
const area = rect.area();
console.log(area);
rect.paint();