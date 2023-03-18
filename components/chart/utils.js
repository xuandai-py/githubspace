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
    for (let language in languageCount) {
       
        result.push({
            name: language ,
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