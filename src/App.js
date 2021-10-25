import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import GroupList from './GroupList';

import { convertName } from './utilities.js'

import * as data from "country-json/src/country-by-population.json";
const dataBetter = data.default;
const pops = dataBetter.pops;

/*import firebase from 'firebase/compat/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDh4GZBbNj7WwkVUaokVe7Rx-bfdO6f_Ag",
  authDomain: "regionpop.firebaseapp.com",
  projectId: "regionpop",
  storageBucket: "regionpop.appspot.com",
  messagingSenderId: "913147137827",
  appId: "1:913147137827:web:c7958e60548dbd8afb4696"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();*/

am4core.useTheme(am4themes_animated);

const App = (props) => {
  const chart = useRef(null);

  const [fillColor, setFillColor] = useState("#CC0000");
  const [groups, setGroups] = useState({"Group 1": {color: fillColor, population: 0, countries: []}});
  const [group, setGroup] = useState("Group 1");

  const addCountry = (name) => {
    setGroups(groups => {
      let groupCopy = JSON.parse(JSON.stringify(groups[group]));
      groupCopy.countries.push(name);
      const pop = CountryPop(name);
      if(pop)
        groupCopy.population += pop;
      else
        return groups;
      let groupsCopy = JSON.parse(JSON.stringify(groups));
      groupsCopy[group] = groupCopy;
      return groupsCopy;
    });
  }

  const removeCountry = (name) => {
    console.log(`remove ${name}`);
    setGroups(groups => {
      const theGroup = Object.values(groups).filter(g => g.countries.indexOf(name) !== -1)[0];
      let groupCopy = JSON.parse(JSON.stringify(theGroup));
      groupCopy.countries.splice(groupCopy.countries.indexOf(name), 1);
      const pop = CountryPop(name);
      if(pop)
        groupCopy.population -= pop;
      else
        return groups;
      let groupsCopy = JSON.parse(JSON.stringify(groups));
      groupsCopy[group] = groupCopy;
      return groupsCopy;
    });
  }

  /* Create the map */
  useEffect(() => {
    const clickCountry = (ev) => {
      const name = ev.target.dataItem.dataContext.name;
      ev.target.isActive ? removeCountry(name) : addCountry(name);
      ev.target.isActive = !ev.target.isActive;
      ev.target.fill = fillColor;
    }

    let chart = am4core.create("chartdiv", am4maps.MapChart);

    //x.paddingRight = 20;
    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    //x.projection = am4maps.projections.Eckert6;

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}"; // label
    polygonTemplate.fill = am4core.color("#AAAAAA");

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover"); // hover state
    hs.properties.fill = am4core.color("#555555");

    /* ZOOM BUTTONS */

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Create active state
    let activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = fillColor;

    // Create an event to toggle "active" state
    polygonTemplate.events.on("hit", clickCountry)

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = "fill";

    chart.background.fill = am4core.color("#aadaff");
    chart.background.fillOpacity = 1;

      return () => {
        chart.dispose();
      };
    }, []); // dep arr

    const CountryPop = (name) => {
      const newName = convertName(name);
      const pop = pops.find(entry => entry.country === newName);
      if(Object.keys(pop).indexOf("population") !== -1)
        return pop.population
      else
        alert("No data available for " + name + ".");
        return 0;
    }

    return (
      <>
        <h1 style={{marginLeft: "30px" }}>RegionPop</h1>
        <h4 style={{marginLeft: "30px" }}>Calculate populations of world regions.</h4>
        <div id="chartdiv" style={{ width: "90%", height: "450px", margin: "auto" }}></div>
        <p>{JSON.stringify(groups)}</p>
        <p>{JSON.stringify(group)}</p>
        <GroupList groups={groups}/>
        <p>Created by Chase Duvall. <a href="https://github.com/cxduvall/regionpop">GitHub</a></p>
      </>
    );
}

export default App;