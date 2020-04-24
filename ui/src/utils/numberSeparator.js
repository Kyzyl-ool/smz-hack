import React from 'react';

export default function numberFormat(num, smallSpacing = true) {
    if (!isFinite(num)) {
        return num;
    }
    const parts = num.toString().split('.');
    const p = parts[0].split(/\B(?=(\d{3})+(?!\d))/g);
    const q = p;
    for (let i = 1; i < q.length; i+=1) {
        q.splice(i, 1);
    }
    if (q.length < 2)
        return num;
    return q.map((value, index) => <span key={index}>
        {value}
        {index < q.length-1 && <span style={{display: 'inline-block', fontSize: smallSpacing ? '8px' : '16px'}}>&nbsp;</span>}
    </span>)
}
