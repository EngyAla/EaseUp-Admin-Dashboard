import Box from '@mui/material/Box';
import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

const categories = [
    'Academic Performance', 'Things Going Way', 'Control Irritations', 
    'Confident Handle', 'Unable Control', 'Upset Issues', 
    'Cannot Cope', 'Angered Bad', 'Academic Difficulties', 'Nervous Pressure'
];

const barData = [1.7, 1.8, 1.9, 2.2, 2.3, 2.4, 2.4, 2.4, 2.4, 2.7];
const lineData = [-0.5, -0.5, -0.3, -0.3, 0.7, 0.7, 0.7, 0.6, 0.7, 0.7];

export default function CombinedChart() {
    return (
        <Box sx={{ width: '100%', height: 450,  }}>
        <ChartsContainer
            margin={{ bottom: 150, top: 20 }}
            xAxis={[{ scaleType: 'band', data: categories, }]}
            series={[
            { type: 'bar', data: barData, color: '#80cbc4' }, // لون الأعمدة
            { type: 'line', data: lineData, color: '#fb8c00', showMark: true }, // لون الخط
            ]}
            // تنسيق الـ X-Axis ليظهر النص بشكل مائل (مهم جداً للنصوص الطويلة)
            sx={{
            '.MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
                transform: 'rotate(-90deg) translate(-50px, 10px)',
                textAnchor: 'end',
                fontSize: '12px',
                dominantBaseline: 'central', // محاذاة النص في المنتصف
                whiteSpace: 'nowrap', // منع كسر السطر
                bgcolor: "red"
            },
            }}
        >
            <BarPlot />
            <LinePlot />
            <MarkPlot />
            {/* إظهار كل الـ labels */}
            <ChartsXAxis tickLabelInterval={() => true} />
            <ChartsYAxis />
        </ChartsContainer>
        </Box>
    );
}