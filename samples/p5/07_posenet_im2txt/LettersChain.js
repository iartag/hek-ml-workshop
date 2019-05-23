class LettersChain {

    constructor(txt, spacing, size) {
        this.txt = txt
        this.x = Array.from({ length: txt.length }, v => 0)
        this.y = Array.from({ length: txt.length }, v => 0)
        this.spacing = spacing
        this.size = size
    }

    update(txt) {
        this.txt = txt
        this.x = this.x.concat(Array(txt.length).fill(0)).slice(0,txt.length);
        this.y = this.y.concat(Array(txt.length).fill(0)).slice(0,txt.length);
    }

    draw(x, y) {
        this.drawLetter(0, x, y);
        for (var i = 0; i < this.x.length - 2; i++) {
            this.drawLetter(i + 1, this.x[i], this.y[i]);
        }
    }

    drawLetter(i, x, y) {
        const dx = x - this.x[i];
        const dy = y - this.y[i];
        const angle = atan2(dy, dx);
        this.x[i] = x - cos(angle) * (this.spacing);
        this.y[i] = y - sin(angle) * (this.spacing);
        push();
            translate(this.x[i], this.y[i]);
            // rotate(angle);
            textSize(this.size)
            text(this.txt[i], 0, 0)
        pop();
    }

}
