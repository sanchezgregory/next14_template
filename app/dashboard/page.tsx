import { fetchCardData, fetchCountInvoices, fetchCustomers, fetchFilteredInvoices, fetchInvoiceById, fetchLatestInvoices, fetchRevenue } from "../lib/data";
import { lusitana } from "../ui/fonts";
import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import { Card } from "../ui/dashboard/cards";
import { INVOICE_STATUS } from "../lib/constants";
import { Suspense } from "react";
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from "../ui/skeletons";

export default async function DashboardPage() {

    
    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices} = await fetchCardData()
    
    // const numberOfCustomers = (await fetchCustomers()).length
    // const numberOfInvoices = (await fetchCountInvoices())
    // const totalPendingInvoices = (await fetchFilteredInvoices(INVOICE_STATUS.PENDING,1)).length
    // const totalPaidInvoices = (await fetchFilteredInvoices(INVOICE_STATUS.PAID,1)).length
    

    return (
    <>
        <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Collected" value={totalPaidInvoices} type="collected" />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
            <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
            <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
            />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <Suspense fallback={<RevenueChartSkeleton />}>
                <RevenueChart />
            </Suspense>
            <Suspense fallback={<LatestInvoicesSkeleton />}>
                <LatestInvoices />
            </Suspense>
        </div>
        </main>
    </>
    )
}