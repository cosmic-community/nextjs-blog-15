export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>&copy; {currentYear} Modern Blog Platform. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}