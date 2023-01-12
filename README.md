<!-- Banner Image -->

<p align="center">
  <a href="https://github.com/VictorS67/unitify">
    <img alt="expo sdk" height="128" src="./.github/resources/banner.png">
    <h1 align="center">Unitify</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Latest Version" href="https://expo.dev/accounts/victors67/projects/unitify/builds/72fa315b-0f5b-45a1-a793-1f1e32916ae9" target="_blank">
    <img alt="Forums" src="https://img.shields.io/badge/Latest%20Version-v0.1.43-blueviolet?style=flat-square&labelColor=000000&" />
  </a>
   <a aria-label="Run with Expo Go" href="https://expo.dev/client" target="_blank">
    <img alt="Expo SDK version" src="https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=000000&color=4630EB" />
  </a>
  <a aria-label="Unitify is free to use" href="https://github.com/VictorS67/unitify/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success.svg?style=flat-square&color=33CC12" target="_blank" />
  </a>
  <a aria-label="Last commit" href="https://github.com/VictorS67/unitify/commits/main" target="_blank">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/VictorS67/unitify?style=flat-square">
  </a>
</p>

<p align="center">
  <a aria-label="unitify demo" href="https://www.youtube.com/watch?v=-LEx0mkVU40"><b>View Demo</b></a>
 |
  <a aria-label="bug report" href="https://github.com/VictorS67/unitify/issues">Report Bug</a>
  |
  <a aria-label="add feature" href="https://github.com/VictorS67/unitify/issues">Request Feature</a>
</p>
  
---
- [Project Layout](#-project-layout)
- [Software Builds](#-software-builds)
- [The Team](#-the-team)
- [License](#license)

In response to the pandemic, Covid-19 caused a huge spike in bicycle sales. Because of increased concern about public transit and a need for physical activity, an increasing number of people are opting for one of the most basic modes of transportation, resulting in a so-called "bike boom.” Along with the increase in cycling came a huge drop in greenhouse gas emissions, which plunged to 4.6 percent in 2020. However, when the Covid-19 limitations were lifted and people returned to in-person school and work, bike use has declined, leading in an increase in automobile usage. What was thought to be a permanent decrease in emissions was nothing a blip, with global greenhouse gas emissions rising above pre-pandemic levels in 2021 and onwards. Zero emission vehicles are expensive and not accessible for everyone. Thus, it is necessary to generate a solution to which everybody in the world could contribute.

Unitify is an App run on Android and IOS. We hope it could encourage people use cycling as their main public transit mode therefore preventing greenshouse gas emissions.

## Project Layout

- [`frontend`](/frontend) All the source code for Unifity App modules. Make sure you follow the software builds instruction below before you run it with Expo Go.
- [`backend`](/backend) This is where you can find our data scheme on MongoDB and APIs for connecting from Unitify App to backend.

## Software Builds

### frontend

1. You should run all command below under [`frontend`](/frontend).

   ```shell
   cd frontend
   ```

2. Follow [Expo Installation Guide](https://docs.expo.dev/get-started/installation/) to install all required tools on your development environment.
3. Install all dependencies.
   - expo-cli
     ```shell
     npx expo install
     ```
   - or npm
     ```shell
     npm install
     ```
   - or yarn
     ```shell
     yarn install
     ```
4. Configure your expo app.
   - Please find these two configurations files under [`frontend`](/frontend) folder.
     ```shell
     .
     ├── frontend/
     │    │
     │    ├── app.json
     │    └── config.json
     │    └──...
     └── ...
     ```
   - [app.json](/frontend/app.json) - Follow instructions on [Expo MapView Instruction](https://docs.expo.dev/versions/latest/sdk/map-view/) to configure [Google Map API Services](https://developers.google.com/maps) for Android and IOS.
   - [config.json](/frontend/config.json) - Copy the same API Key from [Google Cloud Credential manager](https://console.cloud.google.com/apis/credentials) to `GOOGLE_MAP_API`, and add your backend host url to `BACKEND_URL` (intruction introduced below).
5. Build your project locally.
   - expo-cli
     ```shell
     npx expo start
     ```
   - or npm
     ```shell
     npm start
     ```
   - or yarn
     ```shell
     yarn start
     ```
6. Open your project on Expo Go (Android/IOS).

### backend

## The Team

Here are our team members!

- [Jiakai Shi](https://github.com/VictorS67)
- [Mingxuan Teng](https://www.linkedin.com/in/alveinteng/)
- [Pan Chen](https://www.chenpan.xyz/)
- [Lisa Guseva](https://www.linkedin.com/in/lisa-guseva/)

## License

The Unitify source code is made available under the [MIT license](LICENSE). Some of the dependencies are licensed differently, please check them on [Expo](https://github.com/expo/expo), [react-native-maps](https://github.com/react-native-maps/react-native-maps), [
react-native-google-places-autocomplete](https://github.com/FaridSafi/react-native-google-places-autocomplete), [react-native-paper](https://callstack.github.io/react-native-paper/), [react-navigation](https://reactnavigation.org/).
