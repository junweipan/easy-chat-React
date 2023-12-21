import { UserAuth } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = UserAuth();

  // console.log(message)
  return (
    <div>
      <div className={`chat ${message.uid === currentUser.uid ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message.avatar} />
          </div>
        </div>
        <div className="chat-header">
          {message.name}
        </div>
        {message.text&&<div className="chat-bubble">{message.text}</div>}
        <img src={message.img} alt=""/>
      </div>
    </div>
  );
};

export default Message;
