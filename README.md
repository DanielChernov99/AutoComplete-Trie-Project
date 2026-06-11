# AutoComplete Trie Project

A console-based autocomplete application built with JavaScript and a Trie data structure.

The app allows users to add words, search for words, and get autocomplete suggestions based on a prefix.
Suggestions are ranked by word usage frequency.

## Features

* Add words to the dictionary
* Find if a word exists
* Get autocomplete suggestions by prefix
* Track word usage frequency
* Rank suggestions by frequency
* Console-based interface
* Unit tests with Jest

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

## Main Structure

The project was built with a clear separation of responsibilities, inspired by an MVC-style structure:

### AutoCompleteTrie

Handles the core Trie logic, including adding words, searching words, autocomplete suggestions, and word frequency.

### AutoCompleteController

Handles user commands and connects the console input to the Trie logic.

### ConsoleView

Handles the console output shown to the user.

## Future Improvements

* Add a web UI
* Save words to a file or database
* Add delete word option
* Add more tests for the controller and console view

## Author

Daniel Chernov
