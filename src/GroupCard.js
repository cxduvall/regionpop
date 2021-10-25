import React, { useRef, useEffect, useState } from 'react';

const GroupCard = ({ name, group }) => {
    return <div color = "#0000CC">{name}: {JSON.stringify(group)}</div>;
}

export default GroupCard;