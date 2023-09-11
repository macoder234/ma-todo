import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react';

interface DialogDemoProps {
    headerOfDialog: string;
    bodyOfDialog: string;
    labelOfString: string;
    onSave: (value: string) => void;
}

export function DialogDemo({ headerOfDialog, bodyOfDialog, labelOfString, onSave }: DialogDemoProps) {
    const [inputValue, setInputValue] = useState('');

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">{headerOfDialog}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>{headerOfDialog}</DialogTitle>
            <DialogDescription>
                {bodyOfDialog}
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                {labelOfString}
                </Label>
                <Input 
                    id="name" 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)} 
                    className="col-span-3" 
                />
            </div>
            </div>
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="submit" onClick={() => onSave(inputValue)}>Save</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
