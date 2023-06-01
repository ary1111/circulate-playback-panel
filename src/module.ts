import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { PlaybackPanel } from './components/PlaybackPanel';

export const plugin = new PanelPlugin<SimpleOptions>(PlaybackPanel).setPanelOptions((builder) => {
  //
  let hourlyVariables = [];
  for (let i = 0;i < 24; i++){
    hourlyVariables.push(3600000*i)
  }
  let hour = 0
  let selectOptions = []
  for (let i = 4; i < hourlyVariables.length-4; i++){
    
    function pad(i: number) { return ('0'+i).slice(-2); }
    let str = pad(hour) + ':00'
    selectOptions.push({label:str,value:hourlyVariables[i]})
    hour +=1
  }
  console.log(selectOptions)
  return builder
    .addBooleanSwitch({
      path:'enableScrubber',
      name: 'Enable Scrubber',
      defaultValue: false
    })
    .addSelect({
      path: 'startTimeOptions',
      defaultValue: 32400000,
      name: 'Start Time',
      settings: {
        options: selectOptions
      }
    })
    .addSelect({
      path: 'endTimeOptions',
      defaultValue: 61200000,
      name: 'End Time',
      settings: {
        options: selectOptions
      }
    });
});
