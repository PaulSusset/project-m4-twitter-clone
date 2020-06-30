# Twitter Project

Here is a project to create a twitter clone "Critter" made for cats.
In this project we were supplied with a working server serving tweets and user information.
The scope of this project was to make a working, dynamic front end.

[![Critter Demo](https://i.imgur.com/z6vEItS.png)](https://youtu.be/sLEK9CFkCi4)

Three key pages were to be made

# Homefeed

![Homefeed](https://i.imgur.com/k5Jg9oo.jpg)
A home feed with all tweets rendered. Each tweet has the retweet source, avatar, handle, display name, status, media (if present), time of tweet and logos at the bottom to comment, retweet, like and share the tweet.

This page also includes a box from which to publish tweets of your own!
It features a loading state button on submit and a character countdown.
The textArea box changes size to accomodate longer tweets thanks to a module.
![Meow!](https://i.imgur.com/xW17KvS.jpg)

# Profile

![Profile page](https://i.imgur.com/XJimWQo.jpg)

A profile page was made as a re-usable component displaying further user info as well as a list of all their tweets and retweets.
Media and liked tabs aren't developped.

# Tweet details

![Big tweet](https://i.imgur.com/KecQmTK.jpg)
This page displays more detailed information about a specific tweet.

# Other

Another element made was a sidebar which served as Navbar
![Sidebar](https://i.imgur.com/3mvex3R.jpg)

I made a navigatable title bar, which you can click to navigate back all the way back to the home page and displays the current page-type. It displays the current profile's display name.
![Titlebar](https://i.imgur.com/zMamWug.jpg)

A loading state indicator was added on each page to signal the wait for server response
![Loading](https://i.imgur.com/h72o356.jpg)

If the server sends back an error, an general error page was created.
![Error](https://i.imgur.com/GZxqVv4.jpg)

## Launching
1. Clone the repo
2. With 2 terminal windows, change directory into client/ and server/.
3. For each, run command ```yarn install```, then ```yarn start```.

# Bugs and wishes

List of bugs.

- If you go back to the homefeed page after another page received an error from the server it will break.
- If the homepage receives an error from the server and you use the Navbar to go to the profile it will break.

Wishes:

- Follow/Unfollow/Following buttons changing on click
- Responsive sidebar
- Meow button modal from sidebar
