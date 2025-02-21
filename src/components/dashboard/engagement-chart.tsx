"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
}

const data = {
  labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
  datasets: [
    {
      label: "Vues",
      data: [65, 59, 80, 81, 56, 55],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Commentaires",
      data: [28, 48, 40, 19, 86, 27],
      borderColor: "rgb(255, 99, 132)",
      tension: 0.1,
    },
  ],
}

export function EngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <Line options={options} data={data} />
      </CardContent>
    </Card>
  )
}

