<h1 align="center">
  <img src="docsImages/vuejs.png"></a>
</h1>

<h2 align="center">VueJS UI Reference Implementation</h2>

<p align="center">
  <a href="#about">About</a> ◈
  <a href="#prerequisites">Prerequisites</a> ◈
  <a href="#build-and-run">Build and run</a> ◈
  <a href="#how-to-test">How to test</a> ◈
  <a href="#changelog">Changelog</a>
</p>

## About

A front-end SPA application built with [VueJS](https://vuejs.org/). It implements [JWT authentication](https://jwt.io/), [Vuex](https://vuex.vuejs.org/guide/) for storage, [VueRouter](https://router.vuejs.org/) for routing and [Vuetify](https://vuetifyjs.com/en/) for UI.

As of now it goes hand in hand with my other projects such as
[Car API](https://github.com/PatriQ94/CarAPITemplate), which serve as the back-end for authentication and data retrieval. In order to fully see the front-end and the back-end working together you **need to run both projects at the same time.**

**The main purpose of the project is to be used as a reference implementation in case of need.**

## Prerequisites

You will need the following tools:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/) (version 10 or later) with npm (version 6.4.1 or later)

## Build and run

1. Create a folder on local computer to clone the repo, something like `C:\source` will be fine.

2. Open cmd within newly created folder and clone the [VueUITemplate repository from Github](https://github.com/PatriQ94/VueUITemplate.git)

   ```console
   git clone https://github.com/PatriQ94/VueUITemplate.git
   ```

3. Move to the root directory and install npm packages

   ```console
   cd VueUITemplate
   npm install
   ```

4. Run the application

   - For development and testing purposes:

     ```
     npm run serve
     ```

   - For production:

     ```
     npm run build
     ```

5. Launch [http://localhost:8080](http://localhost:8080)

## How to test

Once the application is up and running you can test if the back-end API is accessible by clicking the button on the bottom of the screen saying `Check connection with back-end`

![Connection](docsImages/checkConnection.png)

If the back-end API is accessible, you will receive a green notification. If not, a red notification will appear.

If the back-end is accessible, feel free to register a new account and then explore the rest :)

## Changelog

| Edited    | Comment                                                                                |
| --------- | -------------------------------------------------------------------------------------- |
| 1.7.2020  | Project creation, added storage, added routing                                         |
| 2.7.2020  | Added Vuetify, added login UI                                                          |
| 6.7.2020  | Finished login and register, added check connection to back-end, progress on Garage UI |
| 8.7.2020  | Improved docs, progress on Add new car popup                                           |
| 13.7.2020 | Implemented automatic JWT token refreshing                                             |
| 14.7.2020 | Completed "Add new car" and "Remove car" features                                      |
| 17.7.2020 | Added transitions between pages and started working on popup for updating car km       |
