"use client";

import React from 'react';
import {Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis} from "recharts";

interface Props {
    openIssues: number;
    inProgressIssues: number;
    closedIssues: number;

}

const IssueChart = ({openIssues, inProgressIssues, closedIssues}: Props) => {
    const data: {
        label: string;
        value: number;
        fill: string;
    }[] = [
        {label: 'Open', value: openIssues, fill: '#bf1b1e'},
        {label: 'In Progress', value: inProgressIssues, fill: '#ffa500'},
        {label: 'Closed', value: closedIssues, fill: '#1abc9c'},
    ];


    // @ts-ignore
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="label" />
                <YAxis />
                <Bar dataKey="value" barSize={60} radius={[5, 5, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IssueChart;





