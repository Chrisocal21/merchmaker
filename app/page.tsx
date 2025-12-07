import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Merch Mockup Studio</h1>
        <p className="text-gray-600 mb-8">Create professional product mockups</p>
        <Link
          href="/mockup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
