import React from 'react';

const AnalysisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V3M3.75 3H20.25M3.75 3v-1.5A2.25 2.25 0 0 1 6 0h12a2.25 2.25 0 0 1 2.25 2.25v1.5M3.75 16.5v3.375c0 .621.504 1.125 1.125 1.125h13.5c.621 0 1.125-.504 1.125-1.125V16.5M15 12h3.75M15 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

export default AnalysisIcon;
