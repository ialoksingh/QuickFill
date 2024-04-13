//ChargerAvailability.jsx
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import Select from "react-select";
import toast from 'react-hot-toast'; // Import toast for notifications
import axios from "axios"; // Import axios for HTTP requests
import Clock from "./Clock";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); // Set the app element

const ChargerAvailability = ({charger, userId, pumpId, }) => {
    const {available, percent, time, slots, queue} = charger;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [vehicleNo, setVehicleNo] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Generate time slots for the dropdown
    const generateTimeSlots = () => {
        const slots = [];
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = Math.ceil(currentTime.getMinutes() / 10) * 10; // Round minutes to the nearest multiple of 10
        for (let i = 0; i < 6; i++) {
            const minutes = currentMinute + i * 10;
            const slotTimeStart = new Date(currentTime.getTime());
            slotTimeStart.setHours(currentHour);
            slotTimeStart.setMinutes(minutes);

            const slotTimeEnd = new Date(currentTime.getTime());
            slotTimeEnd.setHours(currentHour);
            slotTimeEnd.setMinutes(minutes + 10);

            const formattedTimeStart = slotTimeStart.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
            const formattedTimeEnd = slotTimeEnd.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
            slots.push({value: `${formattedTimeStart} - ${formattedTimeEnd}`, label: `${formattedTimeStart} - ${formattedTimeEnd}`});
        }
        return slots;
    };

    const handleSlotSelect = (selectedOption) => {
        setSelectedSlot(selectedOption);
    };
    // useEffect (() => {
    //     const date = new Date().toISOString().substr(0, 10);
    //     console.log(date)
    // },date)
    const handleBooking = async () => {
        if (!vehicleNo || !selectedSlot) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const bookingData = {
                userId: userId,
                pumpId: pumpId,
                vehicleNo: vehicleNo,
                timeSlot: selectedSlot.value,
                bookedAt: new Date()

            };

            const response = await axios.post('http://localhost:5000/Booking/EV', bookingData);
            if (response.status === 201) {
                // Booking successful
                // updatePumpsData(pumpId);
                closeModal();
                toast.success('Slot booked successfully');
            }
        } catch (error) {
            toast.error('Error booking slot');
        }
    };

    return (
        <div className="ev-charger">
            <h3>Electric Charger Availability</h3>
            <p>Available: {available ? "Yes" : "No"}</p>
            <p>Speed: {percent || '0'}% in {time || "0"} Minutes</p>
            <p>Slots: {slots}</p>
            <p>Current Queue: {queue}</p>
            {available && <button onClick={openModal}>Book Your Slot</button>}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 className="modalTtitle">Book Your Charging Slot</h2>
                <Clock />
                <form>
                    <input
                        placeholder="Enter Your Vehicle No."
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                    />
                    <Select
                        options={generateTimeSlots()}
                        onChange={handleSlotSelect}
                        value={selectedSlot}
                        placeholder="Select Time Slot"
                    />
                    <button className="btn" type="button" onClick={handleBooking}>Book</button>
                </form>
                <button onClick={closeModal} className="btn red">Close</button>
            </Modal>
            <style jsx="true"> {`
                        .ev-charger{
                            text-align: center;
                            margin: 10px 0;
                            padding: 20px;
                            border: 1px solid #ddd;
                            box-shadow: 0  4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                            width: 40%;
                            h3{
                                color:#0069d9 !important;
                                font-size:30px !important;
                                font-weight:750 !important;
                            }
                            p{
                                font-size: 24px;
                                line-height: 22px;  
                                font-weight:800px;
                                color:green;
                            }
                            button{
                                background: green;
                                color: white;
                                outline: none;
                                cursor: pointer;
                                border:none;
                                padding:13px 15px;
                                font-size:18px;
                                border-radius:10px;
                            }
                        }
                        .btn{
                            background: #0069d9;
                            color: white;
                            padding: 8px 59px;
                            border: none;
                            cursor: pointer;
                            font-size: 14pt;
                            margin: 6px 5px;
                            width: calc(100% - 10px);
                        }
                        .red{
                            background: #ff8a00;
                        }
                        input{
                            color:black;
                            font-size:16px;
                            letter-spacing:1px;
                            padding:8px 10px;
                            border:1px solid #cdcdcd;
                            border-radius:3px;
                        }
                        .modalTtitle{
                                margin:2px 0;
                            }

            `}</style>
        </div >
    );
};

export default ChargerAvailability;
