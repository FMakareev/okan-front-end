import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider as ProviderRedux } from 'react-redux';
import { Store } from '../src/store';
import {StyledThemeProvider} from "../src/style";

export const Wrapper = ({ children }) => {
	return (
		<BrowserRouter>
			<StyledThemeProvider>
				<ProviderRedux store={Store}>{children}</ProviderRedux>
			</StyledThemeProvider>
		</BrowserRouter>
	);
};

export default Wrapper;
