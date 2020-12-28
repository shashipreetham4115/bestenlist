import React, { useState } from 'react';
import { auth, db } from '../DB/firebase';
import Loader from 'react-loader-spinner';
import { Form, Button, Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import "animate.css";

export default function Login({ admintokenoruser, useroradmintoken, dbfolder, redirectlink, adminoruseralreadyloggedmsg, isuserlogin }) {
    const [code, setcode] = useState();
    const [loggedIn, setloggedIn] = useState(false);
    const [state, setstate] = useState({ s: true, s1: true, s2: false, s3: false, s4: false });
    let s = state.s;
    let s1 = state.s1;
    let s2 = state.s2;
    let s3 = state.s3;
    let s4 = state.s4;
    const [s5, sets5] = useState(false);
    const [abc, setabc] = useState(0);
    const [invalid, setinvalid] = useState('notchecked');
    const [adminidcheck, setadminidcheck] = useState('notchecked');
    const [dbcheck, setdbcheck] = useState('notchecked');
    const [user, setuser] = useState({ number: '', name: '', otp: '' });
    let Countrycode = "+91"
    let number = Countrycode.concat(user.number);
    let name = user.name;
    let otp = user.otp;
    const admintokenoruserd = sessionStorage.getItem(admintokenoruser);
    var loggedStatus = () => {
        sessionStorage.removeItem("adminid");
        const useroradmintokend = sessionStorage.getItem(useroradmintoken);
        if (useroradmintokend === null) {
            setloggedIn(false);
        } else {
            setloggedIn(true);
        }
    }
    window.onload = loggedStatus;
    var getData = () => {
        if (admintokenoruserd === null) {
            setinvalid(false);
            db.collection(dbfolder).get().then(snapshot => {
                var abc = 0;
                if (!(snapshot.empty)) {
                    snapshot.forEach((doc) => {
                        abc++;
                        var Data = doc.data();
                        if (number === Data.number){
                               setinvalid("found");
                            if (isuserlogin) {
                                sessionStorage.removeItem("usernameid");
                                sessionStorage.setItem("usernameid", doc.id);
                            } else {
                                sessionStorage.removeItem("adminnameid");
                                sessionStorage.setItem("adminnameid", doc.id);
                            }
                        getotp();
                        }
                        else{
                            if(invalid !== "found" ){setinvalid("notfound")}else{setinvalid('found')}
                        }
                       
            })
            if(invalid === "notfound")
            { store.addNotification({
                    title: "!!Error",
                    message: "Entered Number Not Registed Yet",
                    type: "danger",
                    container: "top-right",
                    insert: "top",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        showIcon: true
                    },
                    width: 300,
                });
            }
        }
        else {
            store.addNotification({
                title: "Message",
                message: "Please Register First",
                type: "info",
                container: "top-right",
                insert: "top",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 3000,
                    showIcon: true
                },
                width: 300,
            });
        }
    }).catch (function (error) {
        console.log(error.message);
    })
}
        else {
    store.addNotification({
        title: "Error!",
        message: adminoruseralreadyloggedmsg,
        type: "danger",
        container: "top-right",
        insert: "top",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000,
            showIcon: true
        },
        width: 280,
    })
}
    }
