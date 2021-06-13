
import {useEffect, useState} from "react";
import {get_stats, update_stats} from "./api";
import {config} from "./config";
import useInterval from "@use-it/interval";

export const StatsPanel = () => {
    const [data, setData] = useState({})

    const fetchData = async (device) => {
        const data = await get_stats(device);
        setData(data);
    }

    useEffect(() => {
        fetchData(config.device)
    }, [])


    useInterval(() => {
        const requestData = async () => {
            await update_stats(config.device);
            await fetchData(config.device)
        }
        requestData()
    }, 3000);


    return(
    <div>
        <ul>
            <li>Average  daily use: {data.avg_daily_use_gals?.toFixed(2)} litres</li>
            <li>Treated water available: {data.treated_water_avail_gals?.toFixed(2)} litres</li>
            <li>Litres used today: {data.gallons_used_today?.toFixed(2)}</li>
            <li>Current water flow: {data.current_water_flow?.toFixed(2)}</li>
            <li>Status: {data.status}</li>
            <li>Regen remaining time: {data.regen_time_rem?.toISOString().substr(11, 8)}</li>
            <li>Days since last regen: {data.days_since_last_regen}</li>
            <li>Remaining ion-exchange capacity: {data.capacity_remaining_percent}% (min: {data.average_exhaustion_percent}%)</li>
            <li>Salt level: {data.salt_level}%</li>
            <li>Out of salt estimate days: {data.out_of_salt_estimate_days}</li>
            <li>Hardenss: {data.hardness?.toFixed(2)} ppm</li>
        </ul>
    </div>
    )
}