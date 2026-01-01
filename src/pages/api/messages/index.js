// API Route for handling chat messages
export default async function handler(req, res) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

  // Extract token from Authorization header or query param (for client-side requests)
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader : null;

  if (req.method === 'GET') {
    try {
      const { conversationId } = req.query;
      
      if (!conversationId) {
        return res.status(400).json({ error: 'conversationId is required' });
      }

      const headers = {
        'Content-Type': 'application/json',
      };

      // Forward authentication
      if (token) {
        headers.Authorization = token;
      } else if (req.headers.cookie) {
        headers.Cookie = req.headers.cookie;
      }

      const response = await fetch(
        `${backendUrl}/api/v1/messages?conversationId=${conversationId}`,
        {
          method: 'GET',
          headers,
          credentials: 'include',
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  if (req.method === 'POST') {
    try {
      const messageData = req.body;

      const headers = {
        'Content-Type': 'application/json',
      };

      // Forward authentication
      if (token) {
        headers.Authorization = token;
      } else if (req.headers.cookie) {
        headers.Cookie = req.headers.cookie;
      }

      const response = await fetch(`${backendUrl}/api/v1/messages`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(messageData),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(201).json(data);
    } catch (error) {
      console.error('Error saving message:', error);
      return res.status(500).json({ error: 'Failed to save message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
