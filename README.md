<h2 align="center">FileLens</h2>
<p align="center"><i>Repository for the FileLens FrontEnd</i></p>

<div align="center">
  
![GitHub top language](https://img.shields.io/github/languages/top/kaikyMoura/FileLens_FrontEnd)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ce1f958181d743b98107dbc70dfac5ed)](https://app.codacy.com/gh/kaikyMoura/FileLens_FrontEnd/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![Repository size](https://img.shields.io/github/repo-size/kaikyMoura/FileLens_FrontEnd)
![Github last commit](https://img.shields.io/github/last-commit/kaikyMoura/FileLens_FrontEnd)
![License](https://img.shields.io/aur/license/LICENSE)
![Languages count](https://img.shields.io/github/languages/count/kaikyMoura/FileLens_FrontEnd)

</div>

<br/>

### 1. About the Project
This project is the frontend implementation for the [FileLens](https://github.com/kaikyMoura/FileLens_BackEnd), responsible for user authentication, file management, and manipulation. Built with Next.js, React, TypeScript, and Tailwind CSS, FileLens enables efficient file processing by leveraging the GeminiAI API to extract data from files and images.

<br/>

### 2. Key Features
- Secure user authentication and login with tokens issued by the back-end.
- Access management using token-based authorization.
- Advanced file manipulation and processing.
- Data extraction from files and images using the GeminiAI API.
- Responsive and modern UI built with Tailwind CSS.

<br/>

### 3. Technologies & Dependencies
<div display="inline-block" gap="6">
  <img alt="next-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
  <img alt="typescript-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
  <img alt="tailwindcss-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg" />
  <img alt="sass-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" />
  <img alt="react-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
</div> 


#### Main Dependencies:

- [@emotion/react](https://emotion.sh/docs/introduction):  
  <br/>A library designed for writing CSS styles with JavaScript, providing powerful styling capabilities with high performance.

- [@emotion/styled](https://emotion.sh/docs/styled):  
  <br/>A flexible styling library that allows defining styles for components using template literals.

- [axios](https://axios-http.com/docs/intro):  
  <br/>A promise-based HTTP client for making requests to APIs, supporting request/response interception and automatic transformations.

- [jest](https://jestjs.io/):  
  <br/>A powerful JavaScript testing framework focused on simplicity and efficiency, widely used for unit and integration testing.

- [js-cookie](https://github.com/js-cookie/js-cookie):  
  <br/>A simple JavaScript library for handling browser cookies with an easy-to-use API.

- [mammoth](https://github.com/mwilliamson/mammoth.js):  
  <br/>A library for converting `.docx` documents to clean, semantic HTML while avoiding unnecessary styling.

- [next.js](https://nextjs.org/):  
  <br/>A React framework for production, offering hybrid static and server rendering, route pre-fetching, and API routes.

- [next-pwa](https://github.com/shadowwalker/next-pwa):  
  <br/>A Next.js plugin for integrating Progressive Web App (PWA) features, including service workers and caching strategies.

- [pdfjs-dist](https://github.com/mozilla/pdf.js):  
  <br/>A library for rendering PDF documents in the browser using JavaScript.

- [react](https://react.dev/):  
  <br/>A JavaScript library for building user interfaces with a component-based architecture.

- [react-icons](https://react-icons.github.io/react-icons/):  
  <br/>A collection of popular icon libraries as React components, supporting FontAwesome, Material Icons, and more.

- [react-pdf](https://react-pdf.org/):  
  <br/>A library for displaying PDF documents in React applications using `pdf.js`.

- [react-tooltip](https://react-tooltip.com/):  
  <br/>A library for creating customizable tooltips in React applications.

- [react-webcam](https://www.npmjs.com/package/react-webcam):  
  <br/>A React component that provides access to the device’s webcam for capturing images or video.

- [sass](https://sass-lang.com/):  
  <br/>A CSS preprocessor that adds features like variables, nested rules, and mixins to enhance styling.

- [scss](https://sass-lang.com/documentation/syntax#scss):  
  <br/>A syntax for Sass that is similar to CSS, providing additional features for styling.

- [uuid](https://github.com/uuidjs/uuid):  
  <br/>A library for generating universally unique identifiers (UUIDs) in JavaScript.

- [workbox-webpack-plugin](https://developer.chrome.com/docs/workbox/):  
  <br/>A plugin for integrating Workbox into Webpack, enabling service workers and caching strategies for progressive web applications (PWAs).

- [zustand](https://github.com/pmndrs/zustand):  
  <br/>A small, fast, and scalable state management library for React.

<br/>


### 4. Architecture

The project follows a **modular architecture** with a clear separation of concerns, utilizing Next.js's built-in routing and API capabilities.

#### 📂 Project Structure:
- src/
  - components/ # Reusable UI components
      - Button/
        - index.tsx
        - styles.module.scss
          
  - pages/ # Next.js routing system
    - index.tsx # Landing page
    - login/
      - index.tsx # Login page
      - styles.module.scss
        
  - hooks/ # Custom React hooks
    
  - services/ # API and business logic
    - api.ts # Axios instance and request handlers
      
  - context/ # Global state management
    
  - utils/ # Helper functions
    
  - types/ # TypeScript interfaces and types
    - user.ts
      
  - styles/ # Global styles
    - globals.css

<br/>
  
### 5. Installation and Setup

### Prerequisites:
Before running the project, ensure that **Node.js** is installed on your machine. If not, you can download it from the [official Node.js website](https://nodejs.org/en/) (LTS version recommended).

To verify your Node.js installation, run:

```console
node -v
npm -v
```

#### Clone the repository to your local machine:

```console
git clone https://github.com/kaikyMoura/FileLens_FrontEnd.git
```

Navigate to the project's root directory:

```console
cd FileLens_FrontEnd
```

### Installing dependencies:
Use npm or yarn to install the project dependencies:

```console
npm install
# or
pnpm install
# or
yarn install
```

#### Running the Application:
Once the dependencies are installed, you can start the development server with:

```console
npm run dev
# or
pnpm run dev
# or
yarn dev
```

#### The application will be available on:

```console
http://localhost:3000
```

<br/>

### 6. 🚀 Deploy
### Deployment on Vercel with Continuous Integration

The deployment of the project is done on **Vercel**, leveraging **Continuous Integration** for automatic builds and deployments. Any changes pushed to the repository on GitHub are automatically built and deployed to Vercel. 

#### Key Points:
- The project is automatically built and deployed whenever changes are pushed to the GitHub repository.
- **Environment Variables** are configured directly in the Vercel dashboard, ensuring seamless integration between build and deployment.
- **Custom Domain** can be configured for the deployed application, with automatic SSL certificate setup by Vercel.
  
The application is accessible via the unique Vercel-generated URL:

```bash
https://file-lens-front-end.vercel.app
```

<br/>

### 7. Pages Documentation

|  Page |  Description |  Auth Required  |
| --- | --- | --- |
|  `/registration`	 |  Register new user  |  No  | 
|  `/login`  |	Authenticate and get token | 	No  |
|  `/`  |  Main page  |  Yes  |
|  `/upload`  |  Upload files and use services with AI  |  Yes  |
|  `/my-files`  |  Manage your files  |  Yes  |

> ⚠️ **Important**
> </br> When new pages are added, the path will be included in the documentation

<br/>

### 8. 📝 Terms of Use
- **Non-commercial** project.
- All rights related to user data and privacy are respected.
- This project aims to serve as a learning and portfolio tool.
