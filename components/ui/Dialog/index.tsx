import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ForwardedRef, ReactNode, createContext, forwardRef, useContext, useState } from 'react';

interface DialogContextProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export function Dialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ open, onOpen, onClose }}>{children}</DialogContext.Provider>
  );
}

function Trigger({ children }: { children: ReactNode }) {
  const { onOpen } = useDialog();

  return <div onClick={onOpen}>{children}</div>;
}

function Content({ children }: { children?: ReactNode }) {
  const { open, onClose } = useDialog();

  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
        open && 'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]',
        !open && 'animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]'
      )}
    >
      {children}
      <div
        onClick={onClose}
        className={cn(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
          open && 'bg-accent text-muted-foreground'
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </div>
    </div>
  );
}

function Header({ children }: { children?: ReactNode }) {
  return <div className="flex flex-col space-y-1.5 text-center sm:text-left">{children}</div>;
}

function Title({ children }: { children: ReactNode }) {
  return <div className="text-lg font-semibold leading-none tracking-tight">{children}</div>;
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">{children}</div>
  );
}

function Close({ children, ref }: { children: ReactNode; ref: ForwardedRef<HTMLDivElement> }) {
  const { onClose } = useDialog();

  return (
    <div
      ref={ref}
      onClick={onClose}
      className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
    >
      {children}
    </div>
  );
}

Dialog.Trigger = Trigger;
Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Title = Title;
Dialog.Footer = Footer;
Dialog.Close = forwardRef(Close);

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Dialog context must be provided');
  }

  return context;
}
