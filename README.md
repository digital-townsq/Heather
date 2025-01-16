
## Getting Started

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
***
You should see this page on initial start.
![Image](README_images/Login%20Page.png)
***
Click on Sign Up in order to make an account.
![Image](README_images/Register%20Page.png)
***
After signing up, log in with your details which should take you to the main page. Data is integrated on Firebase which allow likes and dislikes to propagate across all users (web and mobile).
![Image](README_images/Home%20Page.png)
On Refresh, articles with the best score (article likes - article dislikes) will be sorted from the top to the bottom. Likes/Dislikes are instantly updated and implemented on Mobile and Web applications.

