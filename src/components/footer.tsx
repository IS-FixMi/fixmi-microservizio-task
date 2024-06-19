import '../style.css'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h5 className="text-center text-2xl font-semibold bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-t-lg">
              Il nostro Team
            </h5>
            <div className="pt-4">
              <ul className="text-gray-700">
                <li className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                  <span className="text-lg font-medium">Asaro Valerio</span>
                </li>
                <li className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                  <span className="text-lg font-medium">Santini Giovanni</span>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
                  <span className="text-lg font-medium">Ungureanu Riginel</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h5 className="text-center text-2xl font-semibold bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-t-lg">
              Info Commerciali
            </h5>
            <div className="pt-4">
              <div className="text-gray-700">
                <h5 className="text-center font-semibold mb-2">IVA</h5>
                <p className="text-center mb-4">1234567890</p>
                <hr className="border-gray-300 my-2" />
		<h5 className="text-center font-semibold mb-2">Codice Fiscale</h5>
                <p className="text-center">ABCDEF12G34H567I</p>
		<hr className="border-gray-300 my-2" />
                <h5 className="text-center font-semibold mb-2">Telefono</h5>
                <p className="text-center">+39 123 456 7890</p>
		<hr className="border-gray-300 my-2" />
		<h5 className="text-center font-semibold mb-2">Indirizzo email</h5>
                <p className="text-center">info@fixmi.com</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h5 className="text-center text-2xl font-semibold bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-t-lg">
              Progetto svolto per
            </h5>
            <div className="pt-4">
              <div className="w-full h-32 rounded-lg bg-gray-300 mb-4"></div>
              <div className="text-center text-gray-700 font-semibold text-lg mb-2">
                Università degli studi di Trento
              </div>
              <div className="text-gray-700 text-sm absolute bottom-4 right-4">
                Corso di Ingegneria del Software, 2023/2024
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />
        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-7" src={require("../assets/fixmi-logo.png")} alt="FixMi Logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}

