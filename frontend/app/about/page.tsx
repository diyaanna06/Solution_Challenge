export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-xl text-center mb-8">Bridging the Gender Gap – Empowering the Girl Child</p>

          <p>
            Educating and empowering women isn't just about equality, it's about progress. Together, let's bridge the
            gap and build a world where every girl has the opportunity to thrive.
          </p>

          <p>
            This project is a heartfelt initiative by four girls who believe in change. Women across the world face
            barriers in education, employment, healthcare, and fundamental rights. Our platform is a small but
            significant step toward ensuring that every girl and woman receives the support, knowledge, and guidance she
            deserves.
          </p>

          <h2>Our Team</h2>
          <p className="text-center">
            Conceptualized and created with passion and purpose by{" "}
            <strong>Arushi Waddepalli, Diya Anna Varghese, Merin Theres Jose</strong>, and{" "}
            <strong>Sanjana Chennupati</strong>.
          </p>

          <div className="text-center mt-8">
            <a href="/" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
