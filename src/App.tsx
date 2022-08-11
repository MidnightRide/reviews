import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ProductContextProvider} from "./context/ProductContext";
import {Home} from "./routes/Home";
import {ProductDetail} from "./routes/ProductDetail";
import {Update} from "./routes/Update";

export const App: React.FC = () => {
    return(
        <ProductContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/products/:id/update" element={<Update />}/>
                        <Route path="/products/:id" element={<ProductDetail />}/>
                    </Routes>
                </Router>
            </div>
        </ProductContextProvider>
    );
};
