"use client"
import React, { useEffect, useRef } from 'react'
import styles from './ServicesPreview.module.css'
import TitleAndDescription from '../titleAndDescription/TitleAndDescription'
import SquareCard from '../cards/squareCard/SquareCard'
import DashedBorderCard from '../cards/dashedBorderCard/DashedBorderCard'
import OutlineButton from '../buttons/OutlineButton'

const servicesThumbnails = [
    {
        icon: '🧑‍🤝‍🧑',
        title: 'Weekly Cellgroup',
        description: "Intimate gatherings for fellowship, prayer, and spiritual growth in a supportive community setting"
    },
    {
        icon: '💕',
        title: 'Marriage Counseling',
        description: "Professional guidance to strengthen relationships and build lasting, Christ centered marriages"
    },{
        icon: '🎵',
        title: 'Worship Training',
        description: "Develop your gifts in music, prayer, and leading others into meaningful worship experiences"
    }, {
        icon: '→',
        title: 'View All',
        description: 'Browse all our Services'
    }
]

const ServicesPreview = () => {
  const scrollableContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollableContainer.current;
    if (!container) return;

    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {


            entry.isIntersecting ? container.scrollTo({ left: 300, behavior: "smooth" }) : container.scrollTo({ left: 0, behavior: "instant" });

        });
        },
        { threshold: 0.5 } // trigger when 50% visible
    );

    observer.observe(container);

    return () => {
        observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TitleAndDescription
          title="Our Ministry Services"
          description="Discover meaningful ways to grow in faith, connect with community, and celebrate life's sacred moments"
          titleFontSize={4}
          descriptionFontSize={1.5}
        />
      </div>

      <br />
      <div className={styles.servicesFlex} ref={scrollableContainer}>
        {servicesThumbnails.map((item, id) => (
          <SquareCard
            key={id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div className={styles.footnote}>
        <DashedBorderCard>
          <TitleAndDescription
            title="and many more sacred services"
            titleFontSize={2}
            description="Wedding ceremonies, discipleship courses, memorial services & more"
            descriptionFontSize={1.2}
          />
        </DashedBorderCard>
      </div>

      <OutlineButton onClick={() => console.log("go to services page")} color="white">
        Discover All our Services
      </OutlineButton>
    </div>
  );
};

export default ServicesPreview;
