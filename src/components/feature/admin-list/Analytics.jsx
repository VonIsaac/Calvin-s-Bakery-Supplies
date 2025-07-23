import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SideBar from '../../UI/SideBar';
import { useQuery } from '@tanstack/react-query';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { CircularProgress } from '@mui/material';
import { getSalesAnalytics } from '../../../utils/http';
import {useGetUser} from '../../hooks/hooks';

export default function Analytics() {
  useGetUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ['category-analytics'],
    queryFn: getSalesAnalytics,
  });

  const renderChart = (category, items) => {
    const barData = items.map((item) => item.quantitySold);
    const barLabels = items.map((item) => item.name);

    const pieData = items.map((item, i) => ({
      id: i,
      value: item.quantitySold,
      label: item.name,
    }));

    const lineSeries = [
      {
        data: barData,
        label: 'Quantity Sold',
      },
    ];

    const xAxis = [
      {
        scaleType: 'point',
        data: barLabels,
      },
    ];

    switch (category.toLowerCase()) {
      case 'sugar':
      case 'flour':
        return (
          <LineChart
            xAxis={xAxis}
            series={lineSeries}
            height={300}
            margin={{ left: 60, right: 30, top: 20, bottom: 40 }}
          />
        );
      case 'oil':
      case 'assorted items':
        return (
          <PieChart
            series={[{ data: pieData }]}
            height={300}
          />
        );
      default:
        return (
          <BarChart
            xAxis={[{ scaleType: 'band', data: barLabels }]}
            series={[{ data: barData, label: 'Quantity Sold' }]}
            height={300}
          />
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          bgcolor: '#f5f7fa',
          px: 3,
          pb: 5,
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'oklch(87.1% 0.15 154.449)',
            mb: 3,
            borderRadius: 1,
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <SideBar />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: '0.05em' }}>
              ANALYTICS DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Loading / Error / Charts */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Failed to load analytics data.</Typography>
        ) : (
          <Grid container spacing={3}>
            {data?.data.map((categoryData) => {
              const { category, items } = categoryData;

              return (
                <Grid item xs={12} md={6} key={category}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: '#fff',
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: '#333',
                      }}
                    >
                      {category}
                    </Typography>
                    {renderChart(category, items)}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
