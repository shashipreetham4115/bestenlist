import React from 'react';
import LoginCard from '../Login/LoginCard';

export default function Login(){
    return(
        <div>
            {/* Admin login card */}
            <LoginCard
              admintokenoruser = "usertoken"
              useroradmintoken = "admintoken"
              dbfolder = "Admin"
              redirectlink = {"/admin/home"}
              adminoruseralreadyloggedmsg = "!! PLease SignOut From User Login"
              isuserlogin = {false}
            />
        </div>
    )
}

// import React, { useState } from 'react';
// import { auth, db } from '../DB/firebase';
// import Loader from 'react-loader-spinner';
// import { Form, Button, Card, Container } from 'react-bootstrap';
// import { Redirect } from "react-router-dom";


// export default function Login() {
//     const [code, setcode] = useState();
//     const [loggedIn, setloggedIn] = useState(false);
//     const [state, setstate] = useState({ s: true, s1: true, s2: false, s3: false, s4: false });
//     let s = state.s;
//     let s1 = state.s1;
//     let s2 = state.s2;
//     let s3 = state.s3;
//     let s4 = state.s4;
//     const [s5, sets5] = useState(false);
//     const [field, setfield] = useState(false);
//     const [invalid, setinvalid] = useState(false);
//     const [invalidotp, setinvalidotp] = useState(false);
//     const [checkuser, setcheckuser] = useState(false);
//     const [user, setuser] = useState({ number: '', name: '', otp: '' });
//     let Countrycode = "+91"
//     let number = Countrycode.concat(user.number);
//     let name = user.name;
//     let otp = user.otp;
//     const usertoken = sessionStorage.getItem("usertoken");
//     var loggedStatus = () => {
//         const admintoken = sessionStorage.getItem("admintoken");
//         if (admintoken === null) {
//             setloggedIn(false);
//         } else {
//             setloggedIn(true);
//         }
//     }
//     window.onload = loggedStatus;
//     var getData = () => {
//         if (usertoken === null) {
//             if (number !== '') {

//                 db.collection('Admin').get().then(snapshot => {
//                     if (!(snapshot.empty)) {
//                         snapshot.forEach(doc => {
//                             var Data = doc.data();
//                             if (number === Data.number)
//                                 getotp();
//                             else
//                                 setinvalid(true);
//                         })
//                     }
//                     else {
//                         setinvalid(true);
//                     }
//                 }).catch(function (error) {
//                     console.log(error.message);
//                 })
//             }
//             else {
//                 setinvalid(true);
//             }
//         }
//         else {
//             setcheckuser(true);
//         }
//     }
//     var getotp = () => {
//         if (usertoken === null) {
//             setTimeout(() => { sets5(true); }, 1400);
//             setstate({ ...state, s1: false });
//             let recaptcha = new auth.RecaptchaVerifier('recaptcha');
//             auth().signInWithPhoneNumber(number, recaptcha).then(function (codeResult) {
//                 window.codeResult = codeResult;
//                 setcode(codeResult)
//                 setstate({ ...state, s: false })

//             }).catch(function (error) {
//                 console.log(error.message);
//             })
//         }
//         else {
//             setcheckuser(true);
//         }
//     }
//     var checkotp = () => {
//         code.confirm(otp).then(function () {
//             if (name !== '') {
//                 insertValues();
//             }
//             sessionStorage.setItem("admintoken", "gfncxkfgcmvlutckfghvbnlvhb");
//             setloggedIn(true);
//         }).catch(function (error) {
//             setinvalidotp(true);
//             console.log(error.message);
//         })
//     }
//     var insertValues = () => {
//         db.collection('AdminUser').get().then(snapshot => {
//             if (!(snapshot.empty)) {
//                 snapshot.forEach(doc => {
//                     var Data = doc.data();
//                     if (name !== doc.id) {
//                         if (number !== Data.number) {
//                             db.collection('Admin').doc(name).set(
//                                 {
//                                     number: number,
//                                     name: name
//                                 }
//                             )
//                         }
//                     }
//                 })
//             }
//             else {
//                 db.collection('Admin').doc(name).set(
//                     {
//                         number: number,
//                         name: name
//                     }
//                 )
//             }
//         })

//     }
//     if (loggedIn) {
//         return <Redirect to="/admin/home" />;
//     }
//     return (
//         <div>
//             <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
//                 <div className="w-100" style={{ maxWidth: "400px" }}>
//                     <Card>
//                         <Card.Body>
//                             <h2 className="text-center mb-4">{s1 ? (s2 ? "Sign Up" : "Sign In") : (s ? "Recaptcha" : "OTP")}</h2>
//                             {s2 ?
//                                 <Form>
//                                     {s ?
//                                         <div>
//                                             <div style={{ display: (field ? "block" : "none"), color: "red", fontSize: "13px" }}>
//                                                 !! Any field should not be empty</div>
//                                             <div style={{ display: (checkuser ? "block" : "none"), color: "red", fontSize: "13px" }}>
//                                                 !! Please SignOut from User Login</div>
//                                             <Form.Group id="username" style={{ display: (s1 ? "block" : "none") }}>
//                                                 <Form.Label >Username</Form.Label>
//                                                 <Form.Control type="text"
//                                                     onChange={(e) => {
//                                                         setstate({ ...state, s3: false })
//                                                         console.clear(); setuser({ ...user, name: e.target.value }); setfield(false); console.clear();
//                                                         db.collection('Admin').get().then(snapshot => {
//                                                             if (!(snapshot.empty)) {
//                                                                 snapshot.forEach(doc => {
//                                                                     if (e.target.value === doc.id) {
//                                                                         setstate({ ...state, s3: true })
//                                                                     }
//                                                                 });
//                                                             }
//                                                         });
//                                                         setTimeout(() => { console.clear() }, 1000);
//                                                     }}
//                                                     required />
//                                                 <div style={{ display: (s3 ? "block" : "none"), color: "red", fontSize: "13px" }}>
//                                                     ! Username already exist,please use another</div>
//                                             </Form.Group>

