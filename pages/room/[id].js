import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RoomDetails from '../../components/room/RoomDetails'
import Layout from '../../components/layout/Layout'
import { getRoomDetails } from '../../redux/actions/roomActions'
import { wrapper } from '../../redux/store'
import { clearErrors } from '../../redux/actions/roomActions'

export default function RoomDetailsPage() {
    const dispatch = useDispatch();
    const { room, error } = useSelector(state => state.roomDetails);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(clearErrors());
        }
    }, [error])

    return (
        <Layout title={room.name}>
            <RoomDetails room={room} />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params, }) => {
    await store.dispatch(getRoomDetails(req, params.id))
})
