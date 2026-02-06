import Image from 'next/image'

export default function TestImages() {
  const images = [
    { path: '/hero-dental.jpg', name: 'Hero Image' },
    { path: '/doctor-sarah.jpg', name: 'Dr. Sarah Mitchell' },
    { path: '/doctor-james.jpg', name: 'Dr. James Wilson' },
    { path: '/doctor-emily.jpg', name: 'Dr. Emily Chen' },
    { path: '/doctor-michael.jpg', name: 'Dr. Michael Brown' },
    { path: '/about-clinic.jpg', name: 'Clinic Image' },
    { path: '/happy-patient.jpg', name: 'Happy Patient' },
    { path: '/placeholder.svg', name: 'Placeholder SVG' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Image Loading Test Page
          </h1>
          <p className="text-gray-600 mb-2">
            This page tests if all images are loading correctly.
          </p>
          <p className="text-sm text-gray-500">
            ✅ = Image loaded successfully | ❌ = Image failed to load
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.path} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={img.path}
                  alt={img.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.error(`Failed to load: ${img.path}`)
                  }}
                  onLoad={() => {
                    console.log(`✅ Loaded: ${img.path}`)
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{img.name}</h3>
                <p className="text-sm text-gray-500 font-mono">{img.path}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            Testing with Standard img Tags
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.slice(0, 4).map((img) => (
              <div key={`std-${img.path}`} className="text-center">
                <img
                  src={img.path}
                  alt={img.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                  onError={(e) => {
                    e.currentTarget.style.background = '#ef4444'
                    e.currentTarget.alt = 'Failed to load'
                  }}
                />
                <p className="text-xs text-gray-600">{img.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Check your browser console (F12) for image loading messages</li>
            <li>If images don't load, verify files exist in the <code className="bg-gray-100 px-2 py-1 rounded">public/</code> folder</li>
            <li>Try clearing your browser cache and reloading</li>
            <li>Ensure the development server is running on the correct port</li>
            <li>Visit <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000/doctor-sarah.jpg</code> directly to test</li>
          </ol>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
