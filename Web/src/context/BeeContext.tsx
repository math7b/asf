import React, { createContext, useContext, useState, useEffect } from 'react';
import type { BeeInterface, BeeMessage } from '../interfaces';
import api from '../services/api';

interface BeeContextType {
  bee: BeeInterface[];
  fetchBee: () => void;
}

const BeeContext = createContext<BeeContextType | undefined>(undefined);

export const BeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bee, setBee] = useState<BeeInterface[]>([]);

  const fetchBee = async () => {
    try {
      const response = await api.get<BeeInterface[]>('/bee');
      setBee(response.data);
    } catch (error) {
      console.error('Failed to fetch bees', error);
    }
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3333/realtime/bee');
    socket.onopen = () => {
      console.log('WebSocket connected');
    };
    socket.onmessage = (event) => {
      const message: BeeMessage = JSON.parse(event.data);
      handleMessage(message);
    };
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleMessage = (message: BeeMessage) => {
    switch (message.action) {
      case 'create':
        if (message.type === 'bee' && message.data.bee) {
          setBee((prevBees) => {
            if (message.data.bee) {
              return [...prevBees, message.data.bee];
            }
            return prevBees;
          });
        }
        break;
      case 'delete':
        if (message.type === 'bee' && message.data.beeId) {
          setBee((prevBees) =>
            prevBees.filter((bee) => bee.id !== message.data.beeId)
          );
        }
        break;
      default:
        console.warn('Unknown action type:', message.action);
        break;
    }
  };

  useEffect(() => {
    fetchBee();
  }, []);

  return (
    <BeeContext.Provider value={{ bee, fetchBee }}>
      {children}
    </BeeContext.Provider>
  );
};

export const useBee = () => {
  const context = useContext(BeeContext);
  if (!context) {
    throw new Error('useBee must be used within a BeeProvider');
  }
  return context;
};
