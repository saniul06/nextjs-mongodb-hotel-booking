import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import '../styles/globals.css';
import { wrapper } from '../redux/store';
import { getRooms } from '../redux/actions/roomActions';

export default function Index() {
    return (
        <Layout>
            <Home />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
    const { page, location, guests, category } = query;
    await store.dispatch(getRooms(req, page, location, guests, category))
})