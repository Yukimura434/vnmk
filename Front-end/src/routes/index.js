import { LoginPage } from "../../src/pages/Auth/LoginPage/index";
import AdminPage from "../admin/pages";
import Dashboard from "../admin/pages/Dashboard";
import MenuManagement from "../admin/pages/Menu/MenuManagement";
import OrderManagement from "../admin/pages/Order/OrderManagement";
import ProductManagement from "../admin/pages/Product/ProductManagement";
import AboutCompany from "../pages/AboutCompany";
import AccountInfo from "../pages/AccountInfo";
import Account from "../pages/AccountInfo/components/Account";
import AccountAdditional from "../pages/AccountInfo/components/AccountAdditional";
import { SocialRedirect } from "../pages/Auth/SocialMediaRedirect";
import Blog from "../pages/Blog";
import CartPages from "../pages/Cart";
import CartClear from "../pages/Cart/components/CartClear";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import OrderPage from "../pages/Order";
import OrderHistory from "../pages/Order/components/OrderHistory";
import SuccessPage from "../pages/Order/components/SuccessPage";
import Product from "../pages/Product";
import ProductAdditional from "../pages/Product/components/ProductAdditional";
import ProductDescription from "../pages/Product/components/ProductDescription";
import ProductReviews from "../pages/Product/components/ProductReviews";
import SuggestedProducts from "../pages/Product/components/SuggestedProducts ";
import DetailPage from "../pages/Product/pages/DetailPage";
import Test from "../pages/Test/Test";

export const routes = [
    { 
        path:'/',
        exact: true,
        page : HomePage,
        isShowHeader : true,
        isShowFooter : false,
    },
    { 
        path:'/admin',
        page : AdminPage,
        isPrivate: true,
        children: [
            {
              path: 'dashboard',
              page: Dashboard,
            },
            {
              path: 'products',
              page: ProductManagement,
            },
            {
              path: 'menu',
              page: MenuManagement,
            },
            {
              path: 'orders',
              page: OrderManagement,
            },
          ],
    },
    { 
        path:'/login',
        exact: true,
        page : LoginPage,
        isShowHeader : false,
        isShowFooter : false,
    },
    { 
        path:'/products',
        // exact: true,
        page : Product,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/products/:productId',
        // exact: true,
        page : DetailPage,
        isShowHeader : true,
        isShowFooter : true,
        children: [
            {
              path: '',
              page: ProductDescription,
            },
            {
              path: 'additional',
              page: ProductAdditional,
            },
            {
              path: 'reviews',
              page: ProductReviews,
            },
          ],
    },
    { 
        path:'/auth/social/redirect',
        page : SocialRedirect,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/cart',
        page : CartPages,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/orders',
        page : OrderPage,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/order-history',
        page : OrderHistory,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/account',
        page : AccountInfo,
        isShowHeader : true,
        isShowFooter : true,
        children: [
            {
              path: '',
              page: Account,
            },
            {
              path: 'additional',
              page: AccountAdditional,
            },
          ],
    },
    { 
        path:'/about',
        page : AboutCompany,
        exact: true,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/blog',
        page : Blog,
        exact: true,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/success-page',
        page : SuccessPage,
        exact: true,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'/test',
        page : Test,
        isShowHeader : true,
        isShowFooter : true,
    },
    { 
        path:'*',
        page : NotFound,
    },
]