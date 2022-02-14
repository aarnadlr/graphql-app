import React from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import {
  useSpring,
  animated,
} from 'react-spring';

export default function Card() {
  //access location object
  const location = useLocation();

  //access the slugs in the pathname
  const urlSlug = location.pathname.split('/')[2];

  // split the string into an array of strings
  const urlSlugArr = urlSlug.split(',');

  //create dynamic query which reads from pathname
  const PICTUREURL = gql`
    query getPictureUrl($urlSlugArr: [String!]) {
      cards(slugs: $urlSlugArr) {
        pictureUrl
        name
      }
    }
  `;

  const [getPictureUrl, { loading, data }] = useLazyQuery(PICTUREURL, {
    variables: { urlSlugArr },
  });

  const propsFadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 2000,
    config: {duration: 1000},
  });
  const propsFadeOut = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 2000,
    config: {duration: 1000},
  });

  return (
    <>
      <main className="container">
        <h1>Card Page</h1>

        <p style={{ color: 'white', margin: '8px 0 32px 0', fontWeight: 400 }}>
          Card images fetched from the URL slug in the address bar.
        </p>

        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {data?.cards ? (
            <animated.div style={propsFadeIn}>
              <div className="wrapper" style={{ display: 'flex' }}>
                {data.cards.map((card, ind) => (
                  <div style={{ height: '400px' }} key={ind}>
                    <img
                      style={{ width: '220px', margin: '8px' }}
                      src={card.pictureUrl}
                      alt="card"
                    />
                    <p className="small">{card.name}</p>
                  </div>
                ))}
              </div>
            </animated.div>
          ) : (
            <animated.div style={data?propsFadeOut:null}>
              <div
                className={'wrapper'}
                style={{ display: 'flex' }}
              >
                {urlSlugArr.map((card, ind) => (
                  <div style={{ height: '400px' }} key={ind}>
                    <div
                      style={{
                        width: '220px',
                        height: '356px',
                        margin: '8px',
                        background: 'navy',
                        borderRadius: '8px',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'deepskyblue',
                      }}
                      alt="card"
                    >
                      <p>Click Below to Reveal</p>
                    </div>
                    <p className="small">{card.name}</p>
                  </div>
                ))}
              </div>
            </animated.div>
          )}
        </section>

        <div className="buttonGroup">
          <button
            disabled={data ? true : false}
            style={{
              cursor: data ? 'not-allowed' : 'pointer',
              color: data ? 'gray' : 'white',
              border: data ? '1px solid gray' : '1px solid white',
            }}
            // run GQL query on click
            onClick={() => {
              getPictureUrl();
            }}
          >
            Reveal Cards
          </button>

          <Link style={{ margin: '32px' }} to="/">
            <button>Go Home</button>
          </Link>
        </div>
      </main>
    </>
  );
}
