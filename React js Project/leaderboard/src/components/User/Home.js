import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../DB/firebase';
import Countdown from "react-countdown";
import Loader from 'react-loader-spinner';
import ProgressBar from '../ProgressBar/ProgressBar';
import { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import "animate.css";

export default function Home() {
  const [loggedIn, setloggedIn] = useState();
  const [quizquestions, setquizquestions] = useState([{ question: "Loading..." }]);
  const [questionno, setquestionno] = useState(0);
  const [score, setscore] = useState(0);
  const [k, setk] = useState(0);
  const [h, seth] = useState(0);
  const [result, setresult] = useState([]);
  const [result1, setresult1] = useState([]);
  const [scorecard, setscorecard] = useState(false);
  const [startquiz, setstartquiz] = useState(false);
  const [checked, setchecked] = useState({ option1: false, option2: false, option3: false, option4: false });
  const [checked1, setchecked1] = useState({ option1: false, option2: false, option3: false, option4: false });
  const [activequizId, setactivequizId] = useState([{ quizid: "Loading...", quiztitle: "Loading..." }]);
  const [quizid, setquizid] = useState({ quizid: "Loading...", quiztitle: "Loading..." });
  const usertoken = sessionStorage.getItem("usertoken");
  const [progress, setProgress] = useState(0);
  const [showleaderBoard, setshowleaderBoard] = useState(false);

  console.log(result);
  useEffect(() => {

    db.collection('Admin/' + sessionStorage.getItem('adminid') + '/quizes').onSnapshot((s) => {
      var array = []; 
      s.forEach((doc) => {
        var Data = doc.data();
        if (Data.active === true) {
          array.push({ quizid: doc.id, quiztitle: Data.quiztitle, duration: Data.duration })
        }
      })
      if (array.length === 0) {
        setactivequizId([{ quizid: "No Active Quizes", quiztitle: "No Active Quizes", duration: "No Active Quizes" }]);
      }
      else {
        setactivequizId(array);
      }
    })
  }, []);
  useEffect(() => {
    if (quizid.quiztitle !== "Loading...") {
      db.collection('Users/' + sessionStorage.getItem('usernameid') + '/quizes').doc(quizid.quizid).set(
        {
          quizid: quizid.quizid,
          quiztitle: quizid.quiztitle,
          score: score,
          totalquestions: quizquestions.length
        }
      )
      db.collection('Admin/' + sessionStorage.getItem('adminid') + '/Users/' + sessionStorage.getItem('usernameid') + '/quizes').doc(quizid.quizid).set(
        {
          quizid: quizid.quizid,
          quiztitle: quizid.quiztitle,
          score: score,
          totalquestions: quizquestions.length
        }
      )
    }
  }, [score]);
  useEffect(() => {
    setProgress((score / quizquestions.length) * 100);
    if (quizid.quiztitle !== "Loading...") {
      db.collection('Users/' + sessionStorage.getItem('usernameid') + '/quizes').doc(quizid.quizid).set(
        {
          quizid: quizid.quizid,
          quiztitle: quizid.quiztitle,
          score: score,
          time: h,
          totalquestions: quizquestions.length
        }
      )
      db.collection('Admin/' + sessionStorage.getItem('adminid') + '/Users/' + sessionStorage.getItem('usernameid') + '/quizes').doc(quizid.quizid).set(
        {
          quizid: quizid.quizid,
          quiztitle: quizid.quiztitle,
          score: score,
          time: h,
          totalquestions: quizquestions.length
        }
      )
    }

  }, [score]);
  useEffect(() => {

    if (quizid.quizid !== "Loading...") {
      console.log(quizid.quizid);

      console.log(result1);
      db.collection('Admin/' + sessionStorage.getItem('adminid') + '/Users').onSnapshot((s) => {
        var array = [];
        s.forEach((doc) => {
          db.collection('Admin/' + sessionStorage.getItem('adminid') + '/Users/' + doc.id + '/quizes').doc(quizid.quizid).onSnapshot((s) => {
            if (s.exists !== false) {
              if (s.data().score !== undefined && s.data().time !== undefined) {
                array.push([s.data().score, doc.id, s.data().time]);
              }
              // console.log(s)
              // console.log(s.data(),doc.id)
            }
          });
        });
        setresult1(array)
      });
    }

  }, [score]);
  useEffect(() => {
    setresult(result1.sort(function (a, b) {
      if (a[0] > b[0]) return -1;
      else if (a[0] < b[0]) return 1;
      else if (a[2] < b[2]) return -1;
      else if (a[2] > b[2]) return 1;
      return 0;
    }));
  }, [result1]);
  var loggedStatus = () => {

    if (usertoken === null) {
      setloggedIn(false);
    } else {
      setloggedIn(true);
    }
  }
  window.onload = loggedStatus;
  if (loggedIn === false) {
    return <Redirect to="/" />
  }


  return (
    <div>
      <div className="navbar-head">
        <div className="navbar">
          <div className="brand">LeaderBoards</div>
          <div className="nav-list">
            <h6 onClick={function () {
              sessionStorage.removeItem("usertoken");
              setloggedIn(false)
            }}>Logout</h6>
            <h6 onClick={function () {
              window.location.reload(true);
            }}>Home</h6>
          </div>
        </div>
      </div>
      <div className='main' style={{ marginTop: '100px' }}>
        {!scorecard ?
          <div>
            {!startquiz ?
              <div>
                <div className="heading">Quizes List</div>

                <div className="titlebox-div">

                  <div className="titlebox ">
                    {
                      activequizId.map((i, k) => {
                        return (

                          <div className="title" key={i, k}>
                            {(i.quiztitle === "No Active Quizes" || i.quiztitle === "Loading...") ? <h6>{i.quiztitle}</h6> :
                              <>
                                <h6>{(((i.quiztitle).length > 20) ? ((i.quiztitle).slice(0, 20).concat("...")) : (i.quiztitle))}  </h6>

                                <img onClick={function () {
                                  db.collection('Users/' + sessionStorage.getItem("usernameid") + '/quizes').doc(i.quizid).get().then((s) => {
                                    if (s.empty === true || s.exists === false) {

                                      var array1 = [];
                                      db.collection('Admin/' + sessionStorage.getItem("adminid") + '/quizes/' + i.quizid + '/questions').get().then(snapshot => {
                                        snapshot.forEach(doc => {

                                          array1.push(doc.data());

                                        });

                                        setquizquestions(array1);
                                        setquizid({ quizid: i.quizid, quiztitle: i.quiztitle });


                                      });
                                      setstartquiz(true)
                                    }
                                    else {

                                      store.addNotification({
                                        title: "Error!",
                                        message: "You Have Already Responded to this Quiz",
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
                                  });
                                }


                                }

                                  src="https://img.icons8.com/ios-filled/25/000000/runner-starting-the-race.png" alt='' />
                              </>
                            }

                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              :

              <div>

                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "75vh" }}>
                  <div className="w-100 quizcard">
                    <div style={{ background: "rgba(0,0,0,0.35)", boxShadow: "10px 14px 16px rgba(0,0,0,0.5)", padding: "20px" }} >

                      <div>
                        {((quizquestions[questionno].question) === "Loading...") ?
                          <div className='d-flex align-items-center justify-content-center'>
                            <Loader type="Oval" color="aqua" height="50" width="50" />
                          </div>
                          :
                          <div onLoad={() => { setk(Date.now()) }}>
                            {/* <div><Countdown date={Date.now() + ((activequizId[0].duration)*60000)} autoStart={false} renderer={start()} /></div> */}
                            <div onLoad={() => {
                              if (questionno === 0) {
                                db.collection('Users/' + sessionStorage.getItem('usernameid') + '/quizes').doc(quizid.quizid).set(
                                  {
                                    quizid: quizid.quizid,
                                    quiztitle: quizid.quiztitle,
                                    score: score,
                                    totalquestions: quizquestions.length
                                  }
                                )
                                db.collection('Admin/' + sessionStorage.getItem('adminid') + '/Users/' + sessionStorage.getItem('usernameid') + '/quizes').doc(quizid.quizid).set(
                                  {
                                    quizid: quizid.quizid,
                                    quiztitle: quizid.quiztitle,
                                    score: score,
                                    totalquestions: quizquestions.length
                                  }
                                )
                              }
                            }} className="question">
                              <h6>{questionno + 1} . {quizquestions[questionno].question}</h6>
                            </div>

                            <div className="option">
                              {!(quizquestions[questionno].noofanswers > 1) ?
                                <div>
                                  <h6 onClick={() => { setchecked({ option1: true, option2: false, option3: false, option4: false }) }}>
                                    &nbsp;&nbsp;<input type="radio" name="answer" checked={checked.option1} onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option1}</h6>
                                  <h6 onClick={() => { setchecked({ option1: false, option2: true, option3: false, option4: false }) }}>
                                    &nbsp;&nbsp;<input type="radio" name="answer" checked={checked.option2} onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option2}</h6>
                                  <h6 onClick={() => { setchecked({ option1: false, option2: false, option3: true, option4: false }) }}>
                                    &nbsp;&nbsp;<input type="radio" name="answer" checked={checked.option3} onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option3}</h6>
                                  <h6 onClick={() => { setchecked({ option1: false, option2: false, option3: false, option4: true }) }}>
                                    &nbsp;&nbsp;<input type="radio" name="answer" checked={checked.option4} onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option4}</h6>
                                </div>
                                :
                                <div>
                                  <h6 onClick={() => { setchecked1({ ...checked1, option1: ((checked1.option1) ? false : true) }) }}>
                                    &nbsp;&nbsp;<input type="checkbox" name="answer" checked={checked1.option1} value="option1" onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option1}</h6>
                                  <h6 onClick={() => { setchecked1({ ...checked1, option2: ((checked1.option2) ? false : true) }) }}>
                                    &nbsp;&nbsp;<input type="checkbox" name="answer" checked={checked1.option2} value="option1" onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option2}</h6>
                                  <h6 onClick={() => { setchecked1({ ...checked1, option3: ((checked1.option3) ? false : true) }) }}>
                                    &nbsp;&nbsp;<input type="checkbox" name="answer" checked={checked1.option3} value="option1" onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option3}</h6>
                                  <h6 onClick={() => { setchecked1({ ...checked1, option4: ((checked1.option4) ? false : true) }) }}>
                                    &nbsp;&nbsp;<input type="checkbox" name="answer" checked={checked1.option4} value="option1" onChange={(e) => { }} />&nbsp;&nbsp;{quizquestions[questionno].option4}</h6>
                                </div>
                              }
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                              <img alt='' src="https://img.icons8.com/material/45/000000/circled-chevron-right--v1.png" onClick={() => {
                                if (checked.option1 === true || checked.option2 === true || checked.option3 === true || checked.option4 === true
                                  || checked1.option1 === true || checked1.option2 === true || checked1.option3 === true || checked1.option4 === true) {
                                  if (quizquestions[questionno].noofanswers > 1) {

                                    if (checked1.option1 === (quizquestions[questionno].correctanswer.option1)
                                      && checked1.option2 === (quizquestions[questionno].correctanswer.option2)
                                      && checked1.option3 === (quizquestions[questionno].correctanswer.option3)
                                      && checked1.option4 === (quizquestions[questionno].correctanswer.option4)
                                    ) {
                                      setscore(score + 1);
                                      seth((Date.now() - k) / 60000)
                                      setProgress((score / quizquestions.length) * 100);
                                    }

                                  }
                                  else {
                                    if (checked.option1 === (quizquestions[questionno].correctanswer.option1)
                                      && checked.option2 === (quizquestions[questionno].correctanswer.option2)
                                      && checked.option3 === (quizquestions[questionno].correctanswer.option3)
                                      && checked.option4 === (quizquestions[questionno].correctanswer.option4)
                                    ) {
                                      seth((Date.now() - k) / 60000)
                                      setscore(score + 1);
                                      setProgress((score / quizquestions.length) * 100);
                                    }
                                  }
                                  if (quizquestions.length - 1 > questionno) {
                                    setquestionno(questionno + 1);
                                    setchecked1({ option1: false, option2: false, option3: false, option4: false });
                                    setchecked({ option1: false, option2: false, option3: false, option4: false })

                                  }
                                  else {
                                    setTimeout(()=>{
                                    console.log(score,quizquestions.length,progress)
                                    setstartquiz(false);
                                    setscorecard(true);
                                  },2000)
                                  }
                                }
                                else {
                                  store.addNotification({
                                    title: "Error!",
                                    message: "Please Select Any of the Following Option",
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
                              }} />
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            }
          </div>
          :
          <div>
            {!showleaderBoard ?
              <div className="d-flex align-items-center justify-content-center">

                <div className="app">
                  <div className="app-header">
                    <h1>{quizid.quiztitle}</h1>
                    <br></br>
                    <ProgressBar
                      progress={progress}
                      size={window.innerWidth > 1000 ? 350 : window.innerWidth < 500 ? 250 : 300}
                      strokeWidth={20}
                      circleOneStroke='#cad0da'
                      circleTwoStroke={progress < 20 ? "red" : "#00ff00"}
                    />
                  </div>
                  <br></br>
                  <h5 style={{
                    color: "#009999", cursor: "pointer"
                  }} onClick={() => {
                    setresult(result.sort(function (a, b) {
                      if (a[0] > b[0]) return -1;
                      else if (a[0] < b[0]) return 1;
                      else if (a[2] < b[2]) return -1;
                      else if (a[2] > b[2]) return 1;
                      return 0;
                    })); setTimeout(() => { setshowleaderBoard(true) }, 800)
                  }}>See Your LeaderBoard</h5>
                </div>
              </div>
              :
              <div className='d-flex align-items-center justify-content-center'>
                <div className="leaderboard-div">
                  <h3 style={{ color: "white", marginBottom: "1%" }}>LeaderBoard</h3>
                  <div className="leaderboarddiv">
                    <div className='d-flex align-items-center justify-content-center'>
                      <img src="https://img.icons8.com/color/48/000000/firework-explosion.png" />
                      <img style={{ position: "relative" }} src="https://img.icons8.com/emoji/100/000000/trophy-emoji.png" />
                      <img src="https://img.icons8.com/color/48/000000/firework-explosion.png" />
                      <h5 style={{ position: "absolute", marginTop: "-43px", background: "white", borderRadius: "100%", cursor: "default" }}>&nbsp;
                {result.map((i, k) => { return <>{sessionStorage.getItem('usernameid') === i[1] ? k + 1 : null}</> })}
                &nbsp;</h5>
                    </div><br></br>
                    <div>
                      <div>
                        {result.map((i, k) => {
                          return <>{sessionStorage.getItem('usernameid') === i[1] ?
                            <div key={k} className="leaderboard" style={{ background: "#0099ff" }}>
                              <span>&nbsp;&nbsp;#{k + 1}&nbsp;&nbsp; {i[1]}</span>
                              <span className="leaderboard-score1">
                                <img style={{ marginBottom: "1px" }}
                                  src="https://img.icons8.com/material-outlined/13/ffffff/timer.png" />
                                {i[2].toFixed(2)} &nbsp;&nbsp;</span>
                              <span className="leaderboard-score2">
                                <img src="https://img.icons8.com/android/13/ffffff/speedometer.png" />
                                         &nbsp;{i[0] + "/" + quizquestions.length}&nbsp;&nbsp;</span>
                            </div>
                            : null}</>
                        })}

                      </div>
                      {
                        result.map((i, k) => {

                          return (<>
                            {k === 0 ?
                              sessionStorage.getItem('usernameid') === i[1] ?
                                      null
                                      :
                              <div key={k} className="leaderboard">
                                <span>&nbsp;&nbsp;#1&nbsp;&nbsp; {i[1]}</span>
                                <span className="leaderboard-score1">
                                  <img style={{ marginBottom: "1px" }}
                                    src="https://img.icons8.com/material-outlined/13/ffffff/timer.png" />
                                  {(i[2] !== undefined) ? (i[2]).toString().slice(0, 4) : i[2]} &nbsp;&nbsp;</span>
                                <span className="leaderboard-score2">
                                  <img src="https://img.icons8.com/android/13/ffffff/speedometer.png" />
                                  &nbsp;{i[0] + "/" + quizquestions.length}&nbsp;&nbsp;</span>
                              </div>
                              :
                              <>
                                {i[1] === (i - 1)[1] ?
                                  null
                                  :
                                  <>
                                    {sessionStorage.getItem('usernameid') === i[1] ?
                                      null
                                      :
                                      <div key={k} className="leaderboard">
                                        <span>&nbsp;&nbsp;#{k + 1}&nbsp;&nbsp; {i[1]}</span>
                                        <span className="leaderboard-score1">
                                          <img style={{ marginBottom: "1px" }}
                                            src="https://img.icons8.com/material-outlined/13/ffffff/timer.png" />
                                          {(i[2] !== undefined) ? (i[2]).toString().slice(0, 4) : i[2]} &nbsp;&nbsp;</span>
                                        <span className="leaderboard-score2">
                                          <img src="https://img.icons8.com/android/13/ffffff/speedometer.png" />
                                         &nbsp;{i[0] + "/" + quizquestions.length}&nbsp;&nbsp;</span>
                                      </div>
                                    }
                                  </>
                                }
                              </>
                            }
                          </>)
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>




            }
          </div>
        }
      </div >
    </div >
  );
}
