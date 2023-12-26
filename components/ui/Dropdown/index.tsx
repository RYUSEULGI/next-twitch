'use client';

import { Check } from 'lucide-react';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface DropdownContextProps {
  selectedValue: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
  onToggle: () => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

interface Props {
  defaultValue: string;
  onChangeValue: (value: string) => void;
  children: ReactNode;
}

export function Dropdown({ defaultValue, onChangeValue, children }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onToggle = () => {
    setOpen((prev) => !prev);
  };

  const onChange = (value: string) => {
    onChangeValue(value);
  };

  return (
    <DropdownContext.Provider value={{ open, selectedValue, onOpen, onClose, onToggle, onChange }}>
      {children}
    </DropdownContext.Provider>
  );
}

function Trigger({ className, children }: { className?: string; children: ReactNode }) {
  const { onToggle } = useDropdown();

  return (
    <div onClick={onToggle} className={className}>
      {children}
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { open } = useDropdown();

  if (!open) {
    return null;
  }

  return (
    <ul className="relative z-50 p-1 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
      {children}
    </ul>
  );
}

function Item({ value, children }: { value: string; className?: string; children: ReactNode }) {
  const { selectedValue, onChange, onClose } = useDropdown();

  const active = value === selectedValue;

  const handleChange = () => {
    onChange(value);
    onClose();
  };

  return (
    <li
      onClick={handleChange}
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      {active && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      {children}
    </li>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Item = Item;

export function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('Dropdown context must be provided');
  }

  return context;
}
