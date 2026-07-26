import { type SVGProps } from "react";

interface FloorPlanSvgProps extends SVGProps<SVGSVGElement> {
  selectedBoothId?: string;
  onBoothClick?: (id: string) => void;
  // Map of boothId -> status for coloring
  boothStatuses?: Record<string, string>;
}

export function FloorPlanSvg({
  selectedBoothId,
  onBoothClick,
  boothStatuses = {},
  ...props
}: FloorPlanSvgProps) {
  // Helper to determine background class/fill based on status or selection
  function getStyle(id: string, _defaultClass?: string) {
    const isSelected = selectedBoothId === id;
    if (isSelected) return { fill: "#270585" }; // highlight color on select

    const status = boothStatuses[id];
    if (status) {
      if (/booked|sold|hold/i.test(status)) {
        return { fill: "#cbd5e1" }; // gray out booked stalls
      }
      if (/interest|reserve/i.test(status)) {
        return { fill: "#f0d27a" }; // gold for reserved
      }
    }
    return undefined; // use class default
  }

  function handleGroupClick(id: string) {
    if (onBoothClick) onBoothClick(id);
  }

  return (
    <svg
      version="1.1"
      viewBox="0 0 2100 1450"
      xmlSpace="preserve"
      className="w-full h-auto"
      {...props}
    >
      <style type="text/css">
        {`
          .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#A8D4AF;}
          .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#00CC00;}
          .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#009846;}
          .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#CCFFCC;}
          .st4{fill-rule:evenodd;clip-rule:evenodd;fill:#9D9E9E;}
          .st5{fill-rule:evenodd;clip-rule:evenodd;fill:#727271;}
          .st6{fill-rule:evenodd;clip-rule:evenodd;fill:#A50022;}
          .st7{fill-rule:evenodd;clip-rule:evenodd;fill:#FF0000;}
          .st8{fill-rule:evenodd;clip-rule:evenodd;fill:#FFCCCC;}
          .st9{fill-rule:evenodd;clip-rule:evenodd;fill:#FF5050;}
          .st10{fill-rule:evenodd;clip-rule:evenodd;fill:#FEFEFE;}
          
          /* Interactive hover effects for booths */
          g.interactive-booth {
            cursor: pointer;
            pointer-events: bounding-box;
          }
          g.interactive-booth:hover rect,
          g.interactive-booth:hover polygon {
            fill: #5d3fb4 !important;
            opacity: 0.9;
            transition: all 0.2s ease;
          }
          g.interactive-booth text {
            pointer-events: none;
            font-family: monospace, sans-serif;
            font-size: 14px;
            font-weight: bold;
            fill: #12033a;
            text-anchor: middle;
            dominant-baseline: middle;
          }
        `}
      </style>

      {/* Carpet Area background */}
      <g id="Carpet_Area">
        <rect id="Carpet_Area_1_" x="129.9" y="123.4" className="st0" width="1840.1" height="1203.1"/>
      </g>

      {/* Registration Counter */}
      <g id="Registration_Counter">
        <rect id="Registration_Counter_1_" x="979.2" y="123.4" className="st1" width="141.5" height="35.4"/>
      </g>

      {/* Entry / Exit */}
      <g id="Entry">
        <rect id="Entry_1_" x="1120.8" y="123.4" className="st2" width="70.8" height="106.2"/>
      </g>
      <g id="Exit">
        <rect id="Exit_1_" x="908.5" y="123.4" className="st2" width="70.8" height="106.2"/>
      </g>

      {/* Stage */}
      <g id="Stage">
        <rect id="Stage_1_" x="979.2" y="158.8" className="st3" width="141.5" height="70.8"/>
      </g>

      {/* Lounges */}
      <g id="Waiting_Lounge_1_">
        <rect id="Waiting_Lounge_3_" x="519.2" y="123.4" className="st4" width="106.2" height="70.8"/>
      </g>
      <g id="Waiting_Lounge_4_">
        <rect id="Waiting_Lounge_5_" x="1474.6" y="123.4" className="st4" width="106.2" height="70.8"/>
      </g>

      {/* Vehicle Passage */}
      <g id="Vehicle_Passage">
        <polygon id="Vehicle_Passage_1_" className="st5" points="1580.8,123.4 1580.8,194.2 1899.3,194.2 1899.3,1255.8 1085.4,1255.8 
          1085.4,477.3 1014.6,477.3 1014.6,1255.8 200.7,1255.8 200.7,194.2 518.8,194.2 518.8,123.4 129.9,123.4 129.9,194.2 129.9,1255.8 
          129.9,1255.8 129.9,1326.6 1970.1,1326.6 1970.1,1255.8 1970.1,1255.8 1970.1,194.2 1970.1,123.4" />
      </g>

      {/* TSP01 */}
      <g id="TSP01" className="interactive-booth" onClick={() => handleGroupClick("TSP01")}>
        <rect id="TSP01_1_" x="979.2" y="300.4" className="st6" width="141.5" height="70.8" style={getStyle("TSP01", "st6")} />
        <text x={979.2 + 141.5/2} y={300.4 + 70.8/2}>TSP01</text>
      </g>

      {/* CSP02 */}
      <g id="CSP02" className="interactive-booth" onClick={() => handleGroupClick("CSP02")}>
        <rect id="CSP02_1_" x="1156.2" y="300.4" className="st7" width="70.8" height="70.8" style={getStyle("CSP02", "st7")} />
        <text x={1156.2 + 70.8/2} y={300.4 + 70.8/2}>CSP02</text>
      </g>

      {/* RGS03-05 */}
      <g id="RGS03" className="interactive-booth" onClick={() => handleGroupClick("RGS03")}>
        <rect id="RGS03_1_" x="1226.9" y="335.7" className="st8" width="70.8" height="35.4" style={getStyle("RGS03", "st8")} />
        <text x={1226.9 + 70.8/2} y={335.7 + 35.4/2}>RGS03</text>
      </g>
      <g id="RGS04" className="interactive-booth" onClick={() => handleGroupClick("RGS04")}>
        <rect id="RGS04_1_" x="1297.7" y="335.7" className="st8" width="70.8" height="35.4" style={getStyle("RGS04", "st8")} />
        <text x={1297.7 + 70.8/2} y={335.7 + 35.4/2}>RGS04</text>
      </g>
      <g id="RGS05" className="interactive-booth" onClick={() => handleGroupClick("RGS05")}>
        <rect id="RGS05_1_" x="1368.5" y="335.7" className="st8" width="70.8" height="35.4" style={getStyle("RGS05", "st8")} />
        <text x={1368.5 + 70.8/2} y={335.7 + 35.4/2}>RGS05</text>
      </g>

      {/* RGS06-09 */}
      <g id="RGS06" className="interactive-booth" onClick={() => handleGroupClick("RGS06")}>
        <rect id="RGS06_1_" x="1439.3" y="300.4" className="st8" width="35.4" height="70.8" style={getStyle("RGS06", "st8")} />
        <text x={1439.3 + 35.4/2} y={300.4 + 70.8/2}>RGS06</text>
      </g>
      <g id="RGS07" className="interactive-booth" onClick={() => handleGroupClick("RGS07")}>
        <rect id="RGS07_1_" x="1368.5" y="300.4" className="st8" width="70.8" height="35.4" style={getStyle("RGS07", "st8")} />
        <text x={1368.5 + 70.8/2} y={300.4 + 35.4/2}>RGS07</text>
      </g>
      <g id="RGS08" className="interactive-booth" onClick={() => handleGroupClick("RGS08")}>
        <rect id="RGS08_1_" x="1297.7" y="300.4" className="st8" width="70.8" height="35.4" style={getStyle("RGS08", "st8")} />
        <text x={1297.7 + 70.8/2} y={300.4 + 35.4/2}>RGS08</text>
      </g>
      <g id="RGS09" className="interactive-booth" onClick={() => handleGroupClick("RGS09")}>
        <rect id="RGS09_1_" x="1226.9" y="300.4" className="st8" width="70.8" height="35.4" style={getStyle("RGS09", "st8")} />
        <text x={1226.9 + 70.8/2} y={300.4 + 35.4/2}>RGS09</text>
      </g>

      {/* ASP10-13 */}
      <g id="ASP10" className="interactive-booth" onClick={() => handleGroupClick("ASP10")}>
        <rect id="ASP10_1_" x="1191.5" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP10", "st9")} />
        <text x={1191.5 + 70.8/2} y={123.4 + 141.5/2}>ASP10</text>
      </g>
      <g id="ASP11" className="interactive-booth" onClick={() => handleGroupClick("ASP11")}>
        <rect id="ASP11_1_" x="1262.3" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP11", "st9")} />
        <text x={1262.3 + 70.8/2} y={123.4 + 141.5/2}>ASP11</text>
      </g>
      <g id="ASP12" className="interactive-booth" onClick={() => handleGroupClick("ASP12")}>
        <rect id="ASP12_1_" x="1333.1" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP12", "st9")} />
        <text x={1333.1 + 70.8/2} y={123.4 + 141.5/2}>ASP12</text>
      </g>
      <g id="ASP13" className="interactive-booth" onClick={() => handleGroupClick("ASP13")}>
        <rect id="ASP13_1_" x="1403.9" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP13", "st9")} />
        <text x={1403.9 + 70.8/2} y={123.4 + 141.5/2}>ASP13</text>
      </g>

      {/* UCS14-23 (Right edge bays) */}
      {[14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((num, i) => {
        const id = `UCS${num}`;
        const yStart = 194.2 + i * 70.8;
        return (
          <g key={id} id={id} className="interactive-booth" onClick={() => handleGroupClick(id)}>
            <polygon className="st10" points={`1899.3,${yStart + 70.8} 1510,${yStart + 70.8} 1510,${yStart} 1899.3,${yStart}`} style={getStyle(id, "st10")} />
            <text x={(1899.3 + 1510)/2} y={yStart + 70.8/2}>{id}</text>
          </g>
        );
      })}

      {/* UCS24-30 (Center bays) */}
      {[24, 25, 26, 27, 28, 29, 30].map((num, i) => {
        const id = `UCS${num}`;
        const yStart = 548.1 + i * 70.8;
        const xOffset = num >= 24 && num <= 26 ? 1085.4 : 1085.4;
        const width = 391.2;
        return (
          <g key={id} id={id} className="interactive-booth" onClick={() => handleGroupClick(id)}>
            <polygon className="st10" points={`${xOffset + width},${yStart + 70.8} ${xOffset},${yStart + 70.8} ${xOffset},${yStart} ${xOffset + width},${yStart}`} style={getStyle(id, "st10")} />
            <text x={xOffset + width/2} y={yStart + 70.8/2}>{id}</text>
          </g>
        );
      })}

      {/* RGS31-38 */}
      <g id="RGS31" className="interactive-booth" onClick={() => handleGroupClick("RGS31")}>
        <rect id="RGS31_1_" x="1191.5" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS31", "st8")} />
        <text x={1191.5 + 70.8/2} y={441.9 + 35.4/2}>RGS31</text>
      </g>
      <g id="RGS32" className="interactive-booth" onClick={() => handleGroupClick("RGS32")}>
        <rect id="RGS32_1_" x="1262.3" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS32", "st8")} />
        <text x={1262.3 + 70.8/2} y={441.9 + 35.4/2}>RGS32</text>
      </g>
      <g id="RGS33" className="interactive-booth" onClick={() => handleGroupClick("RGS33")}>
        <rect id="RGS33_1_" x="1333.1" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS33", "st8")} />
        <text x={1333.1 + 70.8/2} y={441.9 + 35.4/2}>RGS33</text>
      </g>
      <g id="RGS34" className="interactive-booth" onClick={() => handleGroupClick("RGS34")}>
        <rect id="RGS34_1_" x="1403.9" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS34", "st8")} />
        <text x={1403.9 + 70.8/2} y={441.9 + 35.4/2}>RGS34</text>
      </g>
      <g id="RGS35" className="interactive-booth" onClick={() => handleGroupClick("RGS35")}>
        <rect id="RGS35_1_" x="1403.9" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGS35", "st8")} />
        <text x={1403.9 + 70.8/2} y={406.5 + 35.4/2}>RGS35</text>
      </g>
      <g id="RGS36" className="interactive-booth" onClick={() => handleGroupClick("RGS36")}>
        <rect id="RGS36_1_" x="1333.1" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGS36", "st8")} />
        <text x={1333.1 + 70.8/2} y={406.5 + 35.4/2}>RGS36</text>
      </g>
      <g id="RGD37" className="interactive-booth" onClick={() => handleGroupClick("RGD37")}>
        <rect id="RGD37_1_" x="1262.3" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGD37", "st8")} />
        <text x={1262.3 + 70.8/2} y={406.5 + 35.4/2}>RGD37</text>
      </g>
      <g id="RGS38" className="interactive-booth" onClick={() => handleGroupClick("RGS38")}>
        <rect id="RGS38_1_" x="1191.5" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGS38", "st8")} />
        <text x={1191.5 + 70.8/2} y={406.5 + 35.4/2}>RGS38</text>
      </g>

      {/* ASP39-42 */}
      <g id="ASP39" className="interactive-booth" onClick={() => handleGroupClick("ASP39")}>
        <rect id="ASP39_1_" x="1120.8" y="406.5" className="st9" width="70.8" height="70.8" style={getStyle("ASP39", "st9")} />
        <text x={1120.8 + 70.8/2} y={406.5 + 70.8/2}>ASP39</text>
      </g>
      <g id="ASP40" className="interactive-booth" onClick={() => handleGroupClick("ASP40")}>
        <rect id="ASP40_1_" x="1050" y="406.5" className="st9" width="70.8" height="70.8" style={getStyle("ASP40", "st9")} />
        <text x={1050 + 70.8/2} y={406.5 + 70.8/2}>ASP40</text>
      </g>
      <g id="ASP41" className="interactive-booth" onClick={() => handleGroupClick("ASP41")}>
        <rect id="ASP41_1_" x="979.2" y="406.5" className="st9" width="70.8" height="70.8" style={getStyle("ASP41", "st9")} />
        <text x={979.2 + 70.8/2} y={406.5 + 70.8/2}>ASP41</text>
      </g>
      <g id="ASP42" className="interactive-booth" onClick={() => handleGroupClick("ASP42")}>
        <rect id="ASP42_1_" x="908.5" y="406.5" className="st9" width="70.8" height="70.8" style={getStyle("ASP42", "st9")} />
        <text x={908.5 + 70.8/2} y={406.5 + 70.8/2}>ASP42</text>
      </g>

      {/* RGS43-50 */}
      <g id="RGS43" className="interactive-booth" onClick={() => handleGroupClick("RGS43")}>
        <rect id="RGS43_1_" x="837.7" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGS43", "st8")} />
        <text x={837.7 + 70.8/2} y={406.5 + 35.4/2}>RGS43</text>
      </g>
      <g id="RGS44" className="interactive-booth" onClick={() => handleGroupClick("RGS44")}>
        <rect id="RGS44_1_" x="766.9" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGS44", "st8")} />
        <text x={766.9 + 70.8/2} y={406.5 + 35.4/2}>RGS44</text>
      </g>
      <g id="RGS45" className="interactive-booth" onClick={() => handleGroupClick("RGS45")}>
        <rect id="RGS45_1_" x="696.1" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGS45", "st8")} />
        <text x={696.1 + 70.8/2} y={406.5 + 35.4/2}>RGS45</text>
      </g>
      <g id="RGS46" className="interactive-booth" onClick={() => handleGroupClick("RGS46")}>
        <rect id="RGS46_1_" x="625.4" y="406.5" className="st8" width="70.8" height="35.4" style={getStyle("RGS46", "st8")} />
        <text x={625.4 + 70.8/2} y={406.5 + 35.4/2}>RGS46</text>
      </g>
      <g id="RGS47" className="interactive-booth" onClick={() => handleGroupClick("RGS47")}>
        <rect id="RGS47_1_" x="625.4" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS47", "st8")} />
        <text x={625.4 + 70.8/2} y={441.9 + 35.4/2}>RGS47</text>
      </g>
      <g id="RGS48" className="interactive-booth" onClick={() => handleGroupClick("RGS48")}>
        <rect id="RGS48_1_" x="696.1" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS48", "st8")} />
        <text x={696.1 + 70.8/2} y={441.9 + 35.4/2}>RGS48</text>
      </g>
      <g id="RGS49" className="interactive-booth" onClick={() => handleGroupClick("RGS49")}>
        <rect id="RGS49_1_" x="766.9" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS49", "st8")} />
        <text x={766.9 + 70.8/2} y={441.9 + 35.4/2}>RGS49</text>
      </g>
      <g id="RGS50" className="interactive-booth" onClick={() => handleGroupClick("RGS50")}>
        <rect id="RGS50_1_" x="837.7" y="441.9" className="st8" width="70.8" height="35.4" style={getStyle("RGS50", "st8")} />
        <text x={837.7 + 70.8/2} y={441.9 + 35.4/2}>RGS50</text>
      </g>

      {/* UCS51-57 (Left-middle bays) */}
      {[51, 52, 53, 54, 55, 56, 57].map((num, i) => {
        const id = `UCS${num}`;
        const yStart = 548.1 + i * 70.8;
        const xOffset = 625.4;
        const width = 389.2;
        return (
          <g key={id} id={id} className="interactive-booth" onClick={() => handleGroupClick(id)}>
            <polygon className="st10" points={`${xOffset + width},${yStart + 70.8} ${xOffset},${yStart + 70.8} ${xOffset},${yStart} ${xOffset + width},${yStart}`} style={getStyle(id, "st10")} />
            <text x={xOffset + width/2} y={yStart + 70.8/2}>{id}</text>
          </g>
        );
      })}

      {/* UCS58-67 (Left edge bays) */}
      {[58, 59, 60, 61, 62, 63, 64, 65, 66, 67].map((num, i) => {
        const id = `UCS${num}`;
        const yStart = 194.2 + i * 70.8;
        const xOffset = 200.7;
        const width = 389.3;
        return (
          <g key={id} id={id} className="interactive-booth" onClick={() => handleGroupClick(id)}>
            <polygon className="st10" points={`${xOffset + width},${yStart + 70.8} ${xOffset},${yStart + 70.8} ${xOffset},${yStart} ${xOffset + width},${yStart}`} style={getStyle(id, "st10")} />
            <text x={xOffset + width/2} y={yStart + 70.8/2}>{id}</text>
          </g>
        );
      })}

      {/* ASP68-71 */}
      <g id="ASP68" className="interactive-booth" onClick={() => handleGroupClick("ASP68")}>
        <rect id="ASP68_1_" x="625.4" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP68", "st9")} />
        <text x={625.4 + 70.8/2} y={123.4 + 141.5/2}>ASP68</text>
      </g>
      <g id="ASP69" className="interactive-booth" onClick={() => handleGroupClick("ASP69")}>
        <rect id="ASP69_1_" x="696.1" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP69", "st9")} />
        <text x={696.1 + 70.8/2} y={123.4 + 141.5/2}>ASP69</text>
      </g>
      <g id="ASP70" className="interactive-booth" onClick={() => handleGroupClick("ASP70")}>
        <rect id="ASP70_1_" x="766.9" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP70", "st9")} />
        <text x={766.9 + 70.8/2} y={123.4 + 141.5/2}>ASP70</text>
      </g>
      <g id="ASP71" className="interactive-booth" onClick={() => handleGroupClick("ASP71")}>
        <rect id="ASP71_1_" x="837.7" y="123.4" className="st9" width="70.8" height="141.5" style={getStyle("ASP71", "st9")} />
        <text x={837.7 + 70.8/2} y={123.4 + 141.5/2}>ASP71</text>
      </g>

      {/* RGS72-74 */}
      <g id="RGS72" className="interactive-booth" onClick={() => handleGroupClick("RGS72")}>
        <rect id="RGS72_1_" x="802.3" y="300.4" className="st8" width="70.8" height="35.4" style={getStyle("RGS72", "st8")} />
        <text x={802.3 + 70.8/2} y={300.4 + 35.4/2}>RGS72</text>
      </g>
      <g id="RGS73" className="interactive-booth" onClick={() => handleGroupClick("RGS73")}>
        <rect id="RGS73_1_" x="731.5" y="300.4" className="st8" width="70.8" height="35.4" style={getStyle("RGS73", "st8")} />
        <text x={731.5 + 70.8/2} y={300.4 + 35.4/2}>RGS73</text>
      </g>
      <g id="RGS74" className="interactive-booth" onClick={() => handleGroupClick("RGS74")}>
        <rect id="RGS74_1_" x="660.7" y="300.4" className="st8" width="70.8" height="35.4" style={getStyle("RGS74", "st8")} />
        <text x={660.7 + 70.8/2} y={300.4 + 35.4/2}>RGS74</text>
      </g>
      <g id="RGS06_4_" className="interactive-booth" onClick={() => handleGroupClick("RGS06_4_")}>
        <rect id="RGS06_5_" x="625.4" y="300.4" className="st8" width="35.4" height="70.8" style={getStyle("RGS06_4_", "st8")} />
        <text x={625.4 + 35.4/2} y={300.4 + 70.8/2}>RGS06_4_</text>
      </g>

      {/* RGS76-78 */}
      <g id="RGS76" className="interactive-booth" onClick={() => handleGroupClick("RGS76")}>
        <rect id="RGS76_1_" x="660.7" y="335.7" className="st8" width="70.8" height="35.4" style={getStyle("RGS76", "st8")} />
        <text x={660.7 + 70.8/2} y={335.7 + 35.4/2}>RGS76</text>
      </g>
      <g id="RGS77" className="interactive-booth" onClick={() => handleGroupClick("RGS77")}>
        <rect id="RGS77_1_" x="731.5" y="335.7" className="st8" width="70.8" height="35.4" style={getStyle("RGS77", "st8")} />
        <text x={731.5 + 70.8/2} y={335.7 + 35.4/2}>RGS77</text>
      </g>
      <g id="RGS78" className="interactive-booth" onClick={() => handleGroupClick("RGS78")}>
        <rect id="RGS78_1_" x="802.3" y="335.7" className="st8" width="70.8" height="35.4" style={getStyle("RGS78", "st8")} />
        <text x={802.3 + 70.8/2} y={335.7 + 35.4/2}>RGS78</text>
      </g>

      {/* CSP79 */}
      <g id="CSP79" className="interactive-booth" onClick={() => handleGroupClick("CSP79")}>
        <rect id="CSP79_1_" x="873.1" y="300.4" className="st7" width="70.8" height="70.8" style={getStyle("CSP79", "st7")} />
        <text x={873.1 + 70.8/2} y={300.4 + 70.8/2}>CSP79</text>
      </g>
    </svg>
  );
}
export default FloorPlanSvg;
