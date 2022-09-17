import React, { useEffect, useState } from 'react';
import PageTitle from '../../Shared/PageTittle/PageTitle';
import Swal from 'sweetalert2';
import ManageInventoriesCard from './ManageInventoriesCard';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const ManageInventories = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0)

    // product count 
    useEffect(() => {
        fetch('https://electra-next-warehouse-server-mahedi-imun.vercel.app/productcount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const page = Math.ceil(count / 10)
                setPageCount(page)
            })
    }, []);
    // fetch api with query and get page wise product
    useEffect(() => {
        fetch(`https://electra-next-warehouse-server-mahedi-imun.vercel.app/allproduct?page=${page}`)
            .then(res => res.json())
            .then(data => setItems(data))
    }, [page])

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
        })
    }
    return (
        <div>
            <PageTitle title='manageInventory'></PageTitle>
            <h5 className='text-center mt-3'>manage all  items</h5>
            <div className='text-center '>
                <button
                    onClick={() => navigate('/addItem')}
                    style={{
                        backgroundColor: '#ff9900',
                        fontWeight: '500'
                    }}
                    className='btn border text-white'>
                    Add item
                    <IoMdAddCircleOutline className='fs-4 ms-2'></IoMdAddCircleOutline>

                </button>
            </div>
            <div className='d-flex flex-wrap container justify-content-around '>
                {
                    items.map(item => <ManageInventoriesCard
                        key={item._id}
                        item={item}
                        handleDeleteItem={handleDeleteItem}
                    >
                    </ManageInventoriesCard>)
                }
            </div>
            <div className='d-flex justify-content-center flex-wrap '>
                {
                    [...Array(pageCount).keys()].map(number =>
                        <button
                            onClick={() => setPage(number)}
                            style={{
                                backgroundColor: '#fc9314',
                                color: '#fff', border: '1px solid #7F7F7F',
                                margin: '5px'
                            }}
                            className={page === number ? ' bg-dark ' : ""}>
                            {number + 1}
                        </button>)
                }
            </div>
        </div>
    );
};

export default ManageInventories;