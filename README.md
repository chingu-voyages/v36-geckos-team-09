# Kadeu

## Overview

**Kadeu** is an interactive learning experience where you can test your knowledge in anything you can imagine. It is designed to help the user increase their understanding about a chosen topic by using **Spaced Repetition** which has been proven to be one of the best learning methods for enhancing long-term memory capabilities.

### Collections
Get started by creating a collection inside "Manage Collections", there will be already plenty of collections available.
If you found the topic you want to learn more about, head to the "Play" tab and start learning.
If you haven't, create a new collection, add as much cards as you want and start testing yourself!

### Play
Before playing you can choose between **Quiz Mode** and **Standard Mode**: 
The **Standard Mode** will let you play the [classic flashcards game](https://en.wikipedia.org/wiki/Flashcard), 
**Quiz Mode** is an advanced version of the Standard Mode, where you can select the options in a more interactive fashion.


## Features

-   Manage Collections of **Kadeus**
-   Delete Collections of **Kadeus**
-   Add Collections of **Kadeus**.
-   Share your Collections
-   Quiz Mode

## How to run it

1. `git clone https://github.com/chingu-voyages/v36-geckos-team-09.git`
2. add a .env file inside the server folder and replace those values down below

```
FLASHCARDS_DB_URI=<<your mongoDB URI>>
FLASHCARDS_NS=<<your mongoDB server name>>
PORT=<<local port you want to connect to>>
```

3. `cd client` and run `npm start`
4. `cd server` and run `npm run server`

## Dependencies

(if i missed something please check the package.json file)

### Backend

-   cors
-   dotenv
-   express
-   mongodb

### Frontend

-   emotion
-   hookform
-   material ui
-   reduxjs
-   axios
-   joi
-   react
-   react-dom
-   sass
-   web-vitals