var getotp = () => {
    if (admintokenoruserd === null) {
        setTimeout(() => { sets5(true); }, 1400);
        setstate({ ...state, s1: false });
        store.addNotification({
            title: "Message",
            message: "Please Do Recaptcha",
            type: "info",
            container: "top-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                showIcon: true
            },
            width: 300,
        });
        let recaptcha = new auth.RecaptchaVerifier('recaptcha', { "size": ((window.innerWidth > 400) ? "normal" : "invisible") });
        auth().signInWithPhoneNumber(number, recaptcha).then(function (codeResult) {
            window.codeResult = codeResult;
            setcode(codeResult)
            setstate({ ...state, s: false })
            store.addNotification({
                title: "Success",
                message: "OTP Sent To Your Number",
                type: "success",
                container: "top-right",
                insert: "top",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 3000,
                    showIcon: true
                },
                width: 300,
            });

        }).catch(function (error) {
            console.log(error.message);
        })
    }
    else {
        store.addNotification({
            title: "Error!",
            message: adminoruseralreadyloggedmsg,
            type: "danger",
            container: "top-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                showIcon: true
            },
            width: 280,
        })
    }
}
var checkotp = () => {
    code.confirm(otp).then(function () {
        if (name !== '') {
            insertValues();
        }
        sessionStorage.setItem(useroradmintoken, "jasfndsdubczjxcnnx");
        setloggedIn(true);
        store.addNotification({
            title: "Success",
            message: "Successfully Logged In",
            type: "success",
            container: "top-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                showIcon: true
            },
            width: 300,
        });
        if (isuserlogin) {

            db.collection('Admin/' + sessionStorage.getItem("adminid") + '/Users').doc(sessionStorage.getItem("usernameid")).set(
                {
                    number: number,
                    name: sessionStorage.getItem("usernameid")
                }
            )



        }

    }).catch(function (error) {
        store.addNotification({
            title: "Error!",
            message: "!! Please Enter Valid OTP",
            type: "danger",
            container: "top-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                showIcon: true
            },
            width: 280,
        })
        console.log(error.message);
    })
}
var insertValues = () => {
    db.collection(dbfolder).get().then(snapshot => {
        if (!(snapshot.empty)) {
            snapshot.forEach(doc => {
                var Data = doc.data();
                if (isuserlogin) {
                    sessionStorage.removeItem("usernameid");
                    sessionStorage.setItem("usernameid", (doc.id));
                } else {
                    sessionStorage.removeItem("adminnameid");
                    sessionStorage.setItem("adminnameid", (doc.id));
                }
                if (name !== doc.id) {
                    if (number !== Data.number) {
                        db.collection(dbfolder).doc(name).set(
                            {
                                number: number,
                                name: name
                            }
                        )
                    }
                }
            })
        }
        else {
            db.collection(dbfolder).doc(name).set(
                {
                    number: number,
                    name: name
                }
            )
        }
    })

}
if (loggedIn) {
    return <Redirect to={redirectlink} />;
}

