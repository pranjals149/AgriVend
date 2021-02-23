import React from 'react'
import './Sell.css'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useStateValue } from '../../StateProvider';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';

const options = [
    'Paddy', 'Jowar', 'Bajra', 'Potato', 'Maize', 'Tomato', 'Moong', 'Urad'
];

var mp = {};
mp['Paddy'] = 18.68
mp['Jowar'] = 26.20
mp['Bajra'] = 21.50
mp['Potato'] = 24
mp['Maize'] = 18.5
mp['Tomato'] = 16.5
mp['Moong'] = 71.96
mp['Urad'] = 60.3

var farPrice = {}

const defaultOption = 'Paddy';

const Sell = () => {

    const history = useHistory();

    const [{ user }, dispatch] = useStateValue();

    const [capacity, setCapacity] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [crop, setCrop] = React.useState(null);
    const [contact, setContact] = React.useState(null);

    farPrice[crop] = price;

    const msp = (e) => {
        setPrice(e.target.value)
    }

    const validate = (e) => {
        e.preventDefault();

        if(farPrice[crop] < mp[crop]){
            alert("Price cannot be less than MSP")
            return false;
        }

        else if(!(crop in mp)){
            alert('Please enter the crop mentioned in the list of Available Crops')
        }

        else if (contact.length !== 10) alert('Contact No. must be of 10 digits')

        else {
            alert("Your Price is above the MSP !! Good to Go 😀	")
            document.querySelector('.sell__submit').disabled = false;
        }
    }

    const addUser = (e) => {
        e.preventDefault();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("SellingUsers").add({
            crop: crop,
            capacity: capacity,
            price: price,
            user: user?.email,
            contact: contact
        });

        history.push('/sellingItem')

        setCrop("")
        setPrice("")
        setCapacity("")
    }


    return (
        <div className='sell'>

            <h1>Sell Crops</h1>

            <h4>{`Hello ${user?.email}`}</h4>

            <form className='sell__form' onSubmit={addUser}>

                <img className='sell__formImage' src="https://image.freepik.com/free-vector/document-purchase-customer-purchaser-deal-buying-contract-bill-sale-written-selling-document-execution-sales-contract-concept_335657-226.jpg" alt="" />

                <div className="sell__crop">
                    <p className='sell__cropP'>Available Crops: </p>
                    <Dropdown className='sell__cropMenu' options={options} value={defaultOption} placeholder="Select an option" required />
                </div>

                <div className="sell__selectCrop">
                    <p className='sell__selectCropP'>Crop: </p>
                    <input type="text" placeholder="Enter the crop you want to sell ... " onChange={(e) => setCrop(e.target.value)} style={{ width: '33vw', height: '3vh' }} />
                </div>

                <div className="sell__capacity">
                    <p className='sell__capacityTitle'>Capacity(KG): </p>
                    <input className='sell__capacityInput' type="text" placeholder="Enter your capacity ..." onChange={(e) => setCapacity(e.target.value)} style={{ width: '33vw', height: '3vh' }} required />
                </div>

                <div className="sell__contact">
                    <p className="sell__contactP">Seller's Contact: </p>
                    <input type='text' placeholder='Enter the phone no.' value={contact} onChange={(e) => setContact(e.target.value)} style={{ width: '33vw', height: '3vh' }} />
                </div>

                <div className="sell__price">

                    <div className="sell__priceFields">
                        <p className='sell__priceP'>Price / KG: </p>
                        <input type="text" placeholder='Enter your Price per KG ...' style={{ width: '25vw', height: '3vh' }} onChange={msp} required />
                    </div>


                    <div className="sell__validate">
                        <input type="submit" value='Validate with MSP' onClick={validate} />
                    </div>
                </div>

                <div className="sell__button">
                    <input className='sell__submit' type='submit' value='Submit' disabled />
                </div>

                <div className="sell__redirect">
                    <input type='submit' value='Redirect to Buy page' onClick={() => history.push('/buy')} />
                </div>
            </form>

        </div>
    )
}

export default Sell
