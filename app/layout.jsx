import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { UserContextProvider } from "@context/userContext";

export const metadata = {
  title: "Prompt Odyssey",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <UserContextProvider>
        <Provider>

          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </UserContextProvider>
    </body>
  </html>
);

export default RootLayout;
