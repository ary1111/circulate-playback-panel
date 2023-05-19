import React, {useState,useEffect} from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { InlineField,AutoSizeInput,Select,Label} from '@grafana/ui';
import Slider from 'rc-slider'
interface Props extends PanelProps<SimpleOptions> {}

export const PlaybackPanel: React.FC<Props> = ({ options, data, width, height,timeRange,onChangeTimeRange }) => {
  const [currentTime,setCurrentTime] = useState<number>(0)
  let timeFrom = timeRange.from.valueOf()
  

  
  let startOfDay = timeFrom - (timeFrom % (86400 * 1000)) // Calculate start of day for scrubber
  //startOfDay += ((new Date).getTimezoneOffset() * 60 * 1000);
  let endOfDay = startOfDay + (86400 * 1000)
  // Default 9-5
  const [minTime,setMinTime] = useState<number>(startOfDay+ 3600000*9);
  const [maxTime,setMaxTime] = useState<number>(startOfDay+ 3600000*17)
  useEffect(() => {
    setCurrentTime(minTime)
  },[minTime])
  const toHHMMSS = (secs: number) => {
    let d = new Date(1000*Math.round(secs/1000)); // round to nearest second
    function pad(i: number) { return ('0'+i).slice(-2); }
    let str = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes())// + ':' + pad(d.getUTCSeconds());
    return str
  };

  useEffect(()=>{
    onChangeTimeRange({ from:timeFrom, to: currentTime })
  },[currentTime,timeFrom,currentTime,onChangeTimeRange])
  
  const onSliderChange = (value: any) =>{
    console.log("Value",value)
    setCurrentTime(value)
  }
  let marks: any = {}
  marks[startOfDay] = '00:00'
  marks[endOfDay] = '23:59'
  // construct hours
  let hourlyVariables = []
  for (let i = 1;i < 24; i++){
    hourlyVariables.push(startOfDay + 3600000*i)
  }
  let hour = 0
  let selectOptions = []
  for (let i = 0; i < hourlyVariables.length; i++){
    hour +=1
    function pad(i: number) { return ('0'+i).slice(-2); }
    let str = pad(hour) + ':00'
    selectOptions.push({label:str,value:hourlyVariables[i]})
    marks[hourlyVariables[i]] = str
  }
  let panelWidth = width;
  return (
    <div>
      <div style = {{display: "flex"}}>
      <Label>Start Time</Label>
      <Select options = {selectOptions} placeholder = {toHHMMSS(minTime)} onChange = {(v) => {setMinTime(v.value as number)}}></Select>
      <Label>End Time</Label>
      <Select options = {selectOptions} placeholder = {toHHMMSS(maxTime)} onChange = {(v) => {setMaxTime(v.value as number)}}></Select>
      </div>
      <InlineField label = {"Current Time"} disabled = {true} >
        <AutoSizeInput placeholder = {toHHMMSS(currentTime)}></AutoSizeInput>  
      </InlineField>
      
      <div style={{ display: "flex" }}>
      <Slider style = {{marginLeft: 10, width: panelWidth - 50}} min={minTime} max={maxTime} value = {currentTime} onChange={onSliderChange} step = {600000} marks = {marks}></Slider>
      </div>
    </div>
  );
};
