import * as React from 'react';
import Box from '@mui/material/Box';
import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

const categories = [
    'Unable Stop Worrying', 'Afraid Something Awful', 'Trouble Relaxing', 
    'Anxious On Edge', 'Easily Annoyed', 'Restless Cannot Sit', 
    'Worry Too Much'
];

const barData = [1.7, 1.8, 1.9, 2.2, 2.3, 2.4, 2.4, 2.4, 2.4, 2.7];

export default function AdminBarChart() {
    return (
        <Box sx={{ width: '100%', height: 450 }}>
            <ChartsContainer
                margin={{ bottom: 150, top: 20 }}
                xAxis={[{ scaleType: 'band', data: categories }]}
                series={[
                    { type: 'bar', data: barData, color: '#80cbc4' }, // تم الإبقاء على الـ bar فقط
                ]}
                sx={{
                    '.MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
                        transform: 'rotate(-90deg) translate(-50px, 30px)',
                        textAnchor: 'end',
                        fontSize: '12px',
                        dominantBaseline: 'central',
                        whiteSpace: 'nowrap',
                    },
                }}
            >
                <BarPlot />
                {/* تم حذف LinePlot و MarkPlot */}
                <ChartsXAxis tickLabelInterval={() => true} />
                <ChartsYAxis />
            </ChartsContainer>
        </Box>
    );
}