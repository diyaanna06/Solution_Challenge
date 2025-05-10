import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BookOpen, BriefcaseBusiness, Handshake, MessageSquare, Scale } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Career Guidance",
      description: "Get AI-powered career suggestions based on your interests",
      icon: <BriefcaseBusiness className="h-8 w-8 text-pink-500" />,
      link: "/career-guidance",
    },
    {
      title: "Mentorship Programs",
      description: "Find mentorship programs that match your skills and goals",
      icon: <Handshake className="h-8 w-8 text-pink-500" />,
      link: "/mentorship",
    },
    {
      title: "Legal Quiz",
      description: "Test your knowledge about women's legal rights and protections",
      icon: <BookOpen className="h-8 w-8 text-pink-500" />,
      link: "/quiz",
    },
    {
      title: "Legal Chatbot",
      description: "Get expert advice on female foeticide laws in India",
      icon: <MessageSquare className="h-8 w-8 text-pink-500" />,
      link: "/chatbot",
    },
    {
      title: "Pay Parity Tool",
      description: "Compare your salary with industry averages to ensure fair pay",
      icon: <Scale className="h-8 w-8 text-pink-500" />,
      link: "/pay-parity",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Empowering Women
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
          Access resources, guidance, and tools designed to support women in their personal and professional journeys.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600">
            <Link href="/career-guidance">Explore Career Options</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link href={feature.link}>
                    Explore <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
          Connect with like-minded women, share experiences, and grow together in a supportive environment.
        </p>
        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/about">Get Involved</Link>
        </Button>
      </section>
    </div>
  )
}
