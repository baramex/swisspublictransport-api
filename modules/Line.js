const fs = require('fs');
const path = require('path');

class Linie {
    lines = [];

    init() {
        const content = fs.readFileSync(path.join(__dirname, "..", "feeds", "LINIE"));
        const l = content.toString().replace(/\r/g, "").split("\n");

        var currLine = null;
        for (const line of l) {
            if (line.charAt(8) === "N") {
                currLine = new Line(line.substring(0, 7), line.substring(12));
            }
            else if (currLine) {
                if (line.charAt(8) === "F") {
                    currLine.textColor = line.substring(10);
                }
                else if (line.charAt(8) === "B") {
                    currLine.color = line.substring(10);
                }
            }

            if (currLine && currLine.color && currLine.textColor) {
                this.lines.push(currLine);
                currLine = null;
            }
        }
    }

    getLineByName(name) {
        return this.lines.find(line => line.name === name);
    }
}

class Line {
    constructor(id, name, color, textColor) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.textColor = textColor;
    }
}

const linie = new Linie();
linie.init();

module.exports = linie;