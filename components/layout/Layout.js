import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'Book your hotel' }) => {
    return (
        <div>
            <Head>
                <meta charset="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout