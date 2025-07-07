'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Chip,
  Stack,
  Divider,
  Grid,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Send,
  Warning,
  CheckCircle,
  BugReport,
  Support,
  ShoppingCart,
  PriorityHigh,
  Refresh,
} from '@mui/icons-material';

const ComplaintForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' })
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('')
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const watchedTitle = watch('title', '');
  const watchedDescription = watch('description', '');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      //console.log(result)

      if (result.success) {
        setMessage({ type: 'success', text: 'Complaint submitted successfully! We will review it shortly.' })
        reset();
        setSelectedCategory('');
        setSelectedPriority('');
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit complaint' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    reset({
      title: '',
      description: '',
      category: '',
      priority: ''
    });
    setSelectedCategory('');
    setSelectedPriority('');
    setMessage({ type: '', text: '' });
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Product': return <ShoppingCart />;
      case 'Service': return <Support />
      case 'Support': return <BugReport />
      default: return null;
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const categories = [
    { value: 'Product', label: 'Product Issues', desc: 'Problems with products or features' },
    { value: 'Service', label: 'Service Related', desc: 'Customer service experiences' },
    { value: 'Support', label: 'Technical Support', desc: 'Technical help and assistance' },
  ]

  const priorities = [
    { value: 'Low', label: 'Low Priority', desc: 'Minor issues, not urgent' },
    { value: 'Medium', label: 'Medium Priority', desc: 'Standard issues requiring attention' },
    { value: 'High', label: 'High Priority', desc: 'Urgent issues needing immediate attention' },
  ];

  return (
    <Fade in timeout={600}>
      <Box sx={{ maxWidth: 870, mx: 'auto' }}>
       
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
          }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Submit Your Complaint
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            We value your feedback. Please provide detailed information about your concern 
            so we can assist you effectively.
          </Typography>
        </Paper>

       
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Chip 
              label={`${watchedTitle.length}/100 characters`}
              size="small"
              color={watchedTitle.length > 80 ? 'warning' : 'default'}
            />
            <Chip 
              label={`${watchedDescription.length}/500 characters`}
              size="small"
              color={watchedDescription.length > 450 ? 'warning' : 'default'}
            />
          </Stack>
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
              icon={message.type === 'success' ? <CheckCircle /> : <Warning />}
              onClose={() => setMessage({ type: '', text: '' })}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>

                {message.text}
              </Typography>

            </Alert>
          </Zoom>)}

        
        <Card 
          elevation={3}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
               
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Complaint Title"
                    placeholder="Brief description of your issue..."
                    variant="outlined"
                    {...register('title', { 
                      required: 'Title is required',
                      maxLength: { value: 100, message: 'Title must be less than 100 characters' }
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Detailed Description"
                    placeholder="Please provide detailed information about your complaint..."
                    multiline
                    rows={4}
                    variant="outlined"
                    {...register('description', { 
                      required: 'Description is required',
                      maxLength: { value: 500, message: 'Description must be less than 500 characters' }
                    })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>
                    Category</InputLabel>

                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: 'Category is required' }}
                      render={({ field }) => (
                        <Select
                          label="Category"
                          value={field.value || ''}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setSelectedCategory(e.target.value);
                          }}
                          sx={{ borderRadius: 2 }}>

                          {categories.map((cat) => (
                            <MenuItem key={cat.value} value={cat.value}>
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Box sx={{ mr: 2, color: 'primary.main' }}>
                                  {getCategoryIcon(cat.value)}
                                </Box> <Box>

                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {cat.label}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {cat.desc}
                                  </Typography>
                                </Box>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      )}/>

                    {errors.category && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                        {errors.category.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>


                <Grid item xs={12} md={6}>
                  <FormControl component="fieldset" error={!!errors.priority} fullWidth>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      Priority Level
                    </FormLabel>
                    <Controller
                      name="priority"
                      control={control}
                      rules={{ required: 'Priority is required' }}
                      render={({ field }) => (
                        <RadioGroup 
                          value={field.value || ''}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setSelectedPriority(e.target.value);
                          }}
                        >
                          {priorities.map((priority) => (
                            <FormControlLabel
                              key={priority.value}
                              value={priority.value}
                              control={<Radio />}
                              label={
                                <Box sx={{ ml: 1 }}>
                                  <Stack direction="row" alignItems="center" spacing={1}>
                                    <Chip 
                                      size="small" 
                                      label={priority.label}
                                      color={getPriorityColor(priority.value)}
                                      icon={priority.value === 'High' ? <PriorityHigh /> : undefined}
                                    />
                                  </Stack>
                                  <Typography variant="caption" color="text.secondary">
                                    {priority.desc}
                                  </Typography>
                                </Box>
                              }
                              sx={{ 
                                mb: 1,
                                border: '1px solid',
                                borderColor: field.value === priority.value ? 'primary.main' : 'divider',
                                borderRadius: 2,
                                p: 2,
                                mr: 0,
                                backgroundColor: field.value === priority.value ? 'primary.50' : 'transparent',
                              }}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                    {errors.priority && (
                      <Typography variant="caption" color="error">
                        {errors.priority.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

               
                <Grid item xs={12}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2} 
                    justifyContent="center"
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Refresh />}
                      onClick={resetForm}
                      disabled={loading}
                      sx={{ 
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                      }}
                    >
                      Reset Form
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                      sx={{ 
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                      }}
                    >
                      {loading ? 'Submitting...' : 'Submit Complaint'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

       
        <Paper 
          elevation={0}
          sx={{ 
            mt: 3, 
            p: 3, 
            textAlign: 'center',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}>
          <Typography variant="body2" color="text.secondary">
            Your complaint will be reviewed within 24 hours. You will receive email notifications 
            about the status updates.
          </Typography>
        </Paper>
      </Box>
    </Fade>
  );
};

export default ComplaintForm;
