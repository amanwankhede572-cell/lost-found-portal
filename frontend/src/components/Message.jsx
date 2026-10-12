function Message({ message }) {
  if (!message.text) return null; // message nahi hai to kuch mat dikhao

  return (
    <div className={message.type === "error" ? "message error" : "message success"}>
      {message.text}
    </div>
  );
}

export default Message;