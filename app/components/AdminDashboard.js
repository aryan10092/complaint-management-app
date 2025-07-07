'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Stack,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Avatar,
  LinearProgress,
} from '@mui/material';
import { 
  Visibility, 
  Delete, 
  FilterList,
  Dashboard,
  TrendingUp,
  Assignment,
  Schedule,
  CheckCircle,
  HourglassEmpty,
  PlayArrow,
  Refresh,
  Download,
  Analytics,
  PriorityHigh,
  BugReport,
  Support,
  ShoppingCart,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [updatingComplaint, setUpdatingComplaint] = useState(null)
  const [deletingComplaint, setDeletingComplaint] = useState(null); 
  const [updatingPriority, setUpdatingPriority] = useState(null)
  
  
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    fetchComplaints()
  }, [])

  useEffect(() => {
    filterComplaints();
  }, [complaints, statusFilter, priorityFilter])

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/api/complaints');
      const result = await response.json()

       //console.log(result)

      if (result.success) {
        setComplaints(result.data)
      } else {
        setMessage({ type: 'error', text: 'Failed to fetch complaints' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false)

    }}

  const filterComplaints = () => {
    let filtered = complaints;
    
    if (statusFilter) {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }
    
    if (priorityFilter) {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter);
    }
    
    setFilteredComplaints(filtered);
  };

  const updateComplaintStatus = async (id, newStatus) => {
    setUpdatingComplaint(id)
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json();

      if (result.success) {
        setComplaints(complaints.map(complaint => 
          complaint._id === id ? { ...complaint, status: newStatus } : complaint
        ))
        setMessage({ type: 'success', text: 'Status updated successfully!' })
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update status' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setUpdatingComplaint(null)
    } }

  const updateComplaintPriority = async (id, newPriority) => {
    setUpdatingPriority(id)
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority: newPriority }),
      })

      const result = await response.json()

     // console.log(result)

      if (result.success) {
        setComplaints(complaints.map(complaint => 
          complaint._id === id ? { ...complaint, priority: newPriority } : complaint
        ));
        setMessage({ type: 'success', text: 'Priority updated successfully!' })
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update priority' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setUpdatingPriority(null)
    }
  };

  const deleteComplaint = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) {
      return;
    }

    setDeletingComplaint(id)
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: 'DELETE',
      })
       
      //console.log(response)

      const result = await response.json();

      if (result.success) {
        setComplaints(complaints.filter(complaint => complaint._id !== id));
        setMessage({ type: 'success', text: 'Complaint deleted successfully!' })
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete complaint' })
      }

    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setDeletingComplaint(null)
    }}

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'In Progress': return 'warning';
      case 'Pending': return 'error';
      default: return 'default';

    }}

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved': return <CheckCircle />;
      case 'In Progress': return <PlayArrow />;
      case 'Pending': return <HourglassEmpty />;
      default: return <Assignment />;
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Product': return <ShoppingCart />;
      case 'Service': return <Support />;
      case 'Support': return <BugReport />;
      default: return <Assignment />;
    }}

  const clearFilters = () => {
    setStatusFilter('')
    setPriorityFilter('')
  }

 
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    highPriority: complaints.filter(c => c.priority === 'High').length,
  }

  if (loading) {
    return (
      <Fade in timeout={300}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px">
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Loading complaints...
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in timeout={600}>
      <Box>
      
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
          }}>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                  <Dashboard sx={{ fontSize: 28 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                    Admin Dashboard
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Manage and track all customer complaints efficiently
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Stack direction="row" spacing={2}>
              <Tooltip title="Refresh Data">
                <IconButton 
                  color="inherit" 
                  onClick={fetchComplaints}
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export Data">
                <IconButton 
                  color="inherit"
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} >
                  <Download />
                </IconButton>
              </Tooltip>

            </Stack> </Stack>
        </Paper>

       
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Assignment color="primary" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Complaints
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {complaints.length}
                    </Typography>
                  </Box>
                </Stack>  </Paper>

            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <HourglassEmpty color="warning" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Pending
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {complaints.filter(c => c.status === 'Pending').length}
                    </Typography>
                  </Box>
                </Stack> </Paper>
            </Grid>
          
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CheckCircle color="success" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Resolved
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {complaints.filter(c => c.status === 'Resolved').length}
                    </Typography>
                  </Box>
                </Stack>
              </Paper></Grid>
          </Grid>
        </Box>
      
        {message.text && (
          <Zoom in timeout={300}>
            <Alert 
              severity={message.type} 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem',
                },
              }}
              onClose={() => setMessage({ type: '', text: '' })}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {message.text}
              </Typography>
            </Alert>
          </Zoom>
        )}

       
        <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <CardContent sx={{ p: 0 }}>
            
            <Box sx={{ p: 3, backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Complaint Management
                </Typography>
                <Chip 
                  icon={<Analytics />}
                  label={`${filteredComplaints.length} of ${complaints.length} complaints`}
                  color="primary"
                  variant="outlined" />
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Filter by Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Filter by Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                      sx={{ borderRadius: 2 }} >
                      <MenuItem value="">All Statuses</MenuItem>
                      <MenuItem value="Pending">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <HourglassEmpty fontSize="small" />
                          <span>Pending</span>

                        </Stack>
                      </MenuItem>

                      <MenuItem value="In Progress">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <PlayArrow fontSize="small" />
                          <span>In Progress</span>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="Resolved">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CheckCircle fontSize="small" />
                          <span>Resolved</span>
                        </Stack>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Filter by Priority</InputLabel>
                    <Select
                      value={priorityFilter}
                      label="Filter by Priority"
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Priorities</MenuItem>
                      <MenuItem value="Low">
                        <Chip label="Low" color="success" size="small" />
                      </MenuItem>
                      <MenuItem value="Medium">
                        <Chip label="Medium" color="warning" size="small" />
                      </MenuItem>
                      <MenuItem value="High">
                        <Chip label="High" color="error" size="small" />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<FilterList />}
                    onClick={clearFilters}
                    sx={{ height: '56px', borderRadius: 2 }}
                  >
                    Clear All Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>

         
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, py: 2 }}>Complaint Details</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 2 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 2 }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 2 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 2 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 2 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredComplaints.map((complaint, index) => (
                    <TableRow 
                      key={complaint._id}
                      sx={{ 
                        '&:hover': { backgroundColor: 'action.hover' },
                        borderLeft: '4px solid',
                        borderLeftColor: complaint.priority === 'High' ? 'error.main' : 
                                        complaint.priority === 'Medium' ? 'warning.main' : 'success.main'
                      }}
                    >
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {complaint.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {complaint.description.substring(0, 60)}...
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {getCategoryIcon(complaint.category)}
                          <Typography variant="body2">
                            {complaint.category}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={complaint.priority}
                            onChange={(e) => updateComplaintPriority(complaint._id, e.target.value)}
                            disabled={updatingPriority === complaint._id || updatingComplaint === complaint._id || deletingComplaint === complaint._id}
                            sx={{ borderRadius: 1 }}
                            endAdornment={
                              updatingPriority === complaint._id ? (
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                              ) : null
                            }
                          >
                            <MenuItem value="Low">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip label="Low" color="success" size="small" />
                              </Stack>
                            </MenuItem>
                            <MenuItem value="Medium">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip label="Medium" color="warning" size="small" />
                              </Stack>
                            </MenuItem>
                            <MenuItem value="High">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip label="High" color="error" size="small" icon={<PriorityHigh />} />
                              </Stack>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                          <Select
                            value={complaint.status}
                            onChange={(e) => updateComplaintStatus(complaint._id, e.target.value)}
                            disabled={updatingComplaint === complaint._id || updatingPriority === complaint._id || deletingComplaint === complaint._id}
                            sx={{ borderRadius: 1 }}
                            endAdornment={
                              updatingComplaint === complaint._id ? (
                                <CircularProgress size={20} sx={{ mr:2 }} />
                              ) : null
                            }
                          >
                            <MenuItem value="Pending">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <HourglassEmpty fontSize="small" color="error" />
                                <span>Pending</span>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="In Progress">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <PlayArrow fontSize="small" color="warning" />
                                <span>In Progress</span>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="Resolved">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <CheckCircle fontSize="small" color="success" />
                                <span>Resolved</span>
                              </Stack>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(complaint.dateSubmitted).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(complaint.dateSubmitted).toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setSelectedComplaint(complaint);
                                setDialogOpen(true);
                              }}
                              disabled={updatingComplaint === complaint._id || deletingComplaint === complaint._id || updatingPriority === complaint._id}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={deletingComplaint === complaint._id ? "Deleting..." : "Delete"}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => deleteComplaint(complaint._id)}
                              disabled={updatingComplaint === complaint._id || deletingComplaint === complaint._id || updatingPriority === complaint._id}
                            >
                              {deletingComplaint === complaint._id ? (
                                <CircularProgress size={16} color="error" />
                              ) : (
                                <Delete />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredComplaints.length === 0 && (
              <Box textAlign="center" py={8}>
                <Assignment sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No complaints found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {complaints.length === 0 
                    ? "No complaints have been submitted yet."
                    : "Try adjusting your filters to see more results."
                  }
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        <Dialog 
          open={dialogOpen} 
          onClose={() => setDialogOpen(false)} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Complaint Details
              </Typography>
              <IconButton onClick={() => setDialogOpen(false)}>
                <Visibility />
              </IconButton>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 3 }}>
            {selectedComplaint && (
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {selectedComplaint.title}
                      </Typography>
                      
                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Chip 
                          icon={getCategoryIcon(selectedComplaint.category)}
                          label={selectedComplaint.category}
                          variant="outlined"
                        />
                        <Chip 
                          label={selectedComplaint.priority}
                          color={getPriorityColor(selectedComplaint.priority)}
                          icon={selectedComplaint.priority === 'High' ? <PriorityHigh /> : undefined}
                        />
                        <Chip 
                          icon={getStatusIcon(selectedComplaint.status)}
                          label={selectedComplaint.status}
                          color={getStatusColor(selectedComplaint.status)}
                        />
                      </Stack>
                      
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <Schedule fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          Submitted on {new Date(selectedComplaint.dateSubmitted).toLocaleString()}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Description
                    </Typography>
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        {selectedComplaint.description}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button 
              onClick={() => setDialogOpen(false)}
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default AdminDashboard;
