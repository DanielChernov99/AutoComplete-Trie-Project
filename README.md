# AutoComplete Trie Project

A console-based autocomplete application built with JavaScript and a Trie data structure.

The app allows users to add words, search for words, and get autocomplete suggestions based on a prefix.

## Features

* Add words to the dictionary
* Find if a word exists
* Get autocomplete suggestions
* Track word usage frequency
* Rank suggestions by frequency
* Console-based interface
* Unit tests with Jest

## Technologies

* JavaScript
* Node.js
* Jest
* prompt-sync

## Commands

```txt
add <word>          Add a word to the dictionary
find <word>         Check if a word exists
complete <prefix>   Show autocomplete suggestions
use <word>          Increase word usage frequency
help                Show available commands
exit                Quit the program
```

## Example

```txt
> add cat
✓ Added 'cat' to dictionary

> add car
✓ Added 'car' to dictionary

> complete ca
Suggestions for 'ca': cat (0), car (0)

> use cat
✓ Incremented usage for 'cat' (now 1)

> complete ca
Suggestions for 'ca': cat (1), car (0)

> find dog
✗ 'dog' not found in dictionary
```

## Installation

```bash
npm install
```

## Run the App

```bash
node src/CLI/index.js
```

## Run Tests

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Project Structure

```txt
src/
├── AutoCompleteTrie.js
├── AutoCompleteController.js
└── CLI/
    ├── ConsoleView.js
    └── index.js

tests/
```

## Main Classes

### AutoCompleteTrie

Handles the Trie logic:

* adding words
* finding words
* predicting completions
* tracking frequency

### AutoCompleteController

Handles user commands and input validation.

### ConsoleView

Handles console output.

## Future Improvements

* Add a web UI
* Save words to a file or database
* Add delete word option
* Add more tests for the controller

## Author

Daniel Chernov
