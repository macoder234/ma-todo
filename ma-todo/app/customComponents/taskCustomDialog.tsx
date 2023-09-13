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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import React, { useState } from 'react';
import { PlusIcon } from "@radix-ui/react-icons";

interface CustomDialogProps {
    onSave: (value: string) => void;
}

export function TaskCustomDialog({ onSave }: CustomDialogProps) {
    const [inputValue, setInputValue] = useState('');

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="constructive" size="icon">
                <PlusIcon className="h-4 w-4" />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
                Provide the description for the task
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 grid-cols-4 items-center">
                <Label htmlFor="name" className="text-right">
                    Task Description
                </Label>
                <Textarea 
                    id="name" 
                    value={inputValue}
                    placeholder="Type your task here."
                    onChange={e => setInputValue(e.target.value)} 
                    className="col-span-3" 
                />
            </div>

            <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="submit" onClick={() => {
                        onSave(inputValue);
                        setInputValue(''); 
                    }}>
                        Save
                    </Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
