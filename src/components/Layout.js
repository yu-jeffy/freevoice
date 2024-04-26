import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SignOut from './SignOut';

const Layout = ({ children, title = 'Next.js App' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/admin">Admin Dashboard</Link>
          <SignOut />
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;