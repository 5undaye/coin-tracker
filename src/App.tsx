import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';
import { isLightAtom } from './atoms';
import { Icon } from './Icon';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { HelmetProvider } from 'react-helmet-async';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	font-family: 'Nanum Gothic', sans-serif;
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.textColor};
	transition: background-color 0.3s, color 0.3s;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
	text-decoration: none;
	color: inherit;
}
* {
	box-sizing: border-box;
}
`;

const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  padding: 0;
  font-size: 1.6rem;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.accentColor};
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
  }
  &:active {
    background-color: ${(props) => props.theme.cardColor};
    box-shadow: 0 0.1rem 0.5rem rgba(10, 10, 10, 0.2);
  }
`;

function App() {
  const isLight = useRecoilValue(isLightAtom);
  const setIsLightAtom = useSetRecoilState(isLightAtom);
  const toggleTheme = () => setIsLightAtom((current) => !current);

  return (
    <>
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <Toggle onClick={toggleTheme}>
          <Icon name={isLight ? 'dark_mode' : 'light_mode'} />
        </Toggle>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
