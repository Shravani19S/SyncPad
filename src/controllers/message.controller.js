import Message from '../models/message.model.js';

export const getMessagesByDoc = async (req, res) => {
  try {
    const { docId } = req.params;
    const messages = await Message.find({ docId }).sort({ createdAt: 1 });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err.message });
  }
};
