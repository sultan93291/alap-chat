"use client";
import { Box } from "@mui/system";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./chatbox.css";
import { Avatar, Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { BsGlobe, BsSendFill } from "react-icons/bs";

import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  push,
  remove,
} from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import firebaseConfig from "@/app/Config/firebaseConfig/firebaseConfig";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import { AudioRecorder } from "react-audio-voice-recorder";

const ChatBox = () => {
  const [msg, setmsg] = useState("");
  const [allMsg, setallMsg] = useState([]);
  const [emojiShow, setemojiShow] = useState(false);
  const [blob, setBlob] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioSend, setAudioSend] = useState(false);
  const emojiPickerRef = useRef(null);
  const loggedInUserData = useSelector(state => state.user.value);
  const msgUserData = useSelector(state => state.msgReciverInfo.value);

  const addAudioElement = blob => {
    console.log(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setAudioUrl(url);
    setBlob(blob);
    if (url && blob) {
      setAudioSend(true);
    }
  };

  const handleAudioUpload = () => {
    const storage = getStorage();
    const db = getDatabase();
    const audioStorageRef = sref(storage, "voice/" + Date.now());
    uploadBytes(audioStorageRef, blob).then(snapshot => {
      getDownloadURL(audioStorageRef).then(downloadURL => {
        set(push(ref(db, "message")), {
          senderId: loggedInUserData.uid,
          senderName: loggedInUserData.displayName,
          senderEmail: loggedInUserData.email,
          reciverId: msgUserData?.userId,
          reciverEmail: msgUserData?.userEmail,
          reciverName: msgUserData?.userName,
          audio: downloadURL,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
        }).then(() => {
          setAudioUrl("");
          setAudioSend(false);
        });
      });
    });
  };

  const handleMsgData = e => {
    setmsg(e.target.value);
  };

  const handleMsgSend = useCallback(() => {
    const db = getDatabase();
    if (msg.length > 0 && msgUserData) {
      set(push(ref(db, "message")), {
        senderId: loggedInUserData.uid,
        senderName: loggedInUserData.displayName,
        senderEmail: loggedInUserData.email,
        reciverId: msgUserData?.userId,
        reciverEmail: msgUserData?.userEmail,
        reciverName: msgUserData?.userName,
        message: msg,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
      }).then(() => {
        setmsg("");
      });
    } else {
      console.log("no msg");
    }
  }, [msg, msgUserData, loggedInUserData]);

  const handleMsgDeliver = useCallback(
    e => {
      const db = getDatabase();
      console.log(msg);
      console.log(msgUserData);
      if (e.key == "Enter" && msgUserData && msg.length > 0) {
        set(push(ref(db, "message")), {
          senderId: loggedInUserData.uid,
          senderName: loggedInUserData.displayName,
          senderEmail: loggedInUserData.email,
          reciverId: msgUserData?.userId,
          reciverEmail: msgUserData?.userEmail,
          reciverName: msgUserData?.userName,
          message: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
        }).then(() => {
          setmsg("");
        });
      } else {
        console.log("something went wrong");
      }
    },
    [msg, msgUserData, loggedInUserData]
  );

  const handleEmoji = e => {
    setmsg(prevmsg => prevmsg + e.emoji);
  };

  useEffect(() => {
    const db = getDatabase();
    const msgRef = ref(db, "message");
    let isReciver = false;
    let isSender = false;
    onValue(msgRef, snapshot => {
      let arr = [];
      snapshot.forEach(item => {
        if (
          item.val().senderId == loggedInUserData.uid &&
          item.val().reciverId == msgUserData?.userId
        ) {
          isSender = true;
          arr.push({ ...item.val(), id: item.key, isSender });
        } else if (
          item.val().senderId == msgUserData?.userId &&
          item.val().reciverId == loggedInUserData.uid
        ) {
          isReciver = true;
          arr.push({ ...item.val(), id: item.key, isReciver });
        }
      });
      setallMsg(arr);
    });
  }, [msgUserData, loggedInUserData, handleMsgDeliver, handleMsgSend]);

  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  useOutsideClick(emojiPickerRef, () => setemojiShow(false));

  console.log(allMsg);

  return (
    <div className="chatbox">
      <Box>
        {msgUserData ? (
          <>
            <div className="user-details">
              <div className="user-img">
                <div>
                  <Avatar
                    alt=" not found "
                    src={msgUserData.userPhoto}
                    sx={{ width: 75, height: 75 }}
                  />
                </div>
                <div className="user_info">
                  <Typography variant="h6" component={"h6"}>
                    {msgUserData.userName}
                  </Typography>
                  <Typography variant="p" component={"p"}>
                    online
                  </Typography>
                </div>
              </div>
              <HiOutlineDotsVertical className="dot" />
            </div>
            <ScrollToBottom
              className="msgBody_wrapper"
              style={{ height: "80%" }}
            >
              {allMsg.map((item, index) => (
                <div key={index} className="sender_reciver_wrapper">
                  {item.isSender && (
                    <div className="senderMsg_wrapper">
                      <div className="sender_msg_time_wrapper">
                        <div className="sender_msg_user_wrapper">
                          {item.message ? (
                            <p className="sender_msg"> {item.message} </p>
                          ) : (
                            <audio controls src={item.audio} />
                          )}
                          <Avatar src={loggedInUserData.photoURL} />
                        </div>
                        <span className="sender_date">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    </div>
                  )}
                  {item.isReciver && (
                    <div className="reciverMsg_wrapper">
                      <div className="reciver_msg_time_wrapper">
                        <div className="reciver_msg_user_wrapper">
                          <Avatar src={msgUserData.userPhoto} />
                          {item.message ? (
                            <p className="reciver_msg"> {item.message} </p>
                          ) : (
                            <audio controls src={item.audio} />
                          )}
                        </div>

                        <span className="reciver_date">
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ScrollToBottom>
            <div className=" inputBox_wrapper ">
              <div className="input_wrapper">
                <input
                  type="text"
                  onChange={handleMsgData}
                  placeholder="Type a message"
                  value={msg}
                  onKeyUp={handleMsgDeliver}
                />
                <div className="logo_wrapper">
                  <div className="emoji_wrapper">
                    <MdOutlineEmojiEmotions
                      onClick={() => {
                        setemojiShow(!emojiShow);
                      }}
                    />
                    {emojiShow && (
                      <div ref={emojiPickerRef} className="emojipicker">
                        <EmojiPicker
                          className="emojishow"
                          onEmojiClick={handleEmoji}
                          open={emojiShow}
                        />
                      </div>
                    )}
                  </div>
                  <CiCamera />
                </div>
              </div>
              {msg.length > 0 ? (
                <div onClick={handleMsgSend} className="send_btn">
                  <BsSendFill />
                </div>
              ) : audioSend ? (
                <div onClick={handleAudioUpload} className="send_btn">
                  <BsSendFill />
                </div>
              ) : (
                <div className="audio_wrapper">
                  <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                    downloadFileExtension={"mp3"}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <Alert severity="info"> please select a user</Alert>
        )}
      </Box>
    </div>
  );
};

export default ChatBox;
