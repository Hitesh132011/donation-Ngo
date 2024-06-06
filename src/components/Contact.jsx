import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
const Contact = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");

  const [phone,setPhone]=useState("");

  const [message,setMessage]=useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/message/send",
        { name, email, phone, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <section className='contact'>
      <div className="container">
        <div className="banner">
          <form onSubmit={handleSendMessage}>
            <h2>CONTACT US</h2>
            <div>
              <input type="text"  value={name} placeholder='Your Name' onChange={(e)=>setName(e.target.value)}/>
              <input type="text" value={email} placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)}/>
              <input type="text" value={phone} placeholder='Phone Number' onChange={(e)=>setPhone(e.target.value)}/>
              
            </div>
            <textarea name="10"  value={message} placeholder='Type Your Message' onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button className='btn' type='submit'>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
