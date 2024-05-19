import '../style.css'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        </div>
        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />
        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-7" src={require("../assets/fixmi-logo.png")} alt="fixmilogo" />
          </a>
        </div>
      </div>
    </footer>
  );
}

