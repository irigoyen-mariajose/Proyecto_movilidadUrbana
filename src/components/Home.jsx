import React from "react";

function Home() {
  return (
    <div className="p-6">
      {/* Encabezado */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">ANDESUR</h1>
        <p className="text-gray-600 mt-2">
          Consulta el estado en tiempo real de los trenes y planifica tus viajes con facilidad.
        </p>
      </header>

      {/* Sección de búsqueda */}
      <section className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Buscar tren</h2>
        <form className="flex gap-4">
          <input
            type="text"
            placeholder="Número de tren o estación"
            className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </form>
      </section>

      {/* Ejemplo de resultados (mock data) */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Trenes en curso</h2>
        <div className="grid gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Tren 102</p>
              <p className="text-gray-500">Buenos Aires → Rosario</p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              A tiempo
            </span>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Tren 203</p>
              <p className="text-gray-500">Córdoba → Villa María</p>
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              Retrasado 10 min
            </span>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Tren 310</p>
              <p className="text-gray-500">Mar del Plata → Buenos Aires</p>
            </div>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
              Cancelado
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;