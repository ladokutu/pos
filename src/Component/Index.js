import {BrowserRouter, Routes, Route } from "react-router-dom";

import React, { Fragment } from 'react';
import Layout from "./Pages_mui/Layout";


import AppBar from "./Pages_mui/Tools/AppBar";
import Drawer from "./Pages_mui/Tools/Drawer";
import Footer from "./Pages_mui/Tools/Footer";
import Login from "./Pages_mui/Tools/SignIn";
import Logout from "./Pages_mui/Tools/SignOut";

import About from "./Pages_mui/Dashboard/About";
import NoPage from "./Pages_mui/NoPage";
import Merchant from "./Pages_mui/Dashboard/Merchant";
import ItemMerchant from "./Pages_mui/Dashboard/ItemMerchant";

import PosMerchant from "./Pages_mui/Merchant/Transaction/ItemMerchant";

import TransactionRecent from "./Pages_mui/Transaction/Recent";
import TransactionCart from "./Pages_mui/Transaction/Cart";

const Index = (props) => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<><AppBar/><Drawer/><Merchant/><Footer/></>}/>
					<Route path="ItemMerchant"  element={<><AppBar/><Drawer/><ItemMerchant/><Footer/></>}/>
					<Route path="TransactionRecent"  element={<><AppBar/><Drawer/><TransactionRecent/><Footer/></>}/>
					<Route path="TransactionCart"  element={<><AppBar/><Drawer/><TransactionCart/><Footer/></>}/>
					<Route path="About"  element={<><AppBar/><Drawer/><About/><Footer/></>}/>
					<Route path="Login"  element={<><Login/></>}/>
					<Route path="Logout"  element={<><Logout/></>}/>
					
					<Route path="PosMerchant"  element={<><AppBar/><Drawer/><PosMerchant/><Footer/></>}/>
					<Route path="*" element={<NoPage/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Index