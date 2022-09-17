import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import auth from '../../../Firebase.init';
import PageTitle from '../../Shared/PageTittle/PageTitle';
const AddItem = () => {
    const [user, error] = useAuthState(auth);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        fetch('https://electra-next-warehouse-server-mahedi-imun.vercel.app/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire(
                        'successfully added product!',
                        'please check your item page',
                        'success'
                    )
                    // on submit reset input
                    reset()
                }
            })


    };

    return (
        <div className='container'>
            <PageTitle title='add item'></PageTitle>
            <h4 className='text-center my-5'>Add new item</h4>
            <form className='d-flex flex-column mt-2 align-items-center' onSubmit={handleSubmit(onSubmit)}>
                <input
                    className='mb-3  p-1 input-felid'
                    type='text'
                    {...register("name", { required: true })}
                    placeholder='Product Name'
                />
                <input
                    className='mb-3  p-1 input-felid'
                    type='text'
                    {...register("description", { required: true })}
                    placeholder='short description'
                />
                <input
                    className='mb-3  p-1 input-felid'
                    type='number'
                    {...register("price", { required: true })}
                    placeholder='price'
                />
                <input
                    className='mb-3  p-1 input-felid'
                    type='text'
                    {...register("img", { required: true })}
                    placeholder='Photo url'
                />
                <input
                    className='mb-3  p-1 input-felid'
                    type='number'
                    {...register("quantity", { required: true })}
                    placeholder='product quantity'
                />
                <input
                    className='mb-3  p-1 input-felid'
                    type='text'
                    {...register("supplier", { required: true })}
                    placeholder='supplier name'
                />
                <input
                    className='mb-3  p-1 input-felid'
                    type='email'
                    value={user?.email}
                    readOnly
                    {...register("email", { required: true })}
                    placeholder='email'
                />
                <p>{error?.message}</p>
                <input type="submit" value='Add Item' className='login-btn input-felid' />
            </form>
        </div>
    );
};

export default AddItem;