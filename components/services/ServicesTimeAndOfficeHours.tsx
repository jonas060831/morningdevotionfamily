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
                    <td >
                        10:00 AM - 12:00 NN <span style={{ color: 'red' }}>CARSON  </span><br />
                        3:00 PM - 5:00 PM <span style={{ color: 'red' }}>WEST COVINA </span>
                    </td>
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
                    <td >&nbsp;</td>
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