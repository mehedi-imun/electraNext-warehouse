import PageTitle from '../../Shared/PageTittle/PageTitle';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import auth from '../../../Firebase.init';
import ManageInventoriesCard from '../ManageInventories/ManageInventoriesCard';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const MyItems = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    const [items, setItems] = useState([]);
    useEffect(() => {
        const getMyItems = async () => {

            const token = localStorage.getItem('accessToken')
            const email = user.email;
            const url = `https://electra-next-warehouse-server-mahedi-imun.vercel.app/myitems?email=${email}`;
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `bearer ${token}`
                    }
                });
                setItems(data)
            }
            catch (error) {
                if (error.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... 403',
                        text: 'forbidden access your token is invalid!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                    signOut(auth)
                    navigate('/login')

                }
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... 401',
                        text: 'unauthorize!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                    signOut(auth)
                    navigate('/login')
                }

            }
        }
        getMyItems()

    }, [user])
    const handleDeleteItem = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://electra-next-warehouse-server-mahedi-imun.vercel.app/product/${id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remainingItem = items.filter(item => item._id !== id);
                            setItems(remainingItem)
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        });
    };
    return (
        <div>
            <PageTitle title='my item'></PageTitle>
            <h5 className='text-center my-5'>My item {items.length}</h5>
            <div className='d-flex  flex-column align-items-center ' >
                {
                    items.map(item => <ManageInventoriesCard
                        item={item}
                        key={item._id}
                        handleDeleteItem={handleDeleteItem}
                    >
                    </ManageInventoriesCard>)
                }
            </div>


        </div>
    );
};

export default MyItems;