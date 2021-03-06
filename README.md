# DeepMap Mobile App

The Deep Map mobile app project is a cross-platform mobile application built in React Native. As such, it is a fully functional iOS and Android application. It is based on the existing [Deepmap Website](https://github.com/djryancarson/Deep-Map) located on the Trubox website.

# Building the project and running the app

In order to run the DeepMap project, you first have to setup React Native on your local machine. The instructions on how to do so are located on the [React Native Website](https://reactnative.dev/docs/environment-setup). For this project, we built the project using the React Native CLI Quickstart instructions, so the project has not been tested with the Expo environment.

### Android

##### Running the Debug Version

1. Open a command line and navigate to the project folder 
2. run `npm i`
3. `adb uninstall com.deepmap` (only necessary if a previous version is already installed)
4. `npx react-native run-android`

Note: this will often fail when trying to build the debug app. In our experience, you sometimes have to run `npx react-native run-android` up to 5 times for it to successfully build. An alternative to this would be to simply run the android folder within Android Studio.

##### Building the Release Version

1. Move the **gradle.properties** file with the keystore info to `DeepMap\android`
2. Move the **my-upload-key.keystore** to `DeepMap\android\app`
3. Open a command line and navigate to the project folder 
4. run `npm i`
5. In the command line, navigate to the android folder of the project (`DeepMap\android`)
6. Run `gradlew bundleRelease`
   * Note: the [Official Documentation](https://reactnative.dev/docs/signed-apk-android) advises to use `./gradlew bundleRelease`. In our experience, this does not work on a Windows Environment
7. Navigate back to `DeepMap` and run `npx react-native run-android --variant=release`
8. The release apk will be located at `DeepMap\android\app\build\outputs\apk\release`


### iOS build

You have have some issues using the command npx react-native run-ios

If you get errors when building 
 1. Make sure to have Cocoapods installed
 2. Navigate to the IOS Folder in your Terminal
 3. Use the command `pod install`
 4. Try building the app again

# Relevant Project Files & Folders

Many of the files in the project directory are generated by React Native, but there are some important files that must be worked on in order to modify the project.

### App.js

This file is the main file that loads everything in the project upon opening. It is similar to the Driver class or Index file of a typical program or webpage. This file includes all of the import statements relevant to the project, the HomeScreen class including all the UI elements that appear when the app loads for the first time, the integration for the Firebase database and the Style Sheet that includes all the styling necessary for the UI elements.

### package.json & node_modules

The **package.json** file includes a list of the necessary dependencies needed for the React Native project. When the command `npm i` is run, it looks to this file to create everything necessary in the **node_modules** folder.

### ios & android

The **ios** and **android** folders hold the project files for the iOS and Android projects respectively. They were automatically generated when the React Native project was created and change content based on and change as the React Native project is edited and rebuilt. These folders can be directly imported into the xCode and Android Studio IDEs, allowing for easy testing if already familiar with these IDEs or further implementation specific to either platform.

### DeepMapSite

This folder contains the PHP files for the site which is used to input data to the database to be displayed by the app. deepmap-login.php, logout.php and session.php are all for simply handling sessions and specifically login.php is providing a simple login page. The entirety of the functionality of site lies within home.php. The site consists of an input form that is invisible by default. It becomes visible when the user clicks the 'Add New' button or the 'Edit' button on any of the resources and in that case the list of current resources will then become invisible. The list of current resources is built from the database dynamically and certain elements for each are shown or hidden depending on whether it is virtual or not. Additionally, when editing a resource, the form fields will be filled with its current values. Certain form fields will be hidden or shown depending or whether the resource is a virtual one or not.


# Contact Information

### Jennifer Mei

​	Project Client and Product Owner

​	[jmei@tru.ca](mailto:jmei@tru.ca)

### Ryan Carson

​	Initial Project Developer

​	ryantannercarson@gmail.com

### Dyson Fraser

​	Initial Project Developer

​	dysonfraser@gmail.com

### Tyrel Froese

​	Initial Project Developer

​	froeset17@gmail.com