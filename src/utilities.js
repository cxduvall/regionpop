const convertName = (name) => {
    if (name === "Russia")
        return "Russian Federation";
    if (name === "Libya")
        return "Libyan Arab Jamahiriya";
    if (name === "Democratic Republic of Congo")
        return "The Democratic Republic of Congo";
    if (name === "Republic of Congo")
        return "Congo";
    if (name === "Lao People's Democratic Republic")
        return "Laos";
    if (name === "Palestinian Territories")
        return "Palestine";
    if (name === "Côte d'Ivoire")
        return "Ivory Coast";
    if (name === "Eswatini")
        return "Swaziland";
    if (name === "Timor-Leste")
        return "East Timor";
    if (name === "Czechia")
        return "Czech Republic";
    if (name === "Vatican City")
        return "Holy See (Vatican City State)";
    if (name === "Fiji")
        return "Fiji Islands"
    else
        return name;
}

// not in data: Taiwan, Kosovo, Glosorio Islands, South Georgia and South Sandwich Islands

export {convertName};