# Twitter Project

Here is a project to create a twitter clone "Critter" made for cats.
In this project we were supplied with a working server serving tweets and user information.
The scope of this project was to make a working, dynamic front end.

Three key pages were to be made

# Homefeed

![Homefeed](/assets/screenshots/turnin/homefeed.jpeg)
A home feed with all tweets rendered. Each tweet has the retweet source, avatar, handle, display name, status, media (if present), time of tweet and logos at the bottom to comment, retweet, like and share the tweet.

This page also includes a box from which to publish tweets of your own!
It features a loading state button on submit and a character countdown.
The textArea box changes size to accomodate longer tweets thanks to a module.
![Meow!](./assets/screenshots/turnin/tweet.jpeg)

# Profile

![Profile page](./assets/screenshots/turnin/profile.jpeg)

A profile page was made as a re-usable component displaying further user info as well as a list of all their tweets and retweets.
Media and liked tabs aren't developped.

# Tweet details

![Big tweet](./assets/screenshots/turnin/tweetdetails.jpeg)
This page displays more detailed information about a specific tweet.

# Other

Another element made was a sidebar which served as Navbar

![Sidebar](./assets/screenshots/turnin/sidebar.jpeg)

I made a navigatable title bar, which you can click to navigate back all the way back to the home page and displays the current page-type. It displays the current profile's display name.

![Titlebar](./assets/screenshots/turnin/titlebar.jpeg)

A loading state indicator was added on each page to signal the wait for server response

![Loading](./assets/screenshots/turnin/loading.jpeg)

If the server sends back an error, an general error page was created.

![Error](./assets/screenshots/turnin/error.jpeg)

# Bugs and wishes

List of bugs.

- If you go back to the homefeed page after another page got an error page it will break.
- If the homepage breaks and you use the Navbar to go to the profile it will break

Wishes:

- Follow/Unfollow/Following buttons changing on click
- Responsive sidebar
- Meow button modal from sidebar
