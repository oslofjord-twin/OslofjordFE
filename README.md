# Oslo Fjord Digital Twin - Front-end

Welcome to the front-end application for the Oslo Fjord Digital Twin project! This application offers a user interface that enables interaction with the digital twin. Communication with the back-end digital twin is accomplished through the use of a GraphQL API and Apollo Client. The application is powered by Next.js and styled using Tailwind CSS. 


## Getting Started

1. **Clone the Repository:**
```bash
git clone https://github.com/oslofjord-twin/OslofjordFE.git
```

2. **Install Dependencies:**
```bash
cd oslofjord-app
npm install
```

3. **Run the Development Server:**
```bash
npm run dev
```

4. **Explore the Application:**
Open your browser and navigate to **`http://localhost:3000`** to start exploring the Oslo Fjord Digital Twin!


## Usage
Users may interact with the digital twin through the use of a map interface and dropdown menus for choosing questions and species. 

1. Choose a question and a species to get information on:
  \
   &nbsp;
   

  <img src="/oslofjord-app/public/static/Screenshot1.png" alt="Choose a question and a species" width="800"/>
  
  \
  &nbsp;
  

2. Choose a location:
  \
   &nbsp;

<img src="/oslofjord-app/public/static/Screenshot2.png" alt="Choose a location from the map" width="400"/>

  \
   &nbsp;

3. Click 'Go' to see the results:

  \
   &nbsp;
<img src="/oslofjord-app/public/static/Screenshot3.png" alt="Click go and see results" width="800"/>
  
   \
   &nbsp;


## File Structure
```bash
.
├── oslofjord-app
│   ├── app
│   │   ├── api
│   │   │   ├── apolloClient.jsx
│   │   │   ├── gqlQueries.jsx
│   │   │   └── graphQLProvider.tsx
│   │   ├── components
│   │   │   ├── Dropdown
│   │   │   ├── DropdownItem
│   │   │   ├── Footer
│   │   │   └── ...
│   │   ├── pages
│   │   │   ├── About
│   │   │   │   ├── Contact
│   │   │   │   ├── Participants
│   │   │   │   └── Project
│   │   │   └── Dashboard
│   │   ├── utils
│   │   │   ├── functions
│   │   │   └── staticData
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── public
│   │   ├── static
│   │   │   ├── CodTwin.jpg
│   │   │   └── ...
│   ├── next.config.js
│   ├──...
│   └── README
.
```

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

The styling is made using Tailwind CSS. To learn more about this, take a look at the following resource: 
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - learn about Tailwind CSS

For information regarding Apollo Client, take a look at the following resource: 
- [Apollo Client](https://www.apollographql.com/docs/react/why-apollo) - learn about Apollo Client
