import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; /* למנוע גלילה רוחבית */
  }`;
const App = () => {
  return (
    <>
        <GlobalStyle />
        <RouterProvider router={router} />
    </>
  );
};
export default App;