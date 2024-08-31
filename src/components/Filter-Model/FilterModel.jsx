import React, { useState } from 'react';
import { AppBar, Toolbar, Select, MenuItem, TextField, Box, Slider, Typography } from '@mui/material';
import { useDarkMode } from '../../hooks/darkMode';

export default function FilterModel({ categories, onCategoryChange, onPriceChange, onSearch }) {

  const [darkMode] = useDarkMode();
  const [price, setPrice] = useState([0, 8]); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const handleCategoryChange = ({ target: { value } }) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
    onPriceChange(newValue);
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearchTitle(value);
    onSearch(value);
  };

  return (
    <AppBar 
        position="static" 
        color="transparent" 
        elevation={0}
        sx={{ mt: 5, px: 2, }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'space-between' }, 
          gap: { xs: 2, sm: 0 }, 
        }}
      >
        {/* Dropdown for categories */}
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          sx={{
            mr: { sm: 2 },
            minWidth: { xs: 120, sm: 150 },
            bgcolor: darkMode ? 'white' : '',
          }}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>

        {/* Slider for price filter */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: { sm: 2 },
            width: { xs: '100%', sm: 'auto' }, 
            justifyContent: { xs: 'center', sm: 'flex-start' }, 
          }}
        >
          <Typography
            variant='caption'
            sx={{ whiteSpace: 'nowrap' }} 
          >
            Price:
          </Typography>
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            sx={{
              width: { xs: '80%', sm: 200 },
              ml: 2,
            }}
            min={0}
            max={2000}
          />
          <Typography variant="body2" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
            ${price[0]} - ${price[1]}
          </Typography>
        </Box>

        {/* TextField for search by title */}
        <TextField
          value={searchTitle}
          onChange={handleSearchChange}
          label="Search by title"
          variant="outlined"
          size="small"
          sx={{
            width: { xs: '100%', sm: 300 }, // Full width on small screens
            bgcolor: darkMode ? 'white' : '',
            mt: { xs: 2, sm: 0 }, // Margin top on small screens
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
