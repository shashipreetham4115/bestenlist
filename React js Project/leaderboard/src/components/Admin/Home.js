import React, { useState, useEffect } from 'react';
import './styles.css'
import { Redirect } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'
import { auth, db } from '../DB/firebase';
import { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import "animate.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Loader from 'react-loader-spinner';
import { NavLink } from "react-router-dom";

export default function Home() {
  const [loggedIn, setloggedIn] = useState();
  const [home, sethome] = useState(true);
  const [loader, setloader] = useState(false);
  const [Leaderboard, setLeaderboard] = useState(false);
  const [quizId, setquizId] = useState([{ quizid: "Loading...", quiztitle: "Loading..." }]);
  const [QuizId, setQuizId] = useState({ quizid: "Loading...", quiztitle: "Loading..." });
  const [UsersData, setUsersData] = useState("Loading...");
  const [h, seth] = useState('');
  const [username, setusername] = useState('');
  const [usernumber, setusernumber] = useState('');
  const [score, setscore] = useState('');
  const [totalq, settotalq] = useState('');
  const [time, settime] = useState('');

  const admintoken = sessionStorage.getItem("admintoken");
  useEffect(() => {
   
    if (UsersData !== "Loading...") {
      setTimeout(() => { sethome(false) }, 1000);
    }
    else {
      sethome(true)
    }
  }, [UsersData]);

  var loggedStatus = () => {
    if (admintoken === null) {
      setloggedIn(false);
    } else {
      setloggedIn(true);
    }
  }
  window.onload = loggedStatus;
  useEffect(() => {
    db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/quizes').onSnapshot((s) => {
      var array = [];
      s.forEach((doc) => {
        var Data = doc.data();
        array.push({ quizid: doc.id, quiztitle: Data.quiztitle })
      })
      if (array.length === 0) {
        setquizId([{ quizid: "No Available Quizes", quiztitle: "No Available Quizes" }]);
      }
      else {
        setquizId(array);
      }
    })
  }, []);
  if (loggedIn === false) {
    return <Redirect to="/admin" />
  }
  return (
    <div>
      <div className="navbar-head">
        <div className="navbar">
          <div className="brand">LeaderBoards</div>
          <div className="nav-list">
            <h6 onClick={function () {
              sessionStorage.removeItem("admintoken");
              setloggedIn(false)
            }}>Logout</h6>
            {home?
            <NavLink to={"/admin/quiz"} className="link">Quizes</NavLink>
            :
            <h6 onClick={()=>{window.location.reload(true)}}>Home</h6>
            }
          </div>
        </div>
      </div>
      <div className="main">
        {home ?
          <div>
            <div className="heading">Quizes List</div>

            <div className="titlebox-div">

              <div className="titlebox ">
                {
                  quizId.map((i, k) => {
                    return (

                      <div className="title" key={i, k}>
                        {(i.quiztitle === "No Available Quizes" || i.quiztitle === "Loading...") ? <h6>{i.quiztitle}</h6> :
                          <>
                            <h6>{(((i.quiztitle).length > 20) ? ((i.quiztitle).slice(0, 20).concat("...")) : (i.quiztitle))}  </h6>
                           {!loader?
                            <img onClick={function () {
                              setQuizId({ quizid: i.quizid, quiztitle: i.quiztitle });
                              db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users').get().then(snapshot => {
                                var array = [];
                                snapshot.forEach(doc => {
                                  db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users/' + doc.id + '/quizes').get().then(s => {
                                    s.forEach(doc1 => {
                                      if (doc1.id === i.quizid) {
                                        // console.log(doc1.data())
                                        array.push([doc.id, doc.data().number, doc1.data().score, doc1.data().totalquestions, doc1.data().time, doc1.id])

                                      }
                                    })
                                  })
                                })
                                setUsersData(array)
                                setloader(true)
                              })
                            }}
                              src="https://img.icons8.com/ios-filled/25/000000/visible.png" />
                              :
                              <Loader type="Oval" color="black" height="25" width="30" style={{float:"right",marginTop:"-30px"}} />
                           }
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
          <div style={{ marginTop: "100px" }}>
            <div className='d-flex align-items-center justify-content-center'>
              <div className="leaderboard-div">
                <h3 style={{ color: "white", marginBottom: "3%" }} >{!Leaderboard?"Users":"LeaderBoard"}</h3>
                <Table size="sm" borderless responsive>
                  <thead>
                    <tr style={{ background: "rgb(251, 255, 0)" }}>
                    {Leaderboard?<th>Rank</th>:null}
                      <th>Name</th>
                      <th>Number</th>
                      <th>Score</th>
                      <th>time</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UsersData.map((i, k) => {
                      if (i !== "empty" || i !== null) {
                        return (
                          <tr key={k} className="leaderboard">
                          {Leaderboard?<td>#{k+1}</td>:null}
                            <td>{i[0]}</td>
                            <Popup trigger={<td>{i[1]}</td>} position="bottom">
                              <div>
                                <input id="a4" type="text" placeholder={i[1]} onChange={e => { seth(e.target.value) }}></input>
                                <button onClick={() => {
                                  document.getElementById('a4').value = '';
                                  db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users').doc(i[0]).update(
                                    {
                                      number: h
                                    }
                                  )
                                  db.collection('Users').doc(i[0]).update(
                                    {
                                      number: h
                                    }
                                  )
                                  i[1] = h;
                                  ; seth('')
                                }}>update</button>
                              </div>
                            </Popup>
                            <Popup trigger={<td>{i[2] + "/" + i[3]}</td>} position="bottom">
                              <div>
                                <input id="a3" type="text" placeholder={i[2] + "/" + i[3]} onChange={e => { seth(e.target.value) }}></input>
                                <button onClick={() => {
                                  document.getElementById('a3').value = '';
                                  db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users/' + i[0] + '/quizes').doc(i[5]).update(
                                    {
                                      score: h
                                    }
                                  )
                                  db.collection('Users/' + i[0] + '/quizes').doc(i[5]).update(
                                    {
                                      score: h
                                    }
                                  )
                                  i[2] = h;
                                  ; seth('')
                                }}>update score</button>
                                <button onClick={() => {
                                  document.getElementById('a3').value = '';
                                  db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users/' + i[0] + '/quizes').doc(i[5]).update(
                                    {
                                      totalquestions: h
                                    }
                                  )
                                  db.collection('Users/' + i[0] + '/quizes').doc(i[5]).update(
                                    {
                                      totalquestions: h
                                    }
                                  )
                                  i[3] = h;
                                  ; seth('')
                                }}>update totalquestions</button>
                              </div>
                            </Popup>
                            <Popup trigger={<td>{(i[4] !== undefined) ? (i[4]).toString().slice(0, 4) : i[4]}</td>} position="bottom">
                              <div>
                                <input id="a3" type="text" placeholder={i[4]} onChange={e => { seth(e.target.value) }}></input>
                                <button onClick={() => {
                                  document.getElementById('a3').value = '';
                                  db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users/' + i[0] + '/quizes').doc(i[5]).update(
                                    {
                                      time: h
                                    }
                                  )
                                  db.collection('Users/' + i[0] + '/quizes').doc(i[5]).update(
                                    {
                                      time: h
                                    }
                                  )
                                  i[4] = h;
                                  ; seth('')
                                }}>update</button>
                              </div>
                            </Popup>
                            <td>
                              <img
                                onClick={() => {
                                  db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users/' + i[0] + '/quizes').doc(i[5]).delete();
                                  var array1 = [];
                                  UsersData.map((q, p) => {
                                    if (k === p) {
                                      return null
                                    }
                                    else {
                                      array1.push(q);
                                    }
                                    setUsersData(array1);
                                  })

                                }}
                                src="https://img.icons8.com/material/24/ffffff/delete-forever.png" />
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                  
                </Table>

              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
            {!Leaderboard?
            <img style={{position:"fixed",bottom:"14%",right:"4%",width:"40px",height:"50px"}}
          onClick={()=>{
            setUsersData(UsersData.sort((function (a, b) {
        if (a[2] > b[2]) return -1;
        else if (a[2] < b[2]) return 1;
        else if (a[4] < b[4]) return -1;
        else if (a[4] > b[4]) return 1;
        return 0;
      })));(setLeaderboard(true))
      console.log(UsersData)
      }}
      src="https://img.icons8.com/color/100/000000/leaderboard.png"/>:
      <img style={{position:"fixed",bottom:"14%",right:"4%",width:"40px",height:"50px"}}
      onClick={()=>{
        (setLeaderboard(false))
      }}
       src="https://img.icons8.com/dusk/48/000000/user-male.png"/>
            }
            </div>
            <div className="newicon">

              <Popup trigger={<img src="https://img.icons8.com/fluent/64/000000/add-user-male.png" />} position="top right">
                <div>
                  <input type="text" id="addnew" style={{ marginBottom: "10px" }} placeholder="username" onChange={(e) => { setusername(e.target.value) }} />
                  <input type="text" id="addnew1" style={{ marginBottom: "10px" }} placeholder="number with country code" onChange={(e) => { setusernumber(e.target.value) }} />
                  <input type="text" id="addnew2" style={{ marginBottom: "10px" }} placeholder="score" onChange={(e) => { setscore(e.target.value) }} />
                  <input type="text" id="addnew3" style={{ marginBottom: "10px" }} placeholder="total questions" onChange={(e) => { settotalq(e.target.value) }} />
                  <input type="text" id="addnew4" style={{ marginBottom: "10px" }} placeholder="time taken" onChange={(e) => { settime(e.target.value) }} />
                  <Button onClick={() => {
                    if (username !== '' && usernumber !== '' && score !== '' && totalq !== '' && time !== '') {
                      document.getElementById('addnew').value = '';
                      document.getElementById('addnew1').value = '';
                      document.getElementById('addnew2').value = '';
                      document.getElementById('addnew3').value = '';
                      document.getElementById('addnew4').value = '';
                      db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users').doc(username).set(
                        {
                          name: username,
                          number: usernumber
                        }
                      )
                      db.collection('Users').doc(username).set(
                        {
                          name: username,
                          number: usernumber
                        }
                      )
                      db.collection('Admin/' + sessionStorage.getItem('adminnameid') + '/Users/' + username + '/quizes').doc(QuizId.quizid).set(
                        {
                          quiztitle: QuizId.quiztitle,
                          quizid: QuizId.quizid,
                          score: score,
                          time: time,
                          totalquestions: totalq
                        }
                      )
                      db.collection('Users/' + username + '/quizes').doc(QuizId.quizid).set(
                        {
                          quiztitle: QuizId.quiztitle,
                          quizid: QuizId.quizid,
                          score: score,
                          time: time,
                          totalquestions: totalq
                        }
                      )
                      setUsersData([...UsersData, [username, usernumber, score, totalq, time]]);
                      console.log(UsersData);
                      setusername('')
                      setusernumber('')
                      setscore('')
                      settotalq('')
                      settime('')
                    }
                    else {
                      store.addNotification({
                        title: "Error!",
                        message: "Any Field Should Not Be Empty",
                        type: "danger",
                        container: "bottom-left",
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
                  }}
                  >Add User</Button>
                </div>

              </Popup>

            </div>
          </div>
        }
        <div>
        </div>
      </div>
    </div>
  );
}
