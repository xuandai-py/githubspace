import { pickChakraRandomColor } from "../helper/help";

const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
            {/* <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
                {value.split(' ')[1]}
            </text> */}
        </g>
    );
};

// const renderActiveShape = (props) => {
//     const RADIAN = Math.PI / 180;
//     const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);
//     const sx = cx + (outerRadius + 10) * cos;
//     const sy = cy + (outerRadius + 10) * sin;
//     const mx = cx + (outerRadius + 30) * cos;
//     const my = cy + (outerRadius + 30) * sin;
//     const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//     const ey = my;
//     const textAnchor = cos >= 0 ? 'start' : 'end';

//     return (
//         <g>
//             <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//                 {payload.name}
//             </text>
//             <Sector
//                 cx={cx}
//                 cy={cy}
//                 innerRadius={innerRadius}
//                 outerRadius={outerRadius}
//                 startAngle={startAngle}
//                 endAngle={endAngle}
//                 fill={fill}
//             />
//             <Sector
//                 cx={cx}
//                 cy={cy}
//                 startAngle={startAngle}
//                 endAngle={endAngle}
//                 innerRadius={outerRadius + 6}
//                 outerRadius={outerRadius + 10}
//                 fill={fill}
//             />
//             <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
//             <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//             <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
//             <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
//                 {`(Rate ${(percent * 100).toFixed(2)}%)`}
//             </text>
//         </g>
//     );
// };

const genLangData = (data) => {
    const result = Object.values(data.reduce((lang, { language }) => {

        if (lang[language]) {
            lang[language].value += 1;
        } else {
            lang[language] = {
                name: language,
                value: 1,
                color: pickChakraRandomColor('.300')
            };
        }
        if (lang[language].name == null) { lang[language].name = 'others' }
        return lang;
    }, {}))
    return result
}

// [
//     {
//         id: 1,
//         language: 'JavaScript',
//         stargazers_count: 6000
//     },
//     {
//         id: 2,
//         language: 'JavaScript',
//         stargazers_count: 60
//     },
//     {
//         id: 3,
//         language: 'JavaScript',
//         stargazers_count: 0
//     },
//     {
//         id: 4,
//         language: 'TypeScript',
//         stargazers_count: 267
//     },
//     {
//         id: 5,
//         language: 'TypeScript',
//         stargazers_count: 60
//     },
//     {
//         id: 6,
//         language: 'Css',
//         stargazers_count: 10
//     }
// ]' into this format: '
// [
//     {
//         language: 'JavaScript',
//         starTotal: 10000
//     },
//     {
//         language: 'TypeScripr',
//         starTotal: 327
//     },
//     {
//         language: 'Css',
//         starTotal: 10
//     }
// ]'

const genStarPerLang = (data) => {
    const prefix = data.filter(repo => repo?.stargazers_count > 0)
    const result = [];
    const languageCount = {};

    // loop over each element in the input array
    for (let i = 0; i < prefix.length; i++) {
        const item = prefix[i];

        // increment the count for the current language
        if (item.language in languageCount) {
            languageCount[item.language] += item.stargazers_count;
        } else {
            languageCount[item.language] = item.stargazers_count;
        }
    }

    // convert the languageCount object to an array of objects with the desired format
    for (const language in languageCount) {
        result.push({
            name: language,
            starTotal: languageCount[language],
            color: pickChakraRandomColor('.300')

        });
    }

    return result;


}


export {
    genLangData,
    renderCustomizedLabel,
    genStarPerLang
}