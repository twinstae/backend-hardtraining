import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        HOME
      </Link>
      <Link href="/auth/signin">
        Sign In
      </Link>
      <Link href="/auth/signup">
        Sign Up
      </Link>
    </nav>
  )
}