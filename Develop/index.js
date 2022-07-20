// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs')
const axios = require('axios')
// TODO: Create an array of questions for user input
const questions = [
    {
        type:'input',
        message:'Please enter the title of your project.',
        name:'title'
    },
    {
        type:'input',
        message:'Please write a short description of your project.',
        name:'description'
    },
    {
        type:'input',
        message:'Please provide the installation instructions for your project.',
        name:'installationInstruction'
    },
    {
        type:'input',
        message:'Please provide the usage instructions for your project.',
        name:'usageInstruction'
    },
    {
        type:'input',
        message:'Please provide the contribution guidelines for your project.',
        name:"contributions"
    },
    {
        type:'list',
        message:'Please select what license your project uses.',
        name:'license',
        choices:['Github','Modzilla','Mit','CC0-1.0','CC-BY-4.0','Other']
    },
    {
        type:'input',
        message:'Please provide the test instructions for your project',
        name:'test'
    },
    {
        type:'input',
        message:'Please provide your github username.',
        name:'github'
    },
    {
        type:'input',
        message:'Please enter your email.',
        name:'email'
    }
];

// TODO: Create a function to write README file
function writeToFile(data, fileName) {
    fs.writeFile('README.md',
    `# ${data.title}
    ## Description
    ${data.description}

    ## Table of Contents
    -[Installation] (#installationInstruction)
    -[Usage](#usageInstruction)
    -[How to Contribute](#how-to-contribute)
    -[Tests](#Tests)
    -[Questions](#Questions)

    ## Instllation
    ${data.installationInstruction}

    ## Usage
    ${data.usageInstruction}

    ## Badges
    ![License Badge](https://img.shields.io/static/v1?label=license&message=${data.license}&color=blue)

    ## License
    ${fileName}

    ## How to Contribute
    ${data.contributions}

    ## Tests
    ${data.test}

    ## Questions
    
    Github:[${data.Github}](https://github.com/${data.Github})
    
    Please send any questions you have to :[${data.email}](mailto:${data.email})`
    , function(err){
        if(err) {
            console.log(err)
        } else {
            console.log('Success')
        }
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(
        questions
    ).then(function(response){
        const answerObject = response
        console.log(answerObject)
        const license = answerObject.license
        axios.get(`https://api.github.com/licenses/${license}`)
        .then(function(response){
            // Success
            const fileName = response.data.body;
            writeToFile(answerObject, fileName)
        })
        .catch(function(error){
            // Error
            console.log(error)
        })
    })
}

// Function call to initialize app
init();
