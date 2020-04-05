# Initial Analysis

* Best Mobile development platform for us would be React Native
  * Cross-platform support
  * Exports to native projects, where native development can take place if necessary
  * An alternative to this would be to develop both apps simultaneously for both platforms, but the overhead work to do so might take more time that simply learning a cross-platform environment such as React Native

### Week 3

* Community features would require some additional requirements
  * Would require a user authentication system and database support
* How to deal with content management from the client
  * Creating a separate version of the app with additional access to add / update content
  * Creating a simple webpage that can access a Database
* Distributing the app to users
  * Easy for Google Play Store 
    * only $25 USD one-time fee
    * Less restrictive
  * Difficult for iOS
    * $100 USD yearly fee
    * more restrictive with content

### Week 4

* App should scale on multiple different devices and screen sizes
  * Decided to start working on the iOS app early in development and continuously test both versions of the app whenever changes were made
  * This decision ultimately lead to our decision to divide the work of the three of us into 3 different platforms, one on Android, one on iOS and one focused on the client webpage using Javascript

### Week 5

* Our client presented us with a contact from a recent trip with some app development experience that we could contact. After discussing as a group, we decided against incorporating him into our project, instead leveraging him as a resource if we needed. We had already determined our technical requirements and didn't want to include someone else that might have a different vision and scope of the final project than our own, especially considering our limited development time for this project.
* Decided to use the Cloud-based Database Google Firebase for content management, as we have some experience with it already and integrates nicely with Mobile and Web platforms

### Week 6

* Decided it would be best to change the User Interface of the app from buttons at the bottom to take you to a new screen to scrolling tabs
* Switched our Map screen implementation from an iFrame that just displays the current DeepMap site to a MapView in React Native that takes advantage of the Google Maps API. Google Maps Services had to be enabled on both platforms for this to work, but it was a necessary improvement that allows us to integrate our database with the map for easy content management for our client

### Week 7

* Added a section on the map for Virtual locations, as some community resources might not have a physical location (eg. a Facebook group, website)
* Created a webpage on Wordpress using our Firebase database and javascript to allow our client to easily edit 
  * An alternative to this that we considered was to create a separate version of the app made specifically for our client that would allow her to edit the map, but felt it would be more user-friendly and take less development time to simply create this as a webpage

### Week 10

* To account for the filter we were planning to add to the app, we modified the database and the client webpage to allow for location categories. A location in the database now has a subtree of categories with True or False values to indicate whether it is part of a community or not.



