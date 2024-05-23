import { fetchRevenue } from "../lib/data";

export default async function DashboardPage() {

    const revenue = await fetchRevenue();
    console.log(revenue)

    return (
        <>
             Dashboard page
        </>
    )
}