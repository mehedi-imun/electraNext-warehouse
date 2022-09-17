import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import ItemsCard from './ItemsCard';
const InventoryItems = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const getItems = async () => {
            const url = `https://electra-next-warehouse-server-mahedi-imun.vercel.app/product/`
            const { data } = await axios.get(url)
            setItems(data)
        }
        getItems()
    }, [])
    return (
        <div>
            <h4 className='text-center my-3'>Inventory Items</h4>
            {
                !items?.length && <Loading></Loading>
            }

            <div className='d-flex flex-wrap justify-content-between mt-5'>
                {
                    items.map(item => <ItemsCard
                        key={item._id}
                        item={item}
                    >
                    </ItemsCard>)
                }
            </div>

        </div>
    );
};

export default InventoryItems;