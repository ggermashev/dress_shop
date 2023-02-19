import {Range} from "react-range";
import React, {Fragment} from "react";

export function PriceRange(props: {title: string, values: number[], setVals: ([]) => void}) {
    return (
        <Fragment>
            <div className="price">{props.title}: {props.values}</div>
            <Range
                step={500}
                min={0}
                max={50000}
                values={props.values}
                onChange={(values) => props.setVals(values)}
                renderTrack={({props, children}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: "#FFF5EE",
                            maxWidth: '350px'
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({props}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '20px',
                            width: '10px',
                            backgroundColor: 'black'
                        }}
                    />
                )}
            />
        </Fragment>
    )

}