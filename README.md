Moonstar Challenge
==================

Task
----
* Write a short page showing posts and comments using the following api:
https://jsonplaceholder.typicode.com

Approach
--------
* I made a small "Beach Blog" for this challenge, where each post is displayed at the landing page as a polaroid picture with a title below the image. By clickling a "polaroid", the user will be taken to that post's article, where they can make comments.
* I used the https://jsonplaceholder.typicode.com API for posts and comments, and the https://unsplash.com/developers API for photos.
Out of these three APIs a single object is created for each post, with all the information it requires. Each post object is pushed into a posts array. This posts array is what the front end uses to display information.
I did this to recreate the data manipulation a back end would do, so that the front end only has to access one endpoint.
* The number of posts was limited to 10 to keep the page light.
* Each new comment made by the user is push into that post's comments array. This way if the user goes back to the landing page and then clicks again on that same post, the new comment will remain.