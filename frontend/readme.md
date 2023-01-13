# Unitify Frontend

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
