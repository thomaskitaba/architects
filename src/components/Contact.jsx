// import Chief from '../assets/img/chief.png';
// import Chief2 from '../assets/img/chief-2.png';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';


const Contact = () => {
const formInitialsDetail = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  message: ''
}

const [form, setForm] = useState(formInitialsDetail);
const [buttonText, setButtonText] = useState('Send');
const [status, setStatus] = useState({});
const [screenSize, setScreenSize] = useState(window.innerWidth);
const [fname, setFname] = useState('');
const [lname, setLname] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [message, setMessage] = useState('');

// const [endpoint, setEndpoint] = useState('http://localhost:5000');
const [endpoint, setEndpoint] = useState('https://tom-restorant.onrender.com');

// get the width of the screen
useEffect(() => {
  const handleResize = () => setScreenSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  }
}, [screenSize]);

// const onFormUpdate = (formField, value) => {
//   setForm({
//     ...formField,
//     [formField]: value
//   })
// }
const handelFormSubmit = async (e) => {
  e.preventDefault();
  setButtonText('Sending...');
  const formData = {
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        message: message
      };
  // alert(`${fname}, ${lname}, ${phone}, ${email}, ${message}`);
  let response = await fetch( `${endpoint}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(formData),
    });

  setButtonText('Send');
  setFname('');
  setLname('');
  setPhone('');
  setEmail('');
  setMessage('');

  setForm(formInitialsDetail);
  let result = await response.json();
  if (result.code === 200) {
    setStatus({success: true, message: 'Message sent successfully'});
  } else {
    setStatus({success: false, message: 'Something went wrong, please try again later.'});
  }
}

return (
//   <Container>
//     <div className="align-items-center">
//     <div md={6}>
//       Content for the first divumn
//     </div>
//     <div md={6}>
//       Content for the second divumn
//     </div>
//   </div>
// </Container>
<Container>
  <div className="contact" id="connect">
    <div>
      <div className="align-items-center flex md={6}">
        <div className="contact-note">
          {/* {screenSize > 768 ? <img src={Chief} alt="Contact image Chief standing" /> : <img src={Chief2} alt="Contact image Chief standing" />} */}
          <div className='contact-paragraph'>
            <h3>Our team of experienced consultants can assist you with:</h3>
          <div className='contact-paragraph-list'>
            <ul>
              <li>Education planning and strategy</li>
              <li>Curriculum development</li>
              <li>Teaching methodologies</li>
              <li>Student assessments</li>
              <li>Education technology integration</li>
              <li>And much more!</li>
            </ul>
          </div>
          <div className="contact-paragraph-footer">
            <p>Feel free to reach out to us using the contact form below. We're passionate about education and look forward to helping you achieve your goals.</p>
          </div>
          </div>
        </div>
        <div className="contact-form">
          <h1>Let's Connect</h1>
          <form onSubmit={handelFormSubmit} className="forms" >
            <div className="px-1">
              <div >
                <input type="text" placeholder="First Name" name="fname" value={fname} onChange={ (e) => setFname(e.target.value)} />
              </div>
              <div >
                <input type="text" placeholder="Last Name" name="lname" value={lname} onChange={ (e) => setLname(e.target.value)} />
              </div>
            </div>
            <div className="px-1">
              <div >
                <input type="email" placeholder="Email" name="email" value={email} onChange={ (e) => setEmail(e.target.value)} />
                <input type="tel" value={phone} placeholder="Phone No." onChange={(e) => setPhone(e.target.value)}/>
                <textarea placeholder="Message" name="messge" value={message} onChange={ (e) => setMessage(e.target.value)} />
              </div>
            </div>
            <div>
              <div >
                <button type="submit"><span>{buttonText}</span></button>
              </div>
              {
                  status.message &&
                  <div className="px-1">
                    <p className={status.success === true ? "sucess" : "danger"}></p>
                  </div>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </Container>
)
}

export default Contact;