return (
    <div style={{ backgroundImage: "linear-gradient( 109.2deg,  rgba(254,3,104,0.7) 9.3%, rgba(103,3,255,0.8) 78.5% )" }}>

        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} >

            <div className="w-100" style={{ maxWidth: "350px" }} >
                <div style={{ background: "rgba(0,0,0,0.35)", boxShadow: "10px 14px 16px rgba(0,0,0,0.5)", padding: "20px" }} >
                    <div>
                        <h2 className="text-center mb-4" style={{ color: "white" }}>{s1 ? (s2 ? "Register" : "Login") : (s ? "Recaptcha" : "OTP")}</h2>
                        {s2 ?
                            <Form >
                                {s ?
                                    <div><br />
                                        <Form.Group id="username" style={{ display: (s1 ? "block" : "none") }}>

                                            <Form.Control type="text" placeholder="Enter Username" style={{ opacity: "0.6", borderRadius: "20px" }}
                                                onChange={(e) => {
                                                    setstate({ ...state, s3: false })
                                                    console.clear(); setuser({ ...user, name: e.target.value });; console.clear();
                                                    db.collection(dbfolder).get().then(snapshot => {
                                                        if (!(snapshot.empty)) {
                                                            snapshot.forEach(doc => {
                                                                if (e.target.value === doc.id) {
                                                                    setstate({ ...state, s3: true })
                                                                }
                                                            });
                                                        }
                                                    });
                                                    setTimeout(() => { console.clear() }, 1000);
                                                }}
                                                required />
                                        </Form.Group>

                                        {!s1 ? s5 ? null :
                                            <Loader type="Oval" color="#1874CD" height="80" width="80" />
                                            :
                                            null
                                        }
                                        <Form.Group id="number" style={{ opacity: (s1 ? 1 : 0) }}>
                                            <Form.Control type="text" style={{ opacity: "0.6", borderRadius: "20px" }} placeholder="Enter Your Mobile Number" onChange={(e) => {
                                                setstate({ ...state, s4: false })
                                                setuser({ ...user, number: e.target.value }); console.clear();
                                                db.collection(dbfolder).get().then(snapshot => {
                                                    if (!(snapshot.empty)) {
                                                        snapshot.forEach(doc => {
                                                            var Data = doc.data();
                                                            if (Countrycode.concat(e.target.value) === Data.number) {
                                                                setstate({ ...state, s4: true })
                                                            }
                                                        });
                                                    }
                                                });
                                                setTimeout(() => { console.clear() }, 1000);
                                            }}
                                                required />
                                        </Form.Group>
                                        <div id="recaptcha"></div>
                                        <div>
                                            {isuserlogin ?
                                                <Form.Group id="name" style={{ display: (s1 ? "block" : "none") }}>

                                                    <Form.Control type="text" style={{ opacity: "0.6", borderRadius: "20px" }} placeholder="Enter Your Instructor Id" onChange={(e) => {
                                                        setadminidcheck('notchecked');
                                                        db.collection('Admin').get().then(snapshot => {
                                                            if (!(snapshot.empty)) {
                                                                snapshot.forEach(doc => {
                                                                    if ((e.target.value) === doc.id) {
                                                                        setadminidcheck('found');
                                                                    }
                                                                });
                                                            }
                                                        });
                                                        sessionStorage.setItem("adminid", e.target.value);
                                                    }} required />

                                                </Form.Group>
                                                : null
                                            }
                                        </div><br />
                                        <Button style={{ display: (s1 ? "block" : "none"), opacity: "0.7", borderRadius: "20px" }} className="w-100" onClick={function () {
                                            if (name !== '' && user.number !== '') {
                                                if (s3 === false && s4 === false) {
                                                    if (isuserlogin) {
                                                        if ((sessionStorage.getItem("adminid")) !== null) {
                                                            if (adminidcheck === "found") {
                                                                getotp()
                                                            }
                                                            else {
                                                                store.addNotification({
                                                                    title: "Error!",
                                                                    message: "!! Entered Instructor Id Not Found",
                                                                    type: "danger",
                                                                    container: "top-right",
                                                                    insert: "top",
                                                                    animationIn: ["animated", "fadeIn"],
                                                                    animationOut: ["animated", "fadeOut"],
                                                                    dismiss: {
                                                                        duration: 3000,
                                                                        showIcon: true
                                                                    },
                                                                    width: 280,
                                                                })
                                                            }
                                                        }
                                                        else {
                                                            store.addNotification({
                                                                title: "Error!",
                                                                message: "!! Any field should not be empty",
                                                                type: "danger",
                                                                container: "top-right",
                                                                insert: "top",
                                                                animationIn: ["animated", "fadeIn"],
                                                                animationOut: ["animated", "fadeOut"],
                                                                dismiss: {
                                                                    duration: 3000,
                                                                    showIcon: true
                                                                },
                                                                width: 280,
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        getotp()
                                                    }
                                                }
                                                else if (s3 === true) {
                                                    store.addNotification({
                                                        title: "Error!",
                                                        message: "!! Username already exist,please use another",
                                                        type: "danger",
                                                        container: "top-right",
                                                        insert: "top",
                                                        animationIn: ["animated", "fadeIn"],
                                                        animationOut: ["animated", "fadeOut"],
                                                        dismiss: {
                                                            duration: 3000,
                                                            showIcon: true
                                                        },
                                                        width: 300,
                                                    })
                                                } else {
                                                    store.addNotification({
                                                        title: "Error!",
                                                        message: "!! Number already used,please use another",
                                                        type: "danger",
                                                        container: "top-right",
                                                        insert: "top",
                                                        animationIn: ["animated", "fadeIn"],
                                                        animationOut: ["animated", "fadeOut"],
                                                        dismiss: {
                                                            duration: 3000,
                                                            showIcon: true
                                                        },
                                                        width: 300,
                                                    })
                                                }
                                            } else {
                                                store.addNotification({
                                                    title: "Error!",
                                                    message: "!! Any field should not be empty",
                                                    type: "danger",
                                                    container: "top-right",
                                                    insert: "top",
                                                    animationIn: ["animated", "fadeIn"],
                                                    animationOut: ["animated", "fadeOut"],
                                                    dismiss: {
                                                        duration: 3000,
                                                        showIcon: true
                                                    },
                                                    width: 280,
                                                })
                                            }
                                        }} >Get OTP</Button>
                                        <div style={{ display: (s1 ? "block" : "none"), color: "white" }}>
                                            <br /><h6>Already have an account?</h6>
                                            <Button style={{ opacity: "0.7", borderRadius: "20px" }} className="w-20" onClick={function () { setstate({ ...state, s2: false }) }}>Login</Button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Form.Group id="number">
                                            <Form.Label>OTP</Form.Label>
                                            <Form.Control type="number" style={{ opacity: "0.7", borderRadius: "20px" }} onChange={(e) => { setuser({ ...user, otp: e.target.value }); }} required />
                                        </Form.Group>
                                        <Button className="w-100" onClick={checkotp}>Register</Button>
                                    </div>
                                }
                            </Form>
                            :
                            <Form className="">
                                {s ?
                                    <div><br />
                                        {!s1 ? s5 ? null :
                                            <div><br /> <Loader type="Oval" color="#1874CD" height="80" width="80" /></div>
                                            :
                                            null
                                        }
                                        <Form.Group id="number" style={{ opacity: (s1 ? 1 : 0) }}>

                                            <Form.Control type="number" style={{ opacity: "0.6", borderRadius: "20px" }} placeholder=" Enter Your Phone number"
                                                onChange={(e) => {
                                                    setuser({ ...user, number: e.target.value });
                                                }} required />
                                        </Form.Group>

                                        <div id="recaptcha"></div>
                                    
                                        

                                        
                                        <div>
                                            {isuserlogin ?
                                                <Form.Group id="name" style={{ display: (s1 ? "block" : "none") }}>

                                                    <Form.Control type="text" style={{ opacity: "0.6", borderRadius: "20px" }} placeholder="Enter Your Instructor Id" onChange={(e) => {
                                                        setadminidcheck('notchecked');
                                                        db.collection('Admin').get().then(snapshot => {
                                                            if (!(snapshot.empty)) {
                                                                snapshot.forEach(doc => {
                                                                    if ((e.target.value) === doc.id) {
                                                                        setadminidcheck('found');
                                                                    }
                                                                });
                                                            }
                                                        });
                                                        sessionStorage.setItem("adminid", e.target.value);
                                                    }} required />
                                                    <div style={{ display: ((adminidcheck === "notfound") ? "block" : "none"), color: "red", fontSize: "13px" }}>
                                                        !!! Instructor Id Not Found !!!
                                                    </div>
                                                </Form.Group>
                                                : null
                                            }
                                        </div><br />
                                        <Button style={{ display: (s1 ? "block" : "none"), opacity: "0.7", borderRadius: "20px" }} className="w-100" onClick={function () {
                                            if (user.number !== '') {
                                                if (isuserlogin) {
                                                    if ((sessionStorage.getItem("adminid")) !== null) {
                                                        if (adminidcheck === "found") {
                                                           getData();
                                                        }
                                                        else {
                                                            store.addNotification({
                                                                title: "Error!",
                                                                message: "!! Entered Instructor Id Not Found",
                                                                type: "danger",
                                                                container: "top-right",
                                                                insert: "top",
                                                                animationIn: ["animated", "fadeIn"],
                                                                animationOut: ["animated", "fadeOut"],
                                                                dismiss: {
                                                                    duration: 3000,
                                                                    showIcon: true
                                                                },
                                                                width: 280,
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        store.addNotification({
                                                            title: "Error!",
                                                            message: "!! Any field should not be empty",
                                                            type: "danger",
                                                            container: "top-right",
                                                            insert: "top",
                                                            animationIn: ["animated", "fadeIn"],
                                                            animationOut: ["animated", "fadeOut"],
                                                            dismiss: {
                                                                duration: 3000,
                                                                showIcon: true
                                                            },
                                                            width: 280,
                                                        })
                                                    }
                                                }
                                                else {
                                                   getData();
                                                }
                                            } else {
                                                store.addNotification({
                                                    title: "Error!",
                                                    message: "!! Any field should not be empty",
                                                    type: "danger",
                                                    container: "top-right",
                                                    insert: "top",
                                                    animationIn: ["animated", "fadeIn"],
                                                    animationOut: ["animated", "fadeOut"],
                                                    dismiss: {
                                                        duration: 3000,
                                                        showIcon: true
                                                    },
                                                    width: 280,
                                                })
                                            }
                                        }} >Get OTP</Button>
                                        <div style={{ display: (s1 ? "block" : "none"), color: "white" }}>
                                            <br /><h6>Don't have an account?</h6>
                                            <Button className="w-20 " style={{ opacity: "0.7", borderRadius: "20px" }} onClick={function () { setstate({ ...state, s2: true }) }}>Register</Button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Form.Group id="number">
                                            <Form.Label>OTP</Form.Label>
                                            <Form.Control type="number" style={{ opacity: "0.7", borderRadius: "20px" }} placeholder="Enter Your OTP" onChange={(e) => { setuser({ ...user, otp: e.target.value }) }} required />
                                        </Form.Group>
                                        <Button className="w-100" onClick={checkotp}>Login</Button>
                                    </div>
                                }
                            </Form>
                        }
                    </div>
                </div>
            </div>
        </Container>
    </div>
);
}
