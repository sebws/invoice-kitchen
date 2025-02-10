import { useAppStateStore } from '@/store';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import {
  CakeSlice,
  FilePlus,
  PrinterIcon,
  XOctagon,
} from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { DialogHeader, DialogFooter } from './ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

const NewButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <button
            className="p-4 flex items-center gap-2 hover:text-purple-700 "
            onClick={() => setOpen(true)}
          >
            <FilePlus /> New
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Starts a new invoice, keeps the header and notes section intact. Also
          increments the invoice number. Clears the item table and customer
          details.
        </HoverCardContent>
      </HoverCard>
      <AreYouSureDialog mode="new" open={open} setOpen={setOpen} />
    </>
  );
};

const PrintButton = () => {
  return (
    <>
      <button
        className="p-4 flex items-center gap-2 hover:text-purple-700 "
        onClick={() => {
          window.print();
        }}
      >
        <PrinterIcon /> Print
      </button>
    </>
  );
};

const ClearButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <button
            className="p-4 flex items-center gap-2 hover:text-purple-700 "
            onClick={() => setOpen(true)}
          >
            <XOctagon /> Clear
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Resets the invoice to a blank state.
        </HoverCardContent>
      </HoverCard>
      <AreYouSureDialog mode="clear" open={open} setOpen={setOpen} />
    </>
  );
};

const AreYouSureDialog = ({
  mode,
  open,
  setOpen,
}: {
  mode: 'clear' | 'preset' | 'new';
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { clearInvoice, fillWithPresetInvoice, newInvoice } =
    useAppStateStore();
  const clearText =
    'This will clear the invoice and reset it to a blank state.';
  const presetText =
    'This will fill in the invoice with some example data to get you started.';
  const newText =
    'This will start a new invoice, keeps the header and notes section intact. Also increments the invoice number. Clears the item table and customer details.';

  const options = {
    clear: {
      text: clearText,
      action: clearInvoice,
      buttonText: 'Clear',
    },
    preset: {
      text: presetText,
      action: fillWithPresetInvoice,
      buttonText: 'Fill',
    },
    new: {
      text: newText,
      action: newInvoice,
      buttonText: 'New',
    },
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>{options[mode].text}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              options[mode].action();
              setOpen(false);
            }}
          >
            {options[mode].buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PresetButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <button
            className="p-4 flex items-center gap-2 hover:text-purple-700 "
            onClick={() => setOpen(true)}
          >
            <CakeSlice /> Example
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Fills in the invoice with some example data to get you started.
        </HoverCardContent>
      </HoverCard>
      <AreYouSureDialog mode="preset" open={open} setOpen={setOpen} />
    </>
  );
};

export const TopRightButtons: React.FC = () => {
  return (
    <div id="top-right-buttons" className="absolute top-2 right-2 print:hidden">
      <NewButton />
      <PrintButton />
      <ClearButton />
      <PresetButton />
    </div>
  );
};
