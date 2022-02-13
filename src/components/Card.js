import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';

export default function Card() {
  //access location object
  const location = useLocation();

  //access the slugs in the pathname
  const urlSlug = location.pathname.split('/')[2];

  // split the string into an array
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

  //make GQL query with dynamic variable
  const { loading, error, data } = useQuery(PICTUREURL, {
    variables: { urlSlugArr },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <main className="container">
        <h1>Card Page</h1>

        {console.log('urlSlug:', urlSlug)}
        {console.log('urlSlugArr:', urlSlugArr)}
        {console.log('data:', data)}
        {console.log('data.cards:', data.cards)}

        <p style={{ color: 'white', margin: '8px 0 32px 0', fontWeight: 400 }}>
          Card images fetched from the URL slug in the address bar.
        </p>

        <section style={{ display: 'flex' }}>
          {data.cards.map((card, ind) => (
            <div key={ind}>
              <img
                style={{ width: '220px', margin: '8px' }}
                src={card.pictureUrl}
                alt="card"
              />
              <p className="small">{card.name}</p>
            </div>
          ))}
        </section>
        <Link style={{ margin: '32px' }} to="/">
          <button>Go Home</button>
        </Link>
      </main>
    </>
  );
}
