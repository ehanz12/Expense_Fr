import { useEffect, useState } from "react";
import axios from "../api/axios";


export default function CartDaily() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios.get("/expense/summary?period=daily")
        .then((res) => setChartData(res.total))
    }, []);

    return (
        <div className="bg-white p-4 shadow rounded">
            <Bar>
                <data value={{ 
                    labels : chartData.map(i => i.total),
                    datasets : [
                        {
                            label: "Pengeluaran Harian",
                            data : chartData.map(i => i.total)
                        }
                    ]
                 }} />
            </Bar>
        </div>
    )
}