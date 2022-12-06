# Turl - A Link Shortener

A web app built with the T3 stack. This project was heavily influenced by [this](https://github.com/t3dotgg/joltik) link shortener made with the same stack, but my link shortener adds additional features, such as user authentication and a full link history.

You can visit the app [here](https://link-shortener-thrasymachuss.vercel.app/)

## Basic Concept

The app connects to a MySQL database which uses two main tables; one table stores the users of the app (authentication is required), while the other table stores shortened links. Each user can have many shortened links, while each link can only have one user.

The table that stores the links contains both the original url and the slug of the shortened link. If someone visits a particular slug, this app will search the database for a link containing that slug. If the app finds the slug, it will redirect the user to the associated original url.

The root url contains the main user interface of the app. After the user logs in with their email, they are able to create new links. They are also able to view and delete previous links that they’ve created. Authentication is handled with NextAuth, which allows for simple passwordless authentication.

## Technologies Used

As mentioned before, this app used the T3 stack. This consists of the Next.js framework, tRPC, TailwindCSS, Typescript, NextAuth, and Prisma. Prisma handles the interactions with the MySQL database, so I didn’t actually write any SQL code for this project. Prisma, Typescript, and tRPC collectively make the app typesafe from the API to the frontend. Tailwind, meanwhile, created a positive development experience by allowing me to style the website without ever leaving the markup.

Overall, I found using this stack to be a positive experience, and it is currently my preferred way to create full stack applications.

## Possible Improvements

Originally, I had considered allowing users to create shortened links without having to log in. I eventually rejected this idea, as this would allow for links that are not attached to any user. This implies that shortened links could sit in the database without being used, and with nobody to delete them other than the administrator of the database.

Unfortunately, requiring users to log in also makes the user experience somewhat less pleasant. Therefore, I think it would be worthwhile to implement a feature which allows users to create links without logging in, and then transfers ownership of those links to the first account on their computer that logs in. This could be achieved with cookies. If a link is not owned and has not been used for a sufficiently long period of time, it could be deleted automatically.
