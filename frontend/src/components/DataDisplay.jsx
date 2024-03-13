import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <div>
      <h1>Data Display</h1>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Revenue</th>
            <th>Unit Price</th>
            <th>Imp. Fee (if Any)</th>
            <th>No of Cus. (Total)</th>
            <th>No of Cus.(Retained)</th>
            <th>No of Cus.(New)</th>
            <th>EBIT %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.__EMPTY_1}</td>
              <td>{item.__EMPTY_2}</td>
              <td>{item.__EMPTY_3}</td>
              <td>{item.__EMPTY_4}</td>
              <td>{item.__EMPTY_5}</td>
              <td>{item.__EMPTY_6}</td>
              <td>{item.__EMPTY_7}</td>
              <td>{item.hasOwnProperty('EBIT %') ? item['EBIT %'] : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplay;
