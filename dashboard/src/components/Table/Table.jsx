import React from 'react'
import "./Table.scss"


function Table({tableProp}) {
  const posts =tableProp.posts
  return (
    <div className="table">
    <table className="table-container">
     <thead>
        <tr>
          <th>Time</th>
          <th>Speed</th>
          <th>frequency</th>
          <th>Current</th>
          <th>Power</th>
          <th>Line Voltage</th>
          <th>Drive thermal</th>
          <th>Motor thermal</th>
        </tr>
        </thead>
    <tbody>
    {posts.slice(0,3).map((post,index) =>{
      return (
        <tr key = {index}>
          <td>{post.tstamp}</td>
          <td>{post.speed_a}</td>
          <td>{post.frequency_a}</td>
          <td>{post.current_a}</td>
          <td>{post.power_a}</td>
          <td>{post.line_voltage_a}</td>
          <td>{post.drive_thermal_a}</td>
          <td>{post.motor_thermal_a}</td>
        </tr>
         )})}
     </tbody>
    </table>
    <table className="table-container">
     <thead>
        <tr>
          <th>Time</th>
          <th>Speed</th>
          <th>frequency</th>
          <th>Current</th>
          <th>Power</th>
          <th>Line Voltage</th>
          <th>Drive thermal</th>
          <th>Motor thermal</th>
        </tr>
        </thead>
    <tbody>
    {posts.slice(0,3).map((post,index) =>{
      return (
        <tr key = {index}>
          <td >{post.tstamp}</td>
          <td >{post.speed_b}</td>
          <td >{post.frequency_b}</td>
          <td >{post.current_b}</td>
          <td >{post.power_b}</td>
          <td >{post.line_voltage_b}</td>
          <td >{post.drive_thermal_b}</td>
          <td >{post.motor_thermal_b}</td>
        </tr>
         )})}
     </tbody>
    </table>
  </div>
  )
}

export default Table
