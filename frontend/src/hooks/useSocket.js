import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

const useSocket = () => {
  const [results, setResults] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const socketRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketRef.current.on('searchResults', (data) => {
      setResults(data.data || []);
      setIsSearching(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const search = useCallback((query, category) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if ((!query || query.trim() === '') && (!category || category === 'All')) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    debounceRef.current = setTimeout(() => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('search', { query: query || '', category: category || 'All' });
      }
    }, 300);
  }, []);

  return {
    results,
    isConnected,
    isSearching,
    search
  };
};

export default useSocket;
