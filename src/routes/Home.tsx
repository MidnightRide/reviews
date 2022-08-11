import {AddProduct} from '../components/AddProduct';
import {Header} from '../components/Header';
import {ProductList} from '../components/ProductList';

export const Home: React.FC = () => {
    return(
        <div>
            <Header/>
            <AddProduct/>
            <ProductList/> 
        </div>
    );
}
