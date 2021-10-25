import React, { useRef, useEffect, useState } from 'react';
import GroupCard from './GroupCard';

const GroupList = ({ groups }) => (
    <div style={{backgroundColor: "#00FF00"}}>
    {Object.keys(groups).map(groupName => {
        const group = groups[groupName];
        return <GroupCard key={groupName} name = {groupName} group = {group} />;
    })}
    </div>
)

export default GroupList;