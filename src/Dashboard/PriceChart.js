import highchartsConfig from "./HighchartsConfig";
import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import HighchartTheme from "./HighchartTheme";
import ChartSelect from "./ChartSelect";

ReactHighcharts.Highcharts.setOptions(HighchartTheme);

export default function() {
  return (
    <AppContext.Consumer>
      {({ historical, chargeChangeSelect }) => (
        <Tile>
          <ChartSelect
            defaultValue="months"
            onChange={e => chargeChangeSelect(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </ChartSelect>
          {historical ? (
            <ReactHighcharts config={highchartsConfig(historical)} />
          ) : (
            <div> Loading Historical Data </div>
          )}
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
