import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title = 'Book your hotel' }) => {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>{title}</title>
            </Head>
            <Header />
            <ToastContainer />
            {children}
            <Footer />
        </div>
    )
}

export default Layout