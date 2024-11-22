import { textToMorse, morseToText } from './morseCode.js';
import { romanToInt, intToRoman } from './romanoCode.js';

document.addEventListener('DOMContentLoaded', () => {
    const terminalContainer = document.getElementById('terminalContainer');
    const outputDiv = createOutputDiv();
    const outputCommand = createOutputCommand();
    const commandLine = createCommandLine(outputDiv);

    terminalContainer.appendChild(outputDiv);
    terminalContainer.appendChild(commandLine);

    commandLine.querySelector('input').addEventListener('keydown', handleKeyDown);
});

function createOutputDiv() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'output';
    outputDiv.id = 'output';
    return outputDiv;
}

function createOutputCommand() {
    const outputCommand = document.createElement('span');
    outputCommand.className = 'outputCommand';
    outputCommand.id = 'outputCommand';
    return outputCommand;
}

function createCommandLine(outputDiv) {
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';

    const commandText = document.createElement('span');
    commandText.id = 'command-text';
    commandText.innerText = 'user@ubuntu:~$';

    const commandInput = document.createElement('input');
    commandInput.type = 'text';

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    commandLine.appendChild(commandText);
    commandLine.appendChild(commandInput);
    commandLine.appendChild(cursor);

    return commandLine;
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        const commandInput = event.target;
        executeCommand(commandInput.value.trim(), commandInput);
        commandInput.value = '';
    }
}

function executeCommand(command, commandInput) {
    const outputDiv = document.getElementById('output');
    const commandText = document.getElementById('command-text').innerText;
    const [cmd, ...args] = command.split(' ');

    const commandOutput = document.createElement('div');
    commandOutput.className = 'command-output';
    commandOutput.innerHTML = `${commandText} <span style="color: #00ff00;">${command}</span>`;

    outputDiv.appendChild(commandOutput);

    switch (cmd) {
        case 'info':
            displayInfo(outputDiv);
            break;
        case 'CodeText':
            processMorseConversion(outputDiv, args.join(' '), morseToText);
            break;
        case 'TextCode':
            processMorseConversion(outputDiv, args.join(' '), textToMorse);
            break;
        case 'RomaText':
            processRomanConversion(outputDiv, args.join(' '), romanToInt);
            break;
        case 'TextRoma':
            processRomanConversion(outputDiv, args.join(' '), intToRoman);
            break;
        default:
            outputDiv.innerHTML += `<div>> Comando não reconhecido: ${command}</div>`;
    }
    outputDiv.scrollTop = outputDiv.scrollHeight;

    commandInput.value = '';
}

function processMorseConversion(outputDiv, input, conversionFunction) {
    const result = conversionFunction(input);
    outputDiv.innerHTML += `<div>> ${result}</div>`;
}

function processRomanConversion(outputDiv, input, conversionFunction) {
    const number = parseInt(input, 10);
    if (isNaN(number)) {
        outputDiv.innerHTML += `<div>> Entrada inválida para conversão: ${input}</div>`;
    } else {
        const result = conversionFunction(number);
        outputDiv.innerHTML += `<div>> ${result}</div>`;
    }
}

function displayInfo(outputDiv) {
    const commands = [
        'info: Mostra esta mensagem de ajuda.',
        'CodeText <texto>: Converte texto para código Morse.',
        'TextCode <código Morse>: Converte código Morse para texto.',
        'RomaText <número romano>: Converte número romano para inteiro.',
        'TextRoma <número inteiro>: Converte número inteiro para número romano.'
    ];
    outputDiv.innerHTML += '<div>> Bem-vindo ao TerTools! Aqui estão alguns comandos disponíveis:</div>';
    commands.forEach(command => outputDiv.innerHTML += `<div>> - ${command}</div>`);
}