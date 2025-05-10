import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Women's Empowerment Platform</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Empowering women through career guidance, mentorship, legal resources, and pay equity tools.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/career-guidance"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/mentorship"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Mentorship Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Legal Quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Legal Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/pay-parity"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Pay Parity Tool
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/statistics"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  Statistics
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} Women's Empowerment Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
