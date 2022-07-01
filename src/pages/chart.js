import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const ChartBox = ({ AllData, id, type, coin }) => {
    const [data, setData] = useState([]);
    const [color, setColor] = useState("#00e08e");
    useEffect(() => {
        const cflt = AllData.find(item => item.currency === id)
        const chartArray = [];
        if (cflt) {
            if (cflt.prices.length > 1) {
                let min = cflt.prices.reduce(function (a, b) {
                    return Math.min(a, b);
                })

                for (let i in cflt.timestamps) {
                    const timestamp = new Date(cflt.timestamps[i]).getTime();
                    chartArray.push([timestamp, (Number(cflt.prices[i]) - min) * 10000000]);
                }
                setData(chartArray);
                if (cflt.prices[cflt.prices.length - 1] < cflt.prices[cflt.prices.length - 2]) {
                    setColor("red")
                }

                if (type === "status" && coin) {
                    if (coin.status === "text-green") {
                        setColor("#66dc95")
                    }
                    if (coin.status === "text-purple") {
                        setColor("#7700ff")
                    }
                    if (coin.status === "text-red") {
                        setColor("#ea322b")
                    }
                    if (coin.status === "text-pink") {
                        setColor("#eb0056")
                    }
                }
                if (type != "status" && coin) {
                    let priceptc = (coin['1d']?.price_change_pct * 100).toFixed(2);
                    if (priceptc >= 1) {
                        setColor("#66dc95")
                    } else if (priceptc > 0 && priceptc < 1) {
                        setColor("#7700ff")
                    } else if (priceptc <= -1) {
                        setColor("#ea322b")
                    } else if (priceptc > -1 && priceptc < 0) {
                        setColor("#eb0056")
                    }
                }

            }
        }
    }, [AllData, coin])

    return (
        <Chart
            width={type === "status" ? 150 : 200}
            height={type === "status" ? 60 : 90}
            style={{ margin: type === "status" ? '-10px' : "0px", marginTop: type === "status" ? -10 : 22, display: data.length ? "flex" : "none" }}
            chartType="LineChart"
            data={[["Year", "Sales"], ...data]}
            options={{
                lineWidth: 3,
                focusTarget: "none",
                colors: [color],
                backgroundColor: {
                    fill: "transparent",
                },
                tooltip: {
                    trigger: "none"
                },
                vAxis: {
                    textStyle: {
                        color: "transparent"
                    },
                    baselineColor: "transparent",
                    gridlines: {
                        color: "transparent"
                    }
                },
                hAxis: {
                    textStyle: {
                        color: "transparent"
                    },
                    baselineColor: "transparent",
                    gridlines: {
                        color: "transparent"
                    }
                },
                legend: {
                    position: "none"
                }
            }}
            legendToggle
        />
    );
}

export default ChartBox;
