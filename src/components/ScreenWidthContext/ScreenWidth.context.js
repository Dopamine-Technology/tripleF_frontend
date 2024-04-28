import { createContext, useContext } from 'react';

const ScreenWidthContext = createContext();

export const useScreenWidth = () => useContext(ScreenWidthContext);

export default ScreenWidthContext;
