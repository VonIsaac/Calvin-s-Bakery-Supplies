import React, { useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SideBar from '../../UI/SideBar';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { getSalesAnalytics } from '../../../utils/http';
import { useGetUser } from '../../hooks/hooks';

const COLORS = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Donut Chart Component
const DonutChart = ({ data, type = 'quantity', totalQuantitySold, totalRevenue }) => {
  const centerX = 150;
  const centerY = 150;
  const outerRadius = 120;
  const innerRadius = 70;
  
  let cumulativeAngle = 0;
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="300" height="300" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
        {data.map((segment) => {
          const percentage = type === 'quantity' ? 
            (segment.value / totalQuantitySold) * 100 : 
            (segment.revenue / totalRevenue) * 100;
          
          const angle = (percentage / 100) * 360;
          const startAngle = cumulativeAngle;
          const endAngle = cumulativeAngle + angle;
          
          cumulativeAngle += angle;
          
          const startAngleRad = (startAngle - 90) * (Math.PI / 180);
          const endAngleRad = (endAngle - 90) * (Math.PI / 180);
          
          const x1 = centerX + outerRadius * Math.cos(startAngleRad);
          const y1 = centerY + outerRadius * Math.sin(startAngleRad);
          const x2 = centerX + outerRadius * Math.cos(endAngleRad);
          const y2 = centerY + outerRadius * Math.sin(endAngleRad);
          
          const x3 = centerX + innerRadius * Math.cos(endAngleRad);
          const y3 = centerY + innerRadius * Math.sin(endAngleRad);
          const x4 = centerX + innerRadius * Math.cos(startAngleRad);
          const y4 = centerY + innerRadius * Math.sin(startAngleRad);
          
          const largeArc = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${x1} ${y1}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
            'Z'
          ].join(' ');
          
          return (
            <g key={segment.name}>
              <path
                d={pathData}
                fill={segment.color}
                style={{ 
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => { e.target.style.opacity = '0.8'; }}
                onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
                stroke="white"
                strokeWidth="2"
              />
              {percentage > 5 && (
                <text
                  x={centerX + (outerRadius + innerRadius) / 2 * Math.cos((startAngle + angle / 2 - 90) * Math.PI / 180)}
                  y={centerY + (outerRadius + innerRadius) / 2 * Math.sin((startAngle + angle / 2 - 90) * Math.PI / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {percentage.toFixed(1)}%
                </text>
              )}
            </g>
          );
        })}
        
        {/* Center text */}
        <text x={centerX} y={centerY - 10} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
          {type === 'quantity' ? 'Sales' : 'Revenue'}
        </text>
        <text x={centerX} y={centerY + 10} textAnchor="middle" fontSize="14" fill="#666">
          {type === 'quantity' ? 'Product' : 'by Value'}
        </text>
      </svg>
    </Box>
  );
};

export default function AlternativeAnalytics() {
  useGetUser();
  const [tabValue, setTabValue] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['category-analytics'],
    queryFn: getSalesAnalytics,
  });

  const processedData = useMemo(() => {
    if (!data?.data) return { categoryData: [], topProducts: [], totalQuantitySold: 0, totalRevenue: 0 };

    const allProducts = data.data.flatMap(({ category, items }) =>
      items.map(item => ({ ...item, category }))
    );

    // Calculate total sales and revenue
    const totalQuantitySold = allProducts.reduce((sum, product) => sum + product.quantitySold, 0);
    const totalRevenue = allProducts.reduce((sum, product) => sum + (product.quantitySold * product.price), 0);

    // Group by category for donut chart
    const categoryData = data.data.map((cat, index) => {
      const categoryTotal = cat.items.reduce((sum, item) => sum + item.quantitySold, 0);
      const categoryRevenue = cat.items.reduce((sum, item) => sum + (item.quantitySold * item.price), 0);
      return {
        name: cat.category.replace('-', ' ').toUpperCase(),
        value: categoryTotal,
        revenue: categoryRevenue,
        percentage: ((categoryTotal / totalQuantitySold) * 100).toFixed(1),
        revenuePercentage: ((categoryRevenue / totalRevenue) * 100).toFixed(1),
        color: COLORS[index % COLORS.length],
        items: cat.items
      };
    });

    // Sort products by quantity sold for ranking
    const topProducts = allProducts
      .sort((a, b) => b.quantitySold - a.quantitySold)
      .slice(0, 10)
      .map((product, index) => ({
        ...product,
        rank: index + 1,
        revenue: product.quantitySold * product.price,
        percentage: ((product.quantitySold / totalQuantitySold) * 100).toFixed(1)
      }));

    return { categoryData, topProducts, totalQuantitySold, totalRevenue };
  }, [data]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return <Typography color="error">Failed to load analytics data.</Typography>;
    }

    return (
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          backgroundColor: '#fff',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="analytics tabs"
            sx={{ 
              backgroundColor: 'oklch(87.1% 0.15 154.449)',
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }
            }}
          >
            <Tab label="Category Analysis" />
            <Tab label="Top Products Ranking" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#222',
              letterSpacing: '0.05em',
              textAlign: 'center'
            }}
          >
            PRODUCTS ANALYTICS DASHBOARD (MOST SOLD)
          </Typography>

          <Grid container spacing={4}>
            {/* Quantity Donut Chart */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#444' }}>
                  Product Sales Distribution
                </Typography>
                <DonutChart 
                  data={processedData.categoryData} 
                  type="quantity" 
                  totalQuantitySold={processedData.totalQuantitySold}
                  totalRevenue={processedData.totalRevenue}
                />
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    {processedData.categoryData.map((category) => (
                      <Grid item xs={6} key={category.name}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            p: 1, 
                            backgroundColor: '#f9f9f9', 
                            borderRadius: 1,
                            border: '1px solid #e0e0e0'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box 
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: category.color
                              }}
                            />
                            <Typography variant="caption" sx={{ fontWeight: 600, color: '#555' }}>
                              {category.name}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#333' }}>
                            {category.value} ({category.percentage}%)
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>

            {/* Revenue Donut Chart */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#444' }}>
                  Revenue Distribution by Value
                </Typography>
                <DonutChart 
                  data={processedData.categoryData} 
                  type="revenue" 
                  totalQuantitySold={processedData.totalQuantitySold}
                  totalRevenue={processedData.totalRevenue}
                />
                <Box sx={{ mt: 2 }}>
                  {processedData.categoryData
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((category) => (
                    <Box 
                      key={category.name}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 1, 
                        mb: 1,
                        backgroundColor: '#f9f9f9', 
                        borderRadius: 1,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: category.color
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#555' }}>
                          {category.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#333' }}>
                        ₱{category.revenue.toLocaleString()} ({category.revenuePercentage}%)
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Summary Stats */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {processedData.totalQuantitySold}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Units Sold
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    ₱{processedData.totalRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Revenue
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {processedData.categoryData.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Categories
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    ₱{Math.round(processedData.totalRevenue / processedData.totalQuantitySold)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Avg. Price
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#222',
              letterSpacing: '0.05em',
              textAlign: 'center'
            }}
          >
            TOP 10 BEST SELLING PRODUCTS
          </Typography>

          <Box sx={{ space: 2 }}>
            {processedData.topProducts.map((product, index) => (
              <Paper
                key={product.name}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  '&:hover': {
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#5470C6',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.875rem'
                      }}
                    >
                      {product.rank}
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                      {product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#333' }}>
                      {product.quantitySold} units ({product.percentage}%)
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      ₱{product.revenue.toLocaleString()} revenue
                    </Typography>
                  </Box>
                </Box>
                
                {/* Progress Bar */}
                <Box sx={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: 1, height: 8, mb: 1 }}>
                  <Box
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      backgroundColor: COLORS[index % COLORS.length],
                      width: `${(product.quantitySold / processedData.topProducts[0].quantitySold) * 100}%`,
                      transition: 'width 0.5s ease-out'
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Category: {product.category.replace('-', ' ').toUpperCase()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Stock: {product.stock}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Performance Insights */}
          <Paper elevation={1} sx={{ p: 3, mt: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#333' }}>
              Performance Insights
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#555', mb: 1 }}>
                  Top Performer
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  <strong>{processedData.topProducts[0]?.name}</strong> leads with {processedData.topProducts[0]?.quantitySold} units sold
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#555', mb: 1 }}>
                  Category Leader
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  <strong>{processedData.categoryData.sort((a, b) => b.value - a.value)[0]?.name}</strong> has the most total sales
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </Paper>
    );
  }, [data, isLoading, error, tabValue, processedData]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          px: { xs: 2, md: 3 },
          pb: 5,
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'oklch(87.1% 0.15 154.449)',
            mb: 3,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Toolbar>
            <SideBar />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em' }}>
              ALTERNATIVE ANALYTICS DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>

        {content}
      </Box>
    </Box>
  );
}