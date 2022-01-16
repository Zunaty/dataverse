// Importing React
import * as React from 'react';

// Importing MUI Components
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Generate Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('Sat', 0),
    createData('Sun', 5),
    createData('Mon', 10),
    createData('Tues', 8),
    createData('Wed', 4),
    createData('Thurs', 10),
    createData('Today', 15),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography variant="h5">
                7 Day Inventory for currently selected item
            </Typography>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 25,
                        bottom: 10,
                        left: -25,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Area
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        dot={true}
                    />
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}