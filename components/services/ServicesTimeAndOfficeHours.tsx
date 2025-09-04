import React from 'react'

import styles from './ServicesTimeAndOfficeHours.module.css'

const ServicesTimeAndOfficeHours = () => {
  return (
    <div
     className="gradientContainer"
    >
        <p className={styles.header}>
            Services Times & Office Hours
        </p>

        <div className={styles.tableContainer} >
            <table 
            className={styles.schedule}
            style={{ borderCollapse: "collapse", width: "100%" }}
            >
                <thead>
                    <tr>
                    <th >Day</th>
                    <th >Service Times</th>
                    <th >Office Hours</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                    <td >Sunday</td>
                    <td >9:00 AM & 11:00 AM</td>
                    <td >Closed</td>
                    </tr>

                    <tr>
                    <td >Monday</td>
                    <td ></td>
                    <td >9:00 AM - 5:00 PM</td>
                    </tr>

                    <tr>
                    <td >Tuesday</td>
                    <td ></td>
                    <td >9:00 AM - 5:00 PM</td>
                    </tr>

                    <tr>
                    <td >Wednesday</td>
                    <td >7:00 PM Bible Study</td>
                    <td >9:00 AM - 5:00 PM</td>
                    </tr>

                    <tr>
                    <td >Thursday</td>
                    <td ></td>
                    <td >9:00 AM - 5:00 PM</td>
                    </tr>

                    <tr>
                    <td >Friday</td>
                    <td ></td>
                    <td >9:00 AM - 5:00 PM</td>
                    </tr>

                    <tr>
                    <td >Saturday</td>
                    <td ></td>
                    <td >Closed</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ServicesTimeAndOfficeHours