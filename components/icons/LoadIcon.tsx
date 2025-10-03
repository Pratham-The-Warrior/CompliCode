import React from 'react';

const LoadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6.226c0-1.232.996-2.226 2.226-2.226h3.026c.536 0 1.058.21 1.48.585l.705.529A2.25 2.25 0 0 1 12.37 6.01h3.26c1.232 0 2.226.994 2.226 2.226v1.55m-16.5 0h16.5" />
    </svg>
);

export default LoadIcon;