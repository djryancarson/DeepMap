# Initial Design

<img src="\Screenshots\image1.png" alt="Screenshot_20200404-215912" style="zoom:25%;" />

For our first prototype, we decided to revolve our UI elements around the main focus of the app, which is the Deep Map itself. In order to save on development time and get a first iteration to our client as soon as possible, we opted to simply display the map of the DeepMap webpage as a WebView, simply displaying the Deep Map as it currently is on the DeepMap Webpage. While not entirely functional at this point in the project, we also included tabs at the bottom of the page for future pages to be added, such as a Community and Preferences page. We also included a filter at the top of the map, as one of our requirements is to allow for filtering by different communities.

# Second Iteration

<img src="\Screenshots\image2.png" alt="Screenshot_20200404-215912" style="zoom:25%;" />

In our second iteration, we implemented the MapView within React Native. This view takes advantage of the Google Maps API. We chose to create our own MapView rather than continue using a WebView to the DeepMap Webpage, as this would allow us to manipulate the markers on the map using our own database and do any further edits to map outside of using the Webpage.

# Final Iteration

<img src="\Screenshots\image3.png" alt="Screenshot_20200404-215912" style="zoom:25%;" />

Our Final Iteration of the app further polishes the look and feel of the app, taking advantage of scrolling tabs at the bottom of the screen. It also uses a Community tab to show Virtual Locations, community resources that don't have a specific location such as Facebook groups and websites.

