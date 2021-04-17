# Recikeep

## What is it?

Recikeep is a web application that aims to store the ingredients of a recipe for a defined number of people in order to generate shopping lists in a faster and less redundant way.

Link to the website : recikeep.fr

## About the project

The idea to make this web application came to me during the health crisis due to Covid-19 in 2020. Being confined and restaurants being closed, I had to resume good habits and cook. We bought a lot of cookbooks and did our shopping once a week. However, we often made the same recipes several times and it was quite redundant to write the list of ingredients each time.
Why not make an application that, once the ingredients of the recipe are recorded, allows me to select
directly this recipe, to enter a number of people who will taste this dish, and to have direct access to my shopping list? Well, this idea is now realized.

## Roadmap

- [x] Have an authentification system thanks to firebase
- [x] Create a grocery list from a selected recipes list
- [x] Delete a grocery list
- [x] Have a translation system French/English
- [x] Check dynamically a grocery list
- [x] Create / Update / Delete a recipe
- [x] Add / Delete a custom ingredient
- [x] Add / Delete a custom unity
- [x] Displaying errors by notifications
- [ ] Allow access to the site without firebase
- [ ] Add a private share between users
- [ ] Add and store images / photos

## Getting Started

### Prerequisites

- Firebase authentication needed to have access to the project.
- Fulfilled all .env files :
  - /client/.env
  - /server/.env

### Installation

1. Create a firebase project at https://console.firebase.google.com/
2. Clone the repo

```
$ git clone https://github.com/lololau/recikeep.git
```

3. Install NPM packages

```
$ npm install
```

4. Fulfill your API in config.ts

### Usage

Photos - blublu - blabla

## Project structure

### Client

#### Built with

React - Redux - Typescript
UI : Material-ui

#### Contain

Slice
Containers
Components
...

### Server

#### Built with

Node.js - Express - Typescript
Database : MySQL

#### Contain

Api
Database
...

## Contact

Lauriane Verhille - verhille.lauriane@gmail.com

Project Link: https://github.com/lololau/recikeep
