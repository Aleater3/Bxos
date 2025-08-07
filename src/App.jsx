import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Bot, 
  GraduationCap, 
  Rocket, 
  Lightbulb, 
  TrendingUp, 
  Search,
  Plus,
  Filter,
  Star,
  Calendar,
  Users,
  DollarSign,
  Eye,
  Clock,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  Settings,
  Bell,
  User
} from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('agents')
  const [agents, setAgents] = useState([])
  const [courses, setCourses] = useState([])
  const [funnels, setFunnels] = useState([])
  const [notes, setNotes] = useState([])
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  // API base URL - will work with both local development and deployment
  const API_BASE = '/api'

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [agentsRes, coursesRes, funnelsRes, notesRes, timelineRes] = await Promise.all([
        fetch(`${API_BASE}/agents`),
        fetch(`${API_BASE}/courses`),
        fetch(`${API_BASE}/funnels`),
        fetch(`${API_BASE}/notes`),
        fetch(`${API_BASE}/timeline`)
      ])

      const [agentsData, coursesData, funnelsData, notesData, timelineData] = await Promise.all([
        agentsRes.json(),
        coursesRes.json(),
        funnelsRes.json(),
        notesRes.json(),
        timelineRes.json()
      ])

      setAgents(agentsData.agents || [])
      setCourses(coursesData.courses || [])
      setFunnels(funnelsData.funnels || [])
      setNotes(notesData.notes || [])
      setTimeline(timelineData.events || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get performance color
  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-400'
    if (performance >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'development': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'in_progress': return 'bg-blue-500'
      case 'planned': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  // Empty state component
  const EmptyState = ({ type, onAdd }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <Plus className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-300 mb-2">No {type} yet</h3>
      <p className="text-gray-500 mb-4">Get started by creating your first {type.toLowerCase()}</p>
      <button 
        onClick={onAdd}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add {type.slice(0, -1)}</span>
      </button>
    </div>
  )

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || 
                         agent.status === filterType || 
                         agent.platform === filterType ||
                         agent.type === filterType
    return matchesSearch && matchesFilter
  })

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || course.status === filterType
    return matchesSearch && matchesFilter
  })

  const filteredFunnels = funnels.filter(funnel => {
    const matchesSearch = funnel.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || funnel.status === filterType
    return matchesSearch && matchesFilter
  })

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || note.category === filterType
    return matchesSearch && matchesFilter
  })

  const filteredTimeline = timeline.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || event.status === filterType
    return matchesSearch && matchesFilter
  })

  const handleAddNew = () => {}

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                BXOS
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-400" />
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="agents" className="flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <span>Agents</span>
              <Badge variant="secondary">{agents.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <span>Courses</span>
              <Badge variant="secondary">{courses.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="funnels" className="flex items-center space-x-2">
              <Rocket className="w-4 h-4" />
              <span>Funnels</span>
              <Badge variant="secondary">{funnels.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Notes</span>
              <Badge variant="secondary">{notes.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Timeline</span>
              <Badge variant="secondary">{timeline.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mt-6 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('active')}
              >
                Active
              </Button>
              <Button
                variant={filterType === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('completed')}
              >
                Completed
              </Button>
            </div>
          </div>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            {filteredAgents.length === 0 ? (
              <EmptyState type="Agents" onAdd={() => handleAddNew('agent')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <Card key={agent.id} className="bg-gray-800/50 border-gray-700 hover:border-green-400/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <CardTitle className="text-lg">
                            {agent.custom_title || agent.name}
                          </CardTitle>
                        </div>
                        <div className={`text-2xl font-bold ${getPerformanceColor(agent.performance)}`}>
                          {agent.performance}%
                        </div>
                      </div>
                      <CardDescription className="text-gray-400">
                        {agent.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-400">
                          Tasks: <span className="text-white font-medium">{agent.tasks_completed}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          Avg Time: <span className="text-white font-medium">{agent.avg_time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={`${getStatusColor(agent.status)} text-white border-0`}>
                          {agent.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {filteredCourses.length === 0 ? (
              <EmptyState type="Courses" onAdd={() => handleAddNew('course')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="bg-gray-800/50 border-gray-700 hover:border-blue-400/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {course.instructor} • {course.provider}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Progress</span>
                          <span className="text-lg font-bold text-blue-400">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            {course.lessons_completed}/{course.total_lessons} lessons
                          </span>
                          <Badge variant="outline" className={`${getStatusColor(course.status)} text-white border-0`}>
                            {course.status}
                          </Badge>
                        </div>
                        {course.next_lesson && (
                          <div className="text-sm text-gray-400">
                            Next: {course.next_lesson}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Funnels Tab */}
          <TabsContent value="funnels" className="space-y-6">
            {filteredFunnels.length === 0 ? (
              <EmptyState type="Funnels" onAdd={() => handleAddNew('funnel')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFunnels.map((funnel) => (
                  <Card key={funnel.id} className="bg-gray-800/50 border-gray-700 hover:border-orange-400/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {funnel.custom_title || funnel.name}
                        </CardTitle>
                        <div className="text-2xl font-bold text-purple-400">
                          {funnel.conversion_rate}%
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            ${funnel.revenue.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">
                            {funnel.total_visitors}
                          </div>
                          <div className="text-sm text-gray-400">Visitors</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">
                            {funnel.total_leads}
                          </div>
                          <div className="text-sm text-gray-400">Leads</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">
                            {funnel.total_sales}
                          </div>
                          <div className="text-sm text-gray-400">Sales</div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${getStatusColor(funnel.status)} text-white border-0`}>
                        {funnel.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            {filteredNotes.length === 0 ? (
              <EmptyState type="Notes" onAdd={() => handleAddNew('note')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <Card key={note.id} className="bg-gray-800/50 border-gray-700 hover:border-yellow-400/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        {note.is_favorite && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                      </div>
                      <CardDescription className="text-gray-400">
                        {note.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{new Date(note.created_at).toLocaleDateString()}</span>
                        <div className="flex space-x-1">
                          {note.tags && note.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            {filteredTimeline.length === 0 ? (
              <EmptyState type="Timeline Events" onAdd={() => handleAddNew('timeline event')} />
            ) : (
              <div className="space-y-4">
                {filteredTimeline.map((event) => (
                  <Card key={event.id} className="bg-gray-800/50 border-gray-700 hover:border-green-400/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`}></div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <Badge variant="outline" className={`${getStatusColor(event.status)} text-white border-0`}>
                              {event.status}
                            </Badge>
                          </div>
                          <p className="text-gray-400 mb-3">{event.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(event.event_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{event.impact_level} impact</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {event.metrics && Object.entries(event.metrics).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-gray-400">{key}: </span>
                              <span className="text-white font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

