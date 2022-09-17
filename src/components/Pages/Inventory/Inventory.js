import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import PageTitle from '../../Shared/PageTittle/PageTitle';

const Inventory = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [items, setItem] = useState({})
    const { img, description, price, quantity, supplier, name } = items;
    useEffect(() => {
        const url = `https://electra-next-warehouse-server-mahedi-imun.vercel.app/product/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setItem(data))
    }, []);

    // increase quantity when click delivered btn
    const handleDelivered = (updatedQuantity) => {
        const newQuantity = updatedQuantity - 1
        const url = `https://electra-next-warehouse-server-mahedi-imun.vercel.app/product/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newQuantity }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    fetch(`https://electra-next-warehouse-server-mahedi-imun.vercel.app/product/${id}`)
                        .then(res => res.json())
                        .then(data => setItem(data))
                    toast.success('delivered successfully!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }
    // add more quantity
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const quantityInput = data.quantity;
        const newQuantity = parseInt(quantityInput) + quantity;
        //alert 
        Swal.fire({
            title: 'Do you want to add item quantity?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Add',
            denyButtonText: `Don't Add`,
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://electra-next-warehouse-server-mahedi-imun.vercel.app/product/${id}`
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newQuantity }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            fetch(`https://electra-next-warehouse-server-mahedi-imun.vercel.app/product/${id}`)
                                .then(res => res.json())
                                .then(data => setItem(data))
                        }
                    })
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    };

    return (
        <div>

            <PageTitle title='inventory'></PageTitle>
            <div><h6 className='text-center mt-5'> Product id: {id}</h6> </div>
            <div className='mt-5'>

                <div style={{ marginBottom: '50px' }} className='card-body d-flex justify-content-center '>
                    <div className="card">
                        <div className="imgBox">
                            <img src={img} alt="" />
                        </div>
                        <div className="content">
                            <div className="details">
                                <h2>{name?.slice(0, 20)}</h2>

                                <p>{description?.slice(0, 100)}</p>
                                <div className="data">
                                    <h3>$ {price} <br /> <span>Price</span></h3>
                                    <h3>{quantity} <br /> <span>quantity</span></h3>
                                    <h3>{supplier} <br /> <span>supplier</span></h3>
                                </div>
                                <div className="action-btn">
                                    <button onClick={() => handleDelivered(quantity)} >delivered</button>
                                </div>

                            </div>
                        </div>


                    </div>

                </div>
            </div>
            <div className='mt-5 mb-5'>
                <h4 className='text-center my-5'>Add Quantity this item </h4>
                <form className='d-flex flex-column mt-2 w-75 mx-auto align-items-center' onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className='mb-3  p-1 input-felid'
                        type='number'
                        {...register("quantity", { required: true })}
                        placeholder='add more quantity'

                    />
                    <input type="submit" value='add Quantity' className='login-btn input-felid' />
                </form>
                <div className='text-center mt-5 mb-5 action-btn'>
                    <div className='w-50 mx-auto'><hr /></div>
                    <h5>manage all inventory</h5>
                    <button onClick={() => navigate('/manageInventories')} className='login-btn'>Manage Inventories</button>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Inventory;