import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';

export default function Card() {
  //access location object
  const location = useLocation();

  //access the slug in the pathname
  const urlSlug = location.pathname.split('/')[2];

  //create dynamic query which reads from pathname
  const PICTUREURL = gql`
    query {
      card(slug: "${urlSlug}") {
        pictureUrl
      }
    }
  `;

  //make GQL query
  const { loading, error, data } = useQuery(PICTUREURL);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <main className="container">
        <h1>Card Page</h1>

        <p style={{ color: 'white', margin: '8px 0 32px 0', fontWeight: 400 }}>
          Card image fetched from the slug in the URL:{' '}
          <span style={{ fontWeight: 800 }}>{urlSlug}</span>
        </p>

        <img style={{ width: '300px' }} src={data.card.pictureUrl} alt="card" />

        <Link style={{ margin: '24px' }} to="/">
          <button>Go Home</button>
        </Link>
      </main>
    </>
  );
}
