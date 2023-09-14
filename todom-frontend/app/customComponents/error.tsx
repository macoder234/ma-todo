import * as React from "react"
import { RaceBy } from '@uiball/loaders'


export function Error() {
    return (
        <div className="flex h-screen justify-center items-center">
            <span className="text-2xl font-bold mr-5 text-red-500">Error fetching data.</span>
            <RaceBy 
                size={80}
                lineWeight={5}
                speed={1.4} 
                color="red" 
            />
        </div>
    );
}


