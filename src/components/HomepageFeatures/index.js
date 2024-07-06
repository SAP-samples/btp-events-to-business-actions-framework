import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import CodeBlock from "@theme/CodeBlock";
const FeatureList = [
  {
    title: 'Blog Post',
    Svg: require('@site/static/img/blog.svg').default,
    description: (
      <>
        Do you want to read more about the UseCase itself? Know more about Use Cases and post it on the <a href="https://blogs.sap.com/">SAP Community</a>
      </>
    ),
  },
  {
    title: 'Discovery Center',
    Svg: require('@site/static/img/discoverycenter.svg').default,
    description: (
      <>
        Adopt and understand SAP Business Technology Platform to turn data into business value. Checkout the <a href="https://discovery-center.cloud.sap/index.html">SAP Discovery Center</a>
      </>
    ),
  },
  {
    title: 'Similar UseCases',
    Svg: require('@site/static/img/usecase.svg').default,
    description: (
      <>
        Are you interested in similar UseCases for the SAP Business Technology Platform? Find them here on <a href="github.com/sap-samples">SAP Samples</a>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
