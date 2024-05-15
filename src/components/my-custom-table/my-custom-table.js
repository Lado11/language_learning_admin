import React from "react";
import "./my-custom-table-style.css";

export const MyCustomTable = () => {
  return (
    <div className="myCustomMainDiv">
      <table>
        <tr className="myCustomHeader">
          <th>ID</th>
          <th>User</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Device ID</th>
          <th>Country</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>+37498585091</td>
          <td>123456789</td>
          <td>England</td>
          <td>Subscribed</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
          <td>+37498585091</td>
          <td>123456789</td>
          <td>England</td>
          <td>Subscribed</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
          <td>+37498585091</td>
          <td>123456789</td>
          <td>England</td>
          <td>Subscribed</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
          <td>+37498585091</td>
          <td>123456789</td>
          <td>England</td>
          <td>Subscribed</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
          <td>+37498585091</td>
          <td>123456789</td>
          <td>England</td>
          <td>Subscribed</td>
        </tr>
      </table>
    </div>
  );
};

{
  /* <th>ID</th>
          <th>User</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Device ID</th>
          <th>Country</th>
          <th>Status</th> */
}
