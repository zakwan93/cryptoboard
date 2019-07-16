import highchartsConfig from "./HighchartsConfig";
import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import HighchartTheme from "./HighchartTheme";

ReactHighcharts.Highcharts.setOptions(HighchartTheme);

export default function() {
  return (
    <AppContext.Consumer>
      {({ historical }) => (
        <Tile>
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
