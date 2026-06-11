# AutoComplete Trie Project

A console-based autocomplete application built with JavaScript and a Trie data structure.

The project allows users to add words to a dictionary, search for existing words, and receive autocomplete suggestions based on a given prefix. It also includes a bonus feature for ranked suggestions using word frequency.

## Overview

This project demonstrates how a Trie, also known as a prefix tree, can be used to efficiently store and search strings.

A Trie is especially useful for autocomplete systems because it allows fast prefix-based lookups.
Instead of scanning every word in the dictionary, the program follows the prefix path inside the tree and then collects all possible completions from that point.

## Features

* Add words to the dictionary
* Search for complete words
* Get autocomplete suggestions by prefix
* Track word usage frequency
* Rank suggestions by frequency
* Console-based user interface
* Input validation through a controller layer
* Unit tests for the Trie logic

## Technologies Used

* JavaScript
* Node.js
* ES Modules
* Jest
* prompt-sync

## Project Structure

```txt
src/
├── AutoCompleteTrie.js
├── AutoCompleteController.js
└── CLI/
    ├── ConsoleView.js
    └── index.js

tests/
├── addWord.test.js
├── findWord.test.js
├── predictWords.test.js
├── getRemainingTree.test.js
├── allWordsHelper.test.js
└── useWord.test.js
```

## Main Concepts

### Trie Node

Each node in the Trie represents one character.

Each node stores:

```js
value
children
endOfWord
frequency
```

### Example

If the dictionary contains:

```txt
cat
car
card
care
```

Then searching for the prefix:

```txt
ca
```

Can return:

```txt
cat, car, card, care
```

## Supported Commands

The console application supports the following commands:

```txt
add <word>          Add a word to the dictionary
find <word>         Check if a word exists in the dictionary
complete <prefix>   Show autocomplete suggestions
use <word>          Increase the usage frequency of a word
help                Show available commands
exit                Quit the application
```

## Example Console Session

```txt
=== AutoComplete Trie Console ===
Type 'help' for commands

> add cat
✓ Added 'cat' to dictionary

> add car
✓ Added 'car' to dictionary

> add card
✓ Added 'card' to dictionary

> complete ca
Suggestions for 'ca': cat (0), car (0), card (0)

> use cat
✓ Incremented usage for 'cat' (now 1)

> use cat
✓ Incremented usage for 'cat' (now 2)

> complete ca
Suggestions for 'ca': cat (2), car (0), card (0)

> find cat
✓ 'cat' exists in dictionary

> find dog
✗ 'dog' not found in dictionary

> exit
Goodbye!
```

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

Navigate into the project folder:

```bash
cd YOUR_REPOSITORY_NAME
```

Install dependencies:

```bash
npm install
```

## Running the Application

Run the console application:

```bash
node src/CLI/index.js
```

## Running Tests

Run all unit tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Core Methods

### addWord(word)

Adds a word to the Trie.

If part of the word already exists, the existing path is reused.

Example:

```js
trie.addWord("run")
trie.addWord("running")
```

The second word reuses the existing path:

```txt
r -> u -> n
```

And only creates new nodes for:

```txt
n -> i -> n -> g
```

### findWord(word)

Checks whether a complete word exists in the Trie.

Important distinction:

```txt
car exists       -> true
ca is only prefix -> false
```

### predictWords(prefix)

Returns all words that start with the given prefix.

The results are sorted by:

1. Higher frequency first
2. Shorter words first when frequencies are equal

### useWord(word)

Increments the usage frequency of a word.

If the word does not exist in the dictionary, the method returns `false`.

## Architecture

The project is separated into three main layers:

### AutoCompleteTrie

Responsible for the core Trie logic:

* Adding words
* Finding words
* Predicting completions
* Tracking frequency

### AutoCompleteController

Responsible for handling user commands and validating input.

It connects the user interface with the Trie logic.

### ConsoleView

Responsible for displaying messages in the console.

This separation makes the project easier to maintain and easier to extend in the future.

## Future Improvements

Possible future improvements:

* Add a web-based user interface
* Save dictionary data to a file or database
* Add support for deleting words
* Add alphabetical sorting as an additional tie-breaker
* Add tests for the controller layer
* Improve response structure for future frontend integration

## Why This Project Is Useful

This project practices several important software development concepts:

* Data structures
* Recursion
* Object-oriented programming
* Input validation
* Separation of concerns
* Unit testing
* Console application design
* Git and GitHub workflow

## Author

Daniel Chernov
