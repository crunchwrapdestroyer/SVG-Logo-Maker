const { Circle, Triangle, Square } = require('./lib/shapes');
const inquirer = require('inquirer')
const { writeFile } = require('fs/promises');

const questions = [ 
        {
            type: 'input',
            name: 'text',
            message: 'Enter the text for the logo (up to 3 characters)'
        },
        {
            type: 'input',
            name: 'text color',
            message: 'Enter the text color (keyword or hexadecimal number)'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Enter the shape for the logo',
            choices: [
                    'Square',
                    'Circle',
                    'Triangle'
            ]
        },
        {
            type: 'input',
            name: 'shape color',
            message: 'Enter the shape color of the logo (keyword or hexadecimal number)'
        }
    ]

function init() {
    return inquirer.prompt(questions)
    .then (({ text, textColor, shape, shapeColor }) => {
        let shapeObj
        switch (shape) {
            case "Square":
                shapeObj = new Square(text, textColor, shapeColor)
                break;
            case "Circle":
                shapeObj = new Circle(text, textColor, shapeColor)
                break;
            case "Triangle":
                shapeObj = new Triangle(text, textColor, shapeColor)
                break;
        }
        return shapeObj; // Return shape object directly
    })
        .then((shapeObj) => {
            return writeFile('logo.svg', shapeObj.render());
        })
        .then(() => {
            console.log('logo.svg successfully generated.');
        })
        .catch((err) => {
            console.error('Error generating logo:', err);
        });
    }
    
init();