//                                             {!s1 ? s5 ? null :
//                                                 <Loader type="Oval" color="#1874CD" height="80" width="80" />
//                                                 :
//                                                 null
//                                             }
//                                             <Form.Group id="number" style={{ opacity: (s1 ? 1 : 0.1) }}>
//                                                 <Form.Label >Phone Number</Form.Label>
//                                                 <Form.Control type="text" onChange={(e) => {
//                                                     setstate({ ...state, s4: false })
//                                                     setuser({ ...user, number: e.target.value }); setfield(false); console.clear();
//                                                     db.collection('Admin').get().then(snapshot => {
//                                                         if (!(snapshot.empty)) {
//                                                             snapshot.forEach(doc => {
//                                                                 var Data = doc.data();
//                                                                 if (e.target.value === Data.number) {
//                                                                     setstate({ ...state, s4: true })
//                                                                 }
//                                                             });
//                                                         }
//                                                     });
//                                                     setTimeout(() => { console.clear() }, 1000);
//                                                 }}
//                                                     required />
//                                                 <div style={{ display: (s4 ? "block" : "none"), color: "red", fontSize: "13px" }}>! Number already used,please use another</div>
//                                             </Form.Group>
//                                             <div id="recaptcha"></div>
//                                             <Button style={{ display: (s1 ? "block" : "none") }} className="w-100" onClick={function () {
//                                                 if (name !== '' && number !== '') {
//                                                     if (s3 === false && s4 === false) { getotp() }
//                                                 } else { setfield(true); }
//                                             }}>Get OTP</Button><br></br>
//                                             <div style={{ display: (s1 ? "block" : "none") }}>
//                                                 <br /><h6>Already have an account?</h6>
//                                                 <Button className="w-20" onClick={function () { setstate({ ...state, s2: false }) }}>Sign In</Button>
//                                             </div>
//                                         </div>
//                                         :
//                                         <div>
//                                             <div style={{ display: (invalidotp ? "block" : "none"), color: "red", fontSize: "13px" }}>
//                                                 !!! Invalid OTP</div>
//                                             <Form.Group id="number">
//                                                 <Form.Label>OTP</Form.Label>
//                                                 <Form.Control type="number" onChange={(e) => { setuser({ ...user, otp: e.target.value }); setinvalidotp(false) }} required />
//                                             </Form.Group>
//                                             <Button className="w-100" onClick={checkotp}>Sign Up</Button>
//                                         </div>
//                                     }
//                                 </Form>
//                                 :
//                                 <Form>
//                                     {s ?
//                                         <div>
//                                             <div style={{ display: (invalid ? s1 ? "block" : "none" : "none"), color: "red", fontSize: "13px" }}>
//                                                 !! Number Not Registered</div>
//                                             <div style={{ display: (checkuser ? "block" : "none"), color: "red", fontSize: "13px" }}>
//                                                 !! Please SignOut from User Login</div>
//                                             {!s1 ? s5 ? null :
//                                                 <div><br /> <Loader type="Oval" color="#1874CD" height="80" width="80" /></div>
//                                                 :
//                                                 null
//                                             }
//                                             <br /><div id="recaptcha"></div>
//                                             <Form.Group id="number" style={{ opacity: (s1 ? 1 : 0.1) }}>
//                                                 <Form.Label >Phone number</Form.Label>
//                                                 <Form.Control type="text" onChange={(e) => { setuser({ ...user, number: e.target.value }); setinvalid(false); }} required />
//                                             </Form.Group>
//                                             <Button style={{ display: (s1 ? "block" : "none") }} className="w-100" onClick={getData} >Get OTP</Button>
//                                             <div style={{ display: (s1 ? "block" : "none") }}>
//                                                 <br /><h6>Don't have an account?</h6>
//                                                 <Button className="w-20" onClick={function () { setstate({ ...state, s2: true }) }}>Sign Up</Button>
//                                             </div>
//                                         </div>
//                                         :
//                                         <div>
//                                             <div style={{ display: (invalidotp ? "block" : "none"), color: "red", fontSize: "13px" }}>
//                                                 !!! Invalid OTP</div>
//                                             <Form.Group id="number">
//                                                 <Form.Label>OTP</Form.Label>
//                                                 <Form.Control type="number" onChange={(e) => { setuser({ ...user, otp: e.target.value }); setinvalidotp(false) }} required />
//                                             </Form.Group>
//                                             <Button className="w-100" onClick={checkotp}>Sign In</Button>
//                                         </div>
//                                     }
//                                 </Form>
//                             }
//                         </Card.Body>
//                     </Card>
//                 </div>
//             </Container>
//         </div>
//     );
// }
