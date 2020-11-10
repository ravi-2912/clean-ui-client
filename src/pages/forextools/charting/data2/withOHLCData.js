// import { tsvParse } from "d3-dsv";
// import { timeParse } from "d3-time-format";
// import * as React from "react";
// import { IOHLCData } from "./iOHLCData";

// const parseDate = timeParse("%Y-%m-%d");

// const parseData = () => {
//     return (d: any) => {
//         const date = parseDate(d.date);
//         if (date === null) {
//             d.date = new Date(Number(d.date));
//         } else {
//             d.date = new Date(date);
//         }

//         Object.keys(d).forEach(key=>{
//             if (key !== "date" && Object.prototype.hasOwnProperty.call(d, key)) {
//                 d[key] = +d[key];
//             }
//         })

//         return d as IOHLCData;
//     };
// };

// interface WithOHLCDataProps {
//     readonly data: IOHLCData[];
// }

// interface WithOHLCState {
//     data?: IOHLCData[];
//     message: string;
// }

// function withOHLCData(dataSet = "DAILY") {
//     return <TProps extends WithOHLCDataProps>(OriginalComponent: React.ComponentClass<TProps>) => {
//         return class WithOHLCData extends React.Component<Omit<TProps, "data">, WithOHLCState> {
//             public constructor(props: Omit<TProps, "data">) {
//                 super(props);

//                 this.state = {
//                     message: `Loading ${dataSet} data...`,
//                 };
//             }

//             public componentDidMount() {
//                 fetch(
//                     `https://raw.githubusercontent.com/reactivemarkets/react-financial-charts/master/packages/stories/src/data/${dataSet}.tsv`,
//                 )
//                     .then((response) => response.text())
//                     .then((data) => tsvParse(data, parseData()))
//                     .then((data) => {
//                         this.setState({
//                             data,
//                         });
//                     })
//                     .catch(() => {
//                         this.setState({
//                             message: `Failed to fetch data.`,
//                         });
//                     });
//             }

//             public render() {
//                 const { data, message } = this.state;
//                 if (data === undefined) {
//                     return <div className="center">{message}</div>;
//                 }

//                 return <OriginalComponent {...(this.props as TProps)} data={data} />;
//             }
//         };
//     };
// }

// export default withOHLCData;

import * as React from 'react'
import { tsvParse } from 'd3-dsv'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse('%Y-%m-%d')

const parseData = () => {
    return d => {
        const date = parseDate(d.date)
        if (date === null) {
            d.date = new Date(Number(d.date))
        } else {
            d.date = new Date(date)
        }
        Object.keys(d).forEach(key => {
            if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
                d[key] = +d[key]
            }
        })
        return d
    }
}

const withOHLCData = (dataSet = 'DAILY') => {
    return OriginalComponent => {
        return class WithOHLCData extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    message: `Loading ${dataSet} data...`,
                }
            }

            componentDidMount() {
                fetch(
                    `https://raw.githubusercontent.com/reactivemarkets/react-financial-charts/master/packages/stories/src/data/${dataSet}.tsv`,
                )
                    .then(response => response.text())
                    .then(data => tsvParse(data, parseData()))
                    .then(data => {
                        this.setState({
                            data,
                        })
                    })
                    .catch(() => {
                        this.setState({
                            message: `Failed to fetch data.`,
                        })
                    })
            }

            render() {
                const { data, message } = this.state
                if (data === undefined) {
                    return React.createElement('div', { className: 'center' }, message)
                }
                return React.createElement(
                    OriginalComponent,
                    Object.assign({}, this.props, { data }),
                )
            }
        }
    }
}
export default withOHLCData
