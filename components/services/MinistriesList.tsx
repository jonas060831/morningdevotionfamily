"use client";
import React, { useState } from 'react';
import TitleAndDescription from '../titleAndDescription/TitleAndDescription';

import styles from './ServicesList.module.css';

import ministriesData from '@/public/datas/ministriesData';
import SquareCard from '../cards/squareCard/SquareCard';

const MinistriesList = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <div className="gradientContainer">
      <div className={styles.header}>
        <TitleAndDescription
          title="Touching Lives, Building Hope"
          description="Our ministry is dedicated to uplifting our community, nurturing hearts, and bringing hope to every life we touch. Through compassion, service, and faith, we walk together to strengthen bonds and inspire positive change."
          titleFontSize={2.5}
          descriptionFontSize={1}
        />
      </div>

      <div
        className={styles.list}
        style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
        onMouseDown={() => setIsGrabbing(true)}
        onMouseUp={() => setIsGrabbing(false)}
        onMouseLeave={() => setIsGrabbing(false)}
      >
        {ministriesData.map((ministry, idx) => (
          <SquareCard
            key={idx}
            icon={ministry.icon}
            title={ministry.title}
            description={ministry.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MinistriesList;
