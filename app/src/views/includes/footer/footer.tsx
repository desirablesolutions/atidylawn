
const SITE_VERSION = "1.0.0" 

export function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-thin mb-4 text-green-700 dark:text-green-400">A Tidy Lawn</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your one-stop destination for professional landscaping services and products.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-thin mb-4 text-green-700 dark:text-green-400">Quick Links</h3>
              <ul className="space-y-2">
                {["Services", "Team", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-green-600 dark:text-gray-400 
                               dark:hover:text-green-400"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-thin mb-4 text-green-700 dark:text-green-400">Contact</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>contact@atidylawn.com</li>
                <li>1-800-TIDY-LAWN</li>
                <li>123 Garden Street</li>
                <li>Green City, ST 12345</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-thin mb-4 text-green-700 dark:text-green-400">Hours</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Monday - Friday: 8am - 6pm</li>
                <li>Saturday: 9am - 4pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} A Tidy Lawn. All rights reserved.</p>
              <p>Hosted by Desirable Solutions | Version {SITE_VERSION}</p>
            </div>
          </div>
        </div>
      </footer>
    )
}