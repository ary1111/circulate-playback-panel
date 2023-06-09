import React, {useState,useEffect} from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { InlineField,AutoSizeInput} from '@grafana/ui';
import Slider from 'rc-slider'
interface Props extends PanelProps<SimpleOptions> {}

export const PlaybackPanel: React.FC<Props> = ({ options, data, width, height,timeRange,onChangeTimeRange }) => {
  const [currentTime,setCurrentTime] = useState<number>(0)
  const enableScrubber = options.enableScrubber
  let timeFrom = timeRange.from.valueOf()
  let startOfDay = timeFrom - (timeFrom % (86400 * 1000)) // Calculate start of day for scrubber
  let endOfDay = startOfDay + (86400 * 1000)
  const minTime = (startOfDay+ parseInt(options.startTimeOptions,10))-(14400*1000);
  const maxTime = (startOfDay+ parseInt(options.endTimeOptions,10))-((14400*1000));
  console.log(options.enableScrubber)
  useEffect(() => {
    setCurrentTime(minTime)
  },[minTime])
  const toHHMMSS = (secs: number) => {
    let d = new Date(1000*Math.round(secs/1000)); // round to nearest second
    function pad(i: number) { return ('0'+i).slice(-2); }
    let str = pad(d.getHours()) + ':' + pad(d.getMinutes())// + ':' + pad(d.getUTCSeconds());
    return str
  };

  useEffect(()=>{
    if (enableScrubber === true){
      onChangeTimeRange({ from:timeFrom, to: currentTime+(14400*1000) })
    }
    
  },[timeFrom,currentTime,onChangeTimeRange,enableScrubber])
  
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
  console.log(minTime)
  return (
    <div>
      <InlineField label = {"Current Time"} disabled = {true} >
        <AutoSizeInput placeholder = {enableScrubber ? toHHMMSS(currentTime+(14400*1000)): 'Disabled'}></AutoSizeInput>  
      </InlineField>
      
      <div style={{ display: "flex" }}>
      <Slider disabled = {!enableScrubber} style = {{marginLeft: 10, width: panelWidth - 50}} min={minTime} max={maxTime} value = {currentTime} onChange={onSliderChange} step = {600000} marks = {marks}></Slider>
      </div>
    </div>
  );
};
