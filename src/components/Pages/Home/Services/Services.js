import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';


const Services = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        const getServices = async () => {
            const url = `https://electra-next-warehouse-server-mahedi-imun.vercel.app/service/`
            const { data } = await axios.get(url)
            setServices(data)
        }
        getServices()
    }, [])

    return (
        <div className='service-body'>

            <h3 className='text-center  py-3'> Our services</h3>
            {
                !services?.length && <Loading></Loading>
            }
            <div className='grid row service-container mt-2 mx-auto gx-4 gy-3'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    >
                    </ServiceCard>)
                }
            </div>

        </div>
    );
};

export default Services;