import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import service from './services/config.services'
import Loading from './Loading'

function Dashboard() {
  const [exceptions, setExceptions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchExceptions()
  }, [])

  const fetchExceptions = async () => {
    try {
      const response = await service.get('/exceptions')
      setExceptions(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching exceptions:', error)
      setLoading(false)
    }
  }

  const getLastMonthData = () => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    return exceptions.filter(exc => {
      const excDate = exc.createdAt?.$date ? new Date(exc.createdAt.$date) : new Date(exc.createdAt)
      return excDate >= thirtyDaysAgo
    })
  }

  const getCostByType = () => {
    const lastMonthData = getLastMonthData()
    const grouped = lastMonthData.reduce((acc, exc) => {
      const type = exc.type || 'unknown'
      if (!acc[type]) {
        acc[type] = { type, totalCost: 0, count: 0 }
      }
      acc[type].totalCost += exc.totalCost || 0
      acc[type].count += 1
      return acc
    }, {})

    return Object.values(grouped).map(item => ({
      ...item,
      totalCost: parseFloat(item.totalCost.toFixed(2))
    }))
  }

  const getStatusDistribution = () => {
    const lastMonthData = getLastMonthData()
    const grouped = lastMonthData.reduce((acc, exc) => {
      const status = exc.status || 'unknown'
      if (!acc[status]) {
        acc[status] = { status, count: 0, cost: 0 }
      }
      acc[status].count += 1
      acc[status].cost += exc.totalCost || 0
      return acc
    }, {})

    return Object.values(grouped)
  }

  const getExceptionsByTaskType = () => {
    const lastMonthData = getLastMonthData()
    const grouped = lastMonthData.reduce((acc, exc) => {
      const taskType = exc.taskType || 'unknown'
      if (!acc[taskType]) {
        acc[taskType] = { taskType, count: 0, totalCost: 0 }
      }
      acc[taskType].count += 1
      acc[taskType].totalCost += exc.totalCost || 0
      return acc
    }, {})

    return Object.values(grouped).map(item => ({
      ...item,
      totalCost: parseFloat(item.totalCost.toFixed(2))
    }))
  }

  const getTopRootCauses = () => {
    const lastMonthData = getLastMonthData()
    const grouped = lastMonthData.reduce((acc, exc) => {
      const rootcauseId = exc.rootcause?._id || exc.rootcause?.$oid || exc.rootcause || 'Unknown'
      const rootcauseTitle = exc.rootcause?.title || exc.rootcause?.name || 'Unknown'

      const displayName = rootcauseTitle === 'Unknown'
        ? 'Unknown'
        : rootcauseTitle.length > 5
          ? `${rootcauseTitle.substring(0, 10)}...`
          : rootcauseTitle

      if (!acc[rootcauseId]) {
        acc[rootcauseId] = {
          id: rootcauseId,
          name: displayName,
          fullName: rootcauseTitle,
          cost: 0,
          count: 0
        }
      }
      acc[rootcauseId].cost += exc.totalCost || 0
      acc[rootcauseId].count += 1
      return acc
    }, {})

    return Object.values(grouped)
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 5)
      .map(item => ({
        ...item,
        cost: parseFloat(item.cost.toFixed(2))
      }))
  }

  const handleRootCauseClick = (data) => {
    if (data && data.id && data.id !== 'Unknown') {
      navigate(`/root-causes/${data.id}`)
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  if (loading) {
    return <Loading/>
  }

  const lastMonthData = getLastMonthData()
  const costByType = getCostByType()
  const statusDistribution = getStatusDistribution()
  const taskTypeData = getExceptionsByTaskType()
  const rootCauseData = getTopRootCauses()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Exception Analytics - Last 30 Days</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-zinc-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Exceptions</h3>
          <p className="text-2xl font-bold">{lastMonthData.length}</p>
        </div>
        <div className="bg-zinc-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Cost</h3>
          <p className="text-2xl font-bold">
            ${lastMonthData.reduce((sum, exc) => sum + (exc.totalCost || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-zinc-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Cost per Exception</h3>
          <p className="text-2xl font-bold">
            ${lastMonthData.length > 0
              ? (lastMonthData.reduce((sum, exc) => sum + (exc.totalCost || 0), 0) / lastMonthData.length).toFixed(2)
              : '0.00'}
          </p>
        </div>
        <div className="bg-zinc-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Most Common Type</h3>
          <p className="text-2xl font-bold capitalize">
            {costByType.length > 0
              ? costByType.sort((a, b) => b.count - a.count)[0]?.type
              : 'N/A'}
          </p>
        </div>
      </div>

      {lastMonthData.length === 0 ? (
        <div className="bg-zinc-100 p-8 rounded-lg text-center shadow-sm">
          <p className="text-gray-500 text-lg">No exceptions found in the last 30 days</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-zinc-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Total Cost by Exception Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="totalCost" fill="#8884d8" name="Total Cost ($)" />
                <Bar yAxisId="right" dataKey="count" fill="#82ca9d" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Exception Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.status} (${entry.count})`}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Exceptions by Task Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="taskType" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#ffc658" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Exception Count" />
                <Bar yAxisId="right" dataKey="totalCost" fill="#ffc658" name="Total Cost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top 5 Root Causes by Cost (Click to view details)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rootCauseData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
                <Legend />
                <Bar
                  dataKey="cost"
                  fill="#FF8042"
                  name="Total Cost ($)"
                  onClick={handleRootCauseClick}
                  style={{ cursor: 'pointer' }}
                />
                <Bar
                  dataKey="count"
                  fill="#00C49F"
                  name="Occurrences"
                  onClick={handleRootCauseClick}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}
    </div>
  )
}

export default Dashboard