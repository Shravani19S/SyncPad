import { useEffect, useState } from 'react';
import { useSupplier } from '../context/supplierContext';
import { useAuth } from '../context/authContext';

const ChatBox = ({ roomId }) => {
  const { socket, darkMode } = useSupplier();
  const { auth } = useAuth();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchPreviousMessages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/messages/${roomId}`);
      const data = await res.json();
      setMessages(data?.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error.message);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const messageData = {
      roomId,
      username: auth?.user?.username,
      message: msg.trim(),
    };

    socket.emit('send-chat-message', messageData);
    setMsg('');
  };

  useEffect(() => {
    fetchPreviousMessages();
  }, [roomId]);

  useEffect(() => {
    socket.on('receive-chat-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive-chat-message');
  }, [socket]);

  return (
    <div className={`chat-box ${darkMode ? 'dark' : 'light'} p-3 border rounded shadow position-relative`} style={{ maxWidth: '350px', minWidth: '260px', minHeight: '320px', maxHeight: '70vh', overflowY: 'auto', borderLeft: '6px solid var(--primary)', marginLeft: 0 }}>
      <div className="messages mb-2">
        {messages.map((m, i) => (
          <div key={i} className="message mb-2">
            <strong className="text-primary">{m.username}</strong>: {m.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="d-flex mt-2">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="form-control"
        />
        <button className="btn btn-primary ms-2" type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
