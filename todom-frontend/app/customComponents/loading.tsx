import * as React from "react"
import { Ping } from '@uiball/loaders'

export function Loading() {
    return (
        <div className="flex h-screen justify-center items-center">
            <span className="text-2xl font-bold mr-5">Loading</span>
            <Ping 
                size={80}
                speed={1.6} 
                color="grey"
            />
        </div>
    );
}