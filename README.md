# Prompt Odyssey

<a href="https://example.com" target="_blank">Prompt Odyssey</a>
 is a web application that allows users to create, share, and edit AI prompts. These prompts are designed to be used with AI chatbots, aiding in various domains mentioned in the tags.

## Features

- **User Authentication**: Implemented using NextAuth.js, enabling users to securely sign up, sign in, and manage their accounts.
- **Create Prompts**: Users can create AI prompts tailored to specific domains or topics.
- **Share Prompts**: Share prompts with others, allowing collaboration and sharing of ideas.
- **Edit Prompts**: Collaboratively edit prompts to refine and improve them over time.
- **Tagging System**: Organize prompts by associating them with relevant domains or topics.
- **Responsive Design**: Utilizes Tailwind CSS for a responsive and visually appealing user interface across various devices.
- **Reliability and Scalability**: Hosted on Render, Prompt Odyssey guarantees reliability and scalability, providing uninterrupted connectivity regardless of the scale of interaction.

## Technologies Used

- **Next.js**: React framework for building server-side rendered (SSR) web applications.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **NextAuth.js**: Authentication library for Next.js applications, providing authentication functionalities.
- **MongoDB**: Database for storing user data, prompts, and related information.
- **Render**: Hosting platform for deploying and scaling web applications.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine. To install node.js visit **https://nodejs.org/en/download**
- MongoDB database instance. To create mongodb instance visit **https://mongodb.com/atlas**

### Setting up Project
To get Prompt Odyssey up and running on your local machine, follow these simple steps:

### 1. Clone the repository:

```git
git clone https://github.com/MuhammadAli7896/Prompt-Odyssey.git 
```
Make sure you have [git](https://git-scm.com/downloads) installed on your device.

### 2. Navigate to the project directory:

  ```bash
  cd Prompt-Odyssey
```

### 3. Install dependencies:

  ```bash
  npm i
```

### 4. Configure environment variables:

Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
GITHUB_SECRET=
JWT_SECRET=
MAX_LIMIT=
MIN_LIMIT=
```

### 5. Run the application server:
```bash
npm run dev
```

Visit http://localhost:3000 in your browser to access the application.

## Deployment

The application can be deployed to the [Render](https://render.com) hosting platform following these steps:

1. Create an account on [Render](https://dashboard.render.com/register) and set up your project.
2. Connect your GitHub repository to your Render project.
3. Configure environment variables in Render similar to the local setup.
4. Render will automatically build and deploy your application whenever changes are pushed to the connected GitHub repository.
5. For detailed deployment instructions, refer to the Render documentation.

### Contact

#### LinkedIn: https://www.linkedin.com/in/muhammad-ali-a772a025b/
#### Portfolio: https://muhammad-aliportfolio.netlify.app/
<br />
