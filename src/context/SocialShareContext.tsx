import React, { createContext, useContext, useState } from 'react';
import { SocialSharePayload } from '../types';
import { SocialShareModal } from '../components/SocialShareModal';
import { createGeneralSharePayload } from '../utils/socialShare';

interface SocialShareContextValue {
  openShare: (payload?: SocialSharePayload) => void;
  closeShare: () => void;
  isShareOpen: boolean;
  currentPayload: SocialSharePayload;
}

const SocialShareContext = createContext<SocialShareContextValue | undefined>(undefined);

export const SocialShareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<SocialSharePayload>(createGeneralSharePayload());

  const openShare = (customPayload?: SocialSharePayload) => {
    if (customPayload) {
      setPayload(customPayload);
    } else {
      setPayload(createGeneralSharePayload());
    }
    setIsOpen(true);
  };

  const closeShare = () => {
    setIsOpen(false);
  };

  return (
    <SocialShareContext.Provider
      value={{
        openShare,
        closeShare,
        isShareOpen: isOpen,
        currentPayload: payload,
      }}
    >
      {children}
      <SocialShareModal
        isOpen={isOpen}
        onClose={closeShare}
        payload={payload}
      />
    </SocialShareContext.Provider>
  );
};

export function useSocialShare(): SocialShareContextValue {
  const context = useContext(SocialShareContext);
  if (!context) {
    throw new Error('useSocialShare must be used within a SocialShareProvider');
  }
  return context;
}
