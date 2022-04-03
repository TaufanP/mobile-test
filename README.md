<!-- HEADER -->
<p align="center">
  <img src="https://user-images.githubusercontent.com/33638021/161385735-9ff05791-dc23-4884-a931-8dae2a3b7dbe.png" alt="MailBook" width="104">
  <h1 align="center">MailBook</h1>
</p>

<!-- DESCRIPTION -->
<h4 align="center">Easily store your friend's contact.</h4>

<!-- DEPENDENCIES -->
<p align="center">
  <img src="https://img.shields.io/badge/react-17.0.2-green" alt="React 17.0.2" height="24">
  <img src="https://img.shields.io/badge/react--native-0.67.4-green" alt="React Native 0.67.4" height="24">
  <img src="https://img.shields.io/badge/typescript-4.4.4-blue" alt="Typescript 4.4.4" height="24">
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About MailBook](#about)
- [Demo and Preview](#demo-preview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Generate Android Debug APK](#generate)
- [Download](#download)
- [Used Packages](#packages)
- [Future Updates](#updates)

<!-- BACKGROUND -->

## About MailBook <a name="about"></a>

<p>
MailBook is a contact organizer application. You can store various info about your contact. Easily maintainable, there are features like search contact, contact detail, create a new contact, and update an existing contact.
</p>

<!-- DEMO AND PREVIEW -->

## Demo and Preview <a name="demo-preview"></a>

### Search and Display Contacts

<img src="https://user-images.githubusercontent.com/33638021/161407582-f61ac5b9-c357-46f9-8067-1ed26c1e2017.gif" alt="Search and Display Contacts" height="600">

### Add New Contact

<img src="https://user-images.githubusercontent.com/33638021/161407620-197f27cb-3ec3-451f-beb7-6ee203213cd7.gif" alt="Add New Contact" height="600">

<!-- GETTING STARTED -->

## Getting Started <a name="getting-started"></a>

### Prerequisites <a name="prerequisites"></a>

- [Node.js](https://nodejs.org/en/download/) (npm included)
- [Yarn](https://classic.yarnpkg.com/en/docs/getting-started)

### Installation <a name="installation"></a>

Clone this [repo](https://github.com/TaufanP/mobile-test) then open the directory with your terminal by executing

```
git clone https://github.com/TaufanP/mobile-test.git
```

```
cd mobile-test
```

Install all the packages

```
yarn install
```

If you want to run in iOS and you are using Mac OS, please execute pod

```
npx pod-install
```

[Run](https://reactnative.dev/docs/running-on-device) the application on your device or use an [iOS simulator](https://reactnative.dev/docs/running-on-simulator-ios)

### Generate Android Debug APK <a name="generate"></a>

Developer who runs in a Windows operating system could use this command

```
yarn assembleDebug
```

For Mac OS simply run

```
yarn assembleDebugIos
```

The generated app would be stored in

```
mobile-test/android/app/build/outputs/apk/debug/app-debug.apk
```

<!-- DOWNLOAD -->

## Download <a name="download"></a>

Get the android released version [here](https://drive.google.com/file/d/1hmvaQT6HzoHPycIhqzF_3Jn1nZW1d-cF/view?usp=sharing).

<!-- PACKAGES -->

## Used Packages <a name="packages"></a>

### @react-navigation/native

requires

```
@react-navigation/stack react-native-gesture-handler react-native-safe-area-context react-native-screens
```

Manage application's navigation between screens.

### react-native-modal-datetime-picker

requires

```
@react-native-community/datetimepicker
```

Provides date picker in native version on each platform.

### axios

Manage API calls and handles its responses.

### react-hook-form

Helps to maintain text input abilities to manage user's inputs.

### react-native-image-picker

Use native image picker on each platforms.

### react-native-reanimated

Provides various ways to maintain app animations.

### react-native-skeleton-content-nonexpo

requires

```
react-native-linear-gradient
```

Display skeleton loading.

### react-native-svg-transformer

requires

```
react-native-svg
```

Allows to convert SVG files into React component.

### redux-persist

requires

```
@react-native-async-storage/async-storage redux react-redux
```

Persist storage data in local storage.

<!-- UPDATES -->

## Future Updates <a name="updates"></a>

Going to make contact deletion process safer. Currently, haven't implemented confirmation dialog when deleting a contact.
