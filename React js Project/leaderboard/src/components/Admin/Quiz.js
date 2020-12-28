import React, { useState, useEffect } from 'react';
import { auth, db } from '../DB/firebase';
import Loader from 'react-loader-spinner';
import { Form, Button, Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import "animate.css"
import './styles.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {NavLink} from "react-router-dom"

export default function Quiz() {
    const [quizid, setquizid] = useState(false);
    const [loggedIn, setloggedIn] = useState();
    const [quizquestions, setquizquestions] = useState(false);
    const [questionscard, setquestionscard] = useState(true);
    const [quizTitle, setquizTitle] = useState('');
    const [quizId, setquizId] = useState('');
    const [h, seth] = useState('hello');
    const [question, setquestion] = useState('');
    const [noofanswers, setnoofanswers] = useState(0);
    const [option1, setoption1] = useState('');
    const [checked, setchecked] = useState({ option1: false, option2: false, option3: false, option4: false });
    const [option, setoption] = useState({ option1: false, option2: false, option3: false, option4: false });
    const [option2, setoption2] = useState('');
    const [option3, setoption3] = useState('');
    const [option4, setoption4] = useState('');
    const [quizlist, setquizlist] = useState([{ question: "Loading..." }]);
    const [quiztitles, setquiztitles] = useState([{ quiztitle: "Loading...", quizid: "Loading..." }]);
    const [reset, setreset] = useState(false);
    const [loader, setloader] = useState('false');
    const [titlecheck, settitlecheck] = useState('notchecked');

    useEffect(() => {
        var d = new Date();
        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var hours = d.getHours();
        var mins = d.getMinutes();
        var seconds = d.getSeconds();
        var quizIds = date + "" + month + "" + year + "" + hours + "" + mins + "" + seconds;
        setquizId(quizIds);
    }, []);
    useEffect(() => {
        db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes').onSnapshot(snapshot => {
            var array = [];
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    var Data = doc.data();
                    array.push({ quiztitle: Data.quiztitle, quizid: (doc.id), active: Data.active });
                });
                setquiztitles(array);
            }
            else {
                setquiztitles([{ quiztitle: "You Not Created Any Quiz", quizid: "You Not Created Any Quiz" }])
            }
        });
    }, []);
    var questionCard = () => {
        db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes').doc(quizId).set(
            {
                quiztitle: quizTitle,

            }
        )
        setTimeout(() => { setquestionscard(false); }, 2000);
    }
    var addQuestions = () => {
        db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes/' + quizId + '/questions').add(
            {
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                noofanswers: noofanswers,
                correctanswer: checked
            }
        ).then(setquestion(''), setoption1(''), setoption2(''), setoption3(''), setoption4(''), setnoofanswers(0),
            setchecked({ option1: false, option2: false, option3: false, option4: false }))
    }
    var post = () => {
        setloader('posting');
        setTimeout(() => { window.location.reload(true) }, 1300);
    }
    const admintoken = sessionStorage.getItem("admintoken");
    var loggedStatus = () => {
        if (admintoken === null) {
            setloggedIn(false);
        } else {
            setloggedIn(true);
        }
    }
    window.onload = loggedStatus;
    if (loggedIn === false) {
        return <Redirect to="/admin" />
    }
    function hello(e) {
        console.log("hello");
    }
    return (
        <div className="main">
            <div className="navbar-head">
                <div className="navbar">
                    <div className="brand">LeaderBoards</div>
                    <div className="nav-list">
                        <h6 onClick={function () {
                            sessionStorage.removeItem("admintoken");
                            setloggedIn(false)
                        }}>Logout</h6>
                        {!quizquestions && questionscard && !quizid ?
                            <NavLink to={"/admin/home"} className="link">Users</NavLink>
                            :
                            <h6 onClick={() => { window.location.reload(true) }}>Home</h6>
                        }
                    </div>
                </div>
            </div>
            <div>
                {!quizquestions ?
                    <div>
                        {questionscard ?
                            <div>
                                {!quizid ?
                                    <div>
                                        <div className="heading">Quizes List</div>
                                        <div className="titlebox-div">

                                            <div className="titlebox ">

                                                {
                                                    quiztitles.map((i, k) => {
                                                        return (

                                                            <div className="title" key={i, k}>
                                                                {(i.quiztitle === "Loading..." || i.quiztitle === "You Not Created Any Quiz") ? <h6>{i.quiztitle}</h6> :
                                                                    <>
                                                                        <h6 onClick={function () {
                                                                            var array1 = [];
                                                                            db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes/' + i.quizid + '/questions').get().then(snapshot => {
                                                                                snapshot.forEach(doc => {

                                                                                    array1.push([doc.data(), i.quizid, doc.id]);

                                                                                });

                                                                                setquizlist(array1);

                                                                            });
                                                                            setquizquestions(true);
                                                                        }

                                                                        }> {(((i.quiztitle).length > 20) ? ((i.quiztitle).slice(0, 20).concat("...")) : (i.quiztitle))}  </h6>
                                                                        <div className='titleimgdiv'>
                                                                            <img onClick={() => {

                                                                                db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes/' + i.quizid + '/questions').get().then((s) => {
                                                                                    s.forEach((doc) => {
                                                                                        db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes/' + i.quizid + '/questions').doc(doc.id).delete()
                                                                                    });

                                                                                });
                                                                                db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes').doc(i.quizid).delete();
                                                                            }} src="https://img.icons8.com/material/25/000000/delete-forever--v1.png" alt="" />
                                                                            {(i.active !== true) ?
                                                                                <img onClick={() => {

                                                                                    db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes').doc(i.quizid).update(
                                                                                        {
                                                                                            active: true
                                                                                        }
                                                                                    )
                                                                                    // setTimeout(()=>{setactive('true'+(i.quizid))},1000)

                                                                                }}
                                                                                    src="https://img.icons8.com/fluent-systems-filled/22/000000/play.png" />
                                                                                : <img onClick={() => {
                                                                                    db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes').doc(i.quizid).update(
                                                                                        {
                                                                                            active: false
                                                                                        }
                                                                                    )
                                                                                    // setTimeout(()=>{setactive('false'+(i.quizid))},1000)
                                                                                }}
                                                                                    src="https://img.icons8.com/material-sharp/25/fa314a/stop.png" />
                                                                            }
                                                                        </div>
                                                                    </>
                                                                }

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="createquizbtn">
                                            <button onClick={() => { setquizid(true); }}><img alt='' src="https://img.icons8.com/fluent/20/000000/plus-math.png" /> Create Quiz</button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "75vh" }}>
                                            <div className="w-100" style={{ maxWidth: "300px" }}>

                                                <Form>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Quiz Title"
                                                            onChange={(e) => {
                                                                setquizTitle(e.target.value); settitlecheck('notchecked');
                                                                db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes').get().then((s) => {
                                                                    s.forEach((doc) => {
                                                                        if (doc.data().quiztitle === e.target.value) {
                                                                            settitlecheck('titlefound')
                                                                        }
                                                                    });
                                                                });
                                                            }}
                                                            required
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        {/* <Form.Control
                                                    type="number"
                                                    placeholder="Enter Duration Of Quiz In Minutes"
                                                    onChange={(e) => { setduration(e.target.value); setreset(false); }}
                                                /> */}
                                                    </Form.Group>
                                                    <Button className="d-flex align-items-center justify-content-center" style={{ marginLeft: "100px", borderRadius: "25px" }} onClick={() => {

                                                        if (quizTitle !== '') {
                                                            if (titlecheck === 'titlefound') {
                                                                store.addNotification({
                                                                    title: "Error!",
                                                                    message: "!! Title Already Used For Another Quiz",
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
                                                            } else {
                                                                setloader('addquestions')
                                                                questionCard()
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
                                                    }}>{(loader === 'addquestions') ? (<Loader type="Oval" color="aqua" height="25" width="30" />) : null} &nbsp; Add Questions</Button>
                                                </Form>
                                            </div>
                                        </Container>
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "110vh" }}>

                                    <div className="w-100" style={{ maxWidth: "400px" }}>
                                        <Form onSubmit={addQuestions} onLoad={() => {
                                            setquestion(''); setoption1(''); setoption2(''); setoption3(''); setoption4('');
                                            setchecked({ option1: false, option2: false, option3: false, option4: false })
                                        }}>
                                            <Form.Group>
                                                <Form.Label>Enter Question </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Question"
                                                    onChange={(e) => { setquestion(e.target.value); setreset(false); }}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Option 1"
                                                    onChange={(e) => { setoption1(e.target.value); setreset(false); }}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Option 2"
                                                    onChange={(e) => { setoption2(e.target.value); setreset(false); }}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Option 3"
                                                    onChange={(e) => { setoption3(e.target.value); setreset(false); }}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Option 4"
                                                    onChange={(e) => { setoption4(e.target.value); setreset(false); }}
                                                />
                                            </Form.Group>
                                            <div onLoad={() => { setchecked({ option1: false, option2: false, option3: false, option4: false }) }}>
                                                Select Answers<br />
                                                <input type="checkbox" name="option1" onChange={(e) => {
                                                    setchecked({ ...checked, option1: (e.target.checked) });
                                                    if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                    else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                }}

                                                /> Option-1 &nbsp;
                                            <input type="checkbox" name="option2" onChange={(e) => {
                                                    setchecked({ ...checked, option2: (e.target.checked) })
                                                        ; if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                    else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                }} /> Option-2 &nbsp;
                                            <input type="checkbox" name="option3" onChange={(e) => {
                                                    setchecked({ ...checked, option3: (e.target.checked) });
                                                    if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                    else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                }}
                                                /> Option-3 &nbsp;
                                            <input type="checkbox" name="option4" onChange={(e) => {
                                                    setchecked({ ...checked, option4: (e.target.checked) })
                                                    if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                    else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                }}
                                                /> Option-4
                                            <br />
                                            </div>
                                            <br />
                                            <Button
                                                type={reset ? "reset" : null}

                                                onClick={function () {
                                                    if (question !== '' && option1 !== '' && option2 !== '' && option3 !== '' && option4 !== '') {
                                                        if (checked.option1 === true || checked.option2 === true || checked.option3 === true || checked.option4 === true) {
                                                            setreset(true);
                                                            addQuestions();
                                                        } else {
                                                            store.addNotification({
                                                                title: "Error!",
                                                                message: "Please Check the Correct Answer or Answers",
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
                                                }} style={{ marginRight: "20px" }}>Add Question</Button><br></br><br></br>
                                            <Button className="d-flex align-items-center justify-content-center" onClick={() => {


                                                if (question !== '' && option1 !== '' && option2 !== '' && option3 !== '' && option4 !== '') {
                                                    if (checked.option1 === true || checked.option2 === true || checked.option3 === true || checked.option4 === true) {
                                                        setreset(true);
                                                        addQuestions();
                                                        post();
                                                    } else {
                                                        store.addNotification({
                                                            title: "Error!",
                                                            message: "Please Check the Correct Answer or Answers",
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

                                            }}>{(loader === 'posting') ? (<Loader type="Oval" color="aqua" height="25" width="30" />) : null} &nbsp; Post Quiz</Button><br></br>
                                            <Button className="d-flex align-items-center justify-content-center" onClick={() => {
                                                setloader('cancelposting');
                                                db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes/' + quizId + '/questions').get().then((s) => {
                                                    s.forEach((doc) => {
                                                        db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes/' + quizId + '/questions').doc(doc.id).delete()
                                                    });

                                                });
                                                db.collection('Admin/' + sessionStorage.getItem("adminnameid") + '/quizes').doc(quizId).delete();
                                                setTimeout(() => { window.location.reload(true) }, 1300);
                                            }}>{(loader === 'cancelposting') ? (<Loader type="Oval" color="aqua" height="25" width="30" />) : null} &nbsp;Cancel Posting Quiz</Button>
                                        </Form>
                                    </div>
                                </Container>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <Container className="d-flex align-items-center justify-content-center" style={{ marginTop: "100px" }}>
                            <div className="questions">
                                <Button onClick={() => { setquizquestions(false) }}>Back</Button>

                                {
                                    quizlist.map((i, k) => {
                                        if (i.question === "Loading...") {
                                            return (
                                                <div>
                                                    Loading...
                                                </div>
                                            )
                                        }
                                        else {

                                            return (

                                                <div key={i, k}>
                                                    <div className="question" >
                                                        <h6>{k + 1} . {i[0].question}
                                                            <Popup trigger={<img src="https://img.icons8.com/fluent-systems-filled/20/000000/edit.png" />} position="bottom">
                                                                <div>
                                                                    <input id='a1' type="text" onChange={e => { seth(e.target.value) }}></input>
                                                                    <button onClick={() => {
                                                                        document.getElementById('a1').value = '';
                                                                        db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/quizes/' + i[1] + '/questions').doc(i[2]).update(
                                                                            {
                                                                                question: h
                                                                            }
                                                                        )
                                                                        i[0].question = h;
                                                                        ; seth('')
                                                                    }}>update</button>
                                                                </div>
                                                            </Popup>

                                                        </h6>

                                                    </div>
                                                    <div className="option">
                                                        <h6>A . {i[0].option1}
                                                            <Popup trigger={<img src="https://img.icons8.com/fluent-systems-filled/20/000000/edit.png" />} position="bottom">
                                                                <div>
                                                                    <input id='a2' type="text" onChange={e => { seth(e.target.value) }}></input>
                                                                    <button onClick={() => {
                                                                        document.getElementById('a2').value = '';
                                                                        db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/quizes/' + i[1] + '/questions').doc(i[2]).update(
                                                                            {
                                                                                option1: h
                                                                            }
                                                                        )
                                                                        i[0].option1 = h;
                                                                        ; seth('')
                                                                    }}>update</button>
                                                                </div>
                                                            </Popup>
                                                        </h6>
                                                        <h6>B . {i[0].option2}
                                                            <Popup trigger={<img src="https://img.icons8.com/fluent-systems-filled/20/000000/edit.png" />} position="bottom">
                                                                <div>
                                                                    <input id='a5' type="text" onChange={e => { seth(e.target.value) }}></input>
                                                                    <button onClick={() => {
                                                                        document.getElementById('a5').value = '';
                                                                        db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/quizes/' + i[1] + '/questions').doc(i[2]).update(
                                                                            {
                                                                                option2: h
                                                                            }
                                                                        )
                                                                        i[0].option2 = h;
                                                                        ; seth('')
                                                                    }}>update</button>
                                                                </div>
                                                            </Popup>
                                                        </h6>
                                                        <h6>C . {i[0].option3}
                                                            <Popup trigger={<img src="https://img.icons8.com/fluent-systems-filled/20/000000/edit.png" />} position="bottom">
                                                                <div>
                                                                    <input type="text" onChange={e => { seth(e.target.value) }}></input>
                                                                    <button onClick={() => {
                                                                        document.getElementById('a3').value = '';
                                                                        db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/quizes/' + i[1] + '/questions').doc(i[2]).update(
                                                                            {
                                                                                option3: h
                                                                            }
                                                                        )
                                                                        i[0].option3 = h;
                                                                        ; seth('')
                                                                    }}>update</button>
                                                                </div>
                                                            </Popup>
                                                        </h6>
                                                        <h6>D . {i[0].option4}
                                                            <Popup trigger={<img src="https://img.icons8.com/fluent-systems-filled/20/000000/edit.png" />} position="bottom">
                                                                <div>
                                                                    <input id="a4" type="text" onChange={e => { seth(e.target.value) }}></input>
                                                                    <button onClick={() => {
                                                                        document.getElementById('a4').value = '';
                                                                        db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/quizes/' + i[1] + '/questions').doc(i[2]).update(
                                                                            {
                                                                                option4: h
                                                                            }
                                                                        )
                                                                        i[0].option4 = h;
                                                                        ; seth('')
                                                                    }}>update</button>
                                                                </div>
                                                            </Popup>
                                                        </h6>
                                                    </div>
                                                    <h6 className="answer">{k + 1} Answer:&nbsp;
                                                {(i[0].correctanswer.option1) ?
                                                            (i[0].option1) + " "
                                                            : null}
                                                        {(i[0].correctanswer.option2) ?
                                                            (i[0].option2) + " "
                                                            : null}
                                                        {(i[0].correctanswer.option3) ?
                                                            (i[0].option3) + " "
                                                            : null}
                                                        {(i[0].correctanswer.option4) ?
                                                            (i[0].option4) + " "
                                                            : null
                                                        }
                                                        <Popup trigger={<img src="https://img.icons8.com/fluent-systems-filled/20/000000/edit.png" />} position="bottom">
                                                            <div>
                                                                <div onLoad={() => { setoption({ option1: false, option2: false, option3: false, option4: false }) }}>
                                                                    Select Answers<br />
                                                                    <input id="h1" type="checkbox" name="option1" onChange={(e) => {
                                                                        setoption({ ...option, option1: (e.target.checked) });
                                                                        if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                                        else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                                    }}

                                                                    /> Option-1 &nbsp;
                                                                     <input id="h2" type="checkbox" name="option2" onChange={(e) => {
                                                                        setoption({ ...option, option2: (e.target.checked) })
                                                                            ; if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                                        else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                                    }} /> Option-2 &nbsp;
                                                                     <input id="h3" type="checkbox" name="option3" onChange={(e) => {
                                                                        setoption({ ...option, option3: (e.target.checked) });
                                                                        if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                                        else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                                    }}
                                                                    /> Option-3 &nbsp;
                                                                    <input id="h4" type="checkbox" name="option4" onChange={(e) => {
                                                                        setoption({ ...option, option4: (e.target.checked) })
                                                                        if (e.target.checked) { setnoofanswers(noofanswers + 1) }
                                                                        else { setnoofanswers(((noofanswers === 0) ? 0 : (noofanswers - 1))) }
                                                                    }}
                                                                    /> Option-4
                                                                      </div>
                                                                <Button onClick={() => {
                                                                    document.getElementById('h1').checked = false;
                                                                    document.getElementById('h2').checked = false;
                                                                    document.getElementById('h3').checked = false;
                                                                    document.getElementById('h4').checked = false;
                                                                    db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/quizes/' + i[1] + '/questions').doc(i[2]).update(
                                                                        {
                                                                            correctanswer: option,
                                                                            noofanswers: noofanswers
                                                                        }
                                                                    )
                                                                    i[0].correctanswer = option;
                                                                    ; setoption({ option1: false, option2: false, option3: false, option4: false });
                                                                    setnoofanswers(0)
                                                                }} type="reset">update</Button>
                                                            </div>
                                                        </Popup>
                                                    </h6>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Container>
                    </div>
                }
            </div>
        </div>
    );
}
