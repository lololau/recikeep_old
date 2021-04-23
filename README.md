# Recikeep

Recikeep helps you to manage recipes and generate grocery lists.

[recikeep.fr](https://recikeep.fr)

## About the project

The idea and the desire to make this application came to me during the health crisis.
Being on short-time work gave me time to think about my future and allowed me to **change my career path**.

I started a training to learn how to code and then I wanted to realize a project to put into practice what I had just learned. So I looked for project ideas to find one that made sense to me and that I cared about.

Being confined and the restaurants being closed, we had to get back to good habits and cooking. So we bought several cookbooks and went shopping once a week.
However, we often made the same recipes and it was quite redundant to write down the list of ingredients each time.
**That's how the idea of recikeep came to me.**

I made an application that would generate shopping lists from a selection of recipes with a defined number of people.

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
- [x] Share a shopping list with a secure link
- [ ] Allow access to the site without firebase
- [ ] Add a private share between users
- [ ] Add and store images / photos
- [ ] Convert same ingredient with differents unities into one unity

## Getting Started

### Prerequisites

Firebase authentication needed to have access to the project.

- Create a firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

### Installation

1. Clone the repo

```
$ git clone https://github.com/lololau/recikeep.git
```

2. Grab your serviceAccountKey.json file from firebase and add it into server/configs folder

3. Fulfilled all .env files :

   - client / .env : with firebase configuration

   REACT_APP_API_KEY=
   REACT_APP_AUTH_DOMAIN=
   REACT_APP_PROJECT_ID=
   REACT_APP_STORAGE_BUCKET=
   REACT_APP_MESSAGING_SENDER_ID=
   REACT_APP_APP_ID=
   REACT_APP_MEASUREMENT_ID=
   REACT_APP_DATABASE_URL=
   REACT_APP_API_ENDPOINT=

   - server / .env : with MySQL configuration

   GOOGLE_APPLICATION_CREDENTIALS=
   MYSQL_USER=
   MYSQL_PASSWORD=
   MYSQL_HOST=
   MYSQL_DATABASE=

4. Install NPM packages

```
$ npm install
```

### Usage

**Home page** - Recipes list registered by user account

<img src="https://i.imgur.com/IQUYK7r.png" alt="drawing" style="width:200px;"/>

---

**Recipe template**

<img src="https://i.imgur.com/cRZ9RHp.png" alt="drawing" style="width:200px;"/>

---

**How to make a grocery list :**

1. You have to select the recipes you want to cook
2. You have to enter a number of parts by recipe
3. You can update the grocery list by adding or deleting an ingredient

<img src="https://i.imgur.com/VGtZs6a.png" alt="drawing" style="width:200px;"/>

<img src="https://i.imgur.com/dbHClWr.png" alt="drawing" style="width:200px;"/>

<img src="https://i.imgur.com/lFX56LS.png" alt="drawing" style="width:200px;"/>

---

**Grocery list**

**How to share a grocery :**

1. You have to clink on the share icon and then click on the 'copy link' button on the modal appeared
2. Give that link to others

<img src="https://i.imgur.com/uzEsC82.png" alt="drawing" style="width:200px;"/>

<img src="https://i.imgur.com/RIrr9R7.png" alt="drawing" style="width:200px;"/>

<img src="https://i.imgur.com/Hnjh062.png" alt="drawing" style="width:200px;"/>

## Project structure

### [Client](https://github.com/lololau/recikeep/tree/master/client)

#### Built with

This project was generate with `npx create-react-app --typescript`

Stack : React - Redux - Typescript
UI : Material-ui

#### Contain

The client contains the graphical interface of the application

```
src
├── App.tsx
├── index.tsx
├── app          # contains all global config files (store, middleware, ...)
├── components   # contains all generic components
├── containers   # contains all 'pages' components
├── locales      # contains translation files
└── slice        # contains all reducers

```

### [Server](https://github.com/lololau/recikeep/tree/master/server)

#### Built with

Stack : Node.js - Express - Typescript
Database : MySQL

#### Contain

The server contains the logical aspect of the project

```
src
├── server.ts         # entry point
├── middlewares.ts    # contains all middlewares
├── api               # Express route controllers for all the endpoints of the app
└── database          # contains all SQL requests

```

## Contact

Lauriane Verhille - verhille.lauriane@gmail.com

Project Link: [https://github.com/lololau/recikeep](https://github.com/lololau/recikeep